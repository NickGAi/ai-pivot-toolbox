import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertLeadMagnetSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactNotification, sendLeadMagnetNotification, sendLeadMagnetDelivery, sendRealEstateFunnelNotification, sendRealEstateFunnelConfirmation } from "./gmail";
import { legacyCreateProxyMiddleware } from "http-proxy-middleware";

async function sendToGHL(data: {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  industry?: string | null;
  businessName?: string;
  message?: string | null;
}) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("GHL_WEBHOOK_URL not configured, skipping GHL integration");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data.firstName || "",
        last_name: data.lastName || "",
        email: data.email,
        phone: data.phone || "",
        industry: data.industry || "",
        company_name: data.businessName || "",
        source: "AIPivot Website",
        notes: data.message || "",
      }),
    });

    if (!response.ok) {
      console.error("GHL webhook failed:", response.status, await response.text());
    } else {
      console.log("Lead sent to GHL successfully");
    }
  } catch (error) {
    console.error("Failed to send lead to GHL:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // 301 redirect: /map → /real-estate-pipeline-growth-map
  app.get("/map", (_req, res) => {
    res.redirect(301, "/real-estate-pipeline-growth-map");
  });
  // Proxy /__mockup/* to the mockup sandbox dev server (port 23636)
  app.use(
    "/__mockup",
    legacyCreateProxyMiddleware({
      target: "http://localhost:23636",
      changeOrigin: true,
      ws: true,
      pathRewrite: { "^": "/__mockup" },
    })
  );

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send to GoHighLevel webhook
      try {
        await sendToGHL({
          firstName: submission.firstName,
          lastName: submission.lastName,
          email: submission.email,
          phone: submission.phone,
          industry: submission.industry || undefined,
          businessName: req.body.businessName,
          message: submission.message,
        });
      } catch (ghlError) {
        console.error("Failed to send to GHL:", ghlError);
      }
      
      // Send email notification
      try {
        await sendContactNotification({
          firstName: submission.firstName,
          lastName: submission.lastName,
          email: submission.email,
          phone: submission.phone,
          industry: submission.industry,
          preferredDate: submission.preferredDate,
          message: submission.message,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for your enquiry! We'll be in touch soon.",
        id: submission.id 
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ 
          success: false, 
          error: validationError.toString() 
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        error: "An error occurred. Please try again later." 
      });
    }
  });

  app.post("/api/lead-magnet", async (req, res) => {
    try {
      const validatedData = insertLeadMagnetSchema.parse(req.body);
      const submission = await storage.createLeadMagnetSubmission(validatedData);

      try {
        await sendLeadMagnetNotification({
          firstName: submission.firstName,
          email: submission.email,
        });
      } catch (emailError) {
        console.error("Failed to send lead magnet notification email:", emailError);
      }

      try {
        await sendLeadMagnetDelivery({
          firstName: submission.firstName,
          email: submission.email,
        });
      } catch (deliveryError) {
        console.error("Failed to send lead magnet delivery email:", deliveryError);
      }

      res.json({
        success: true,
        message: "Thanks! Check your inbox for the checklist.",
        id: submission.id,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ success: false, error: validationError.toString() });
      }
      console.error("Lead magnet form error:", error);
      res.status(500).json({ success: false, error: "An error occurred. Please try again later." });
    }
  });

  app.post("/api/real-estate-funnel", async (req, res) => {
    try {
      const { firstName, lastName, email, mobile, agency, suburb, dealsPerMonth, leadSource, pipelineProblem, utm_source, utm_medium, utm_campaign, referrer } = req.body;
      if (!firstName || !lastName || !mobile || !email || !agency || !suburb || !dealsPerMonth) {
        return res.status(400).json({ success: false, error: "Missing required fields." });
      }
      await storage.createRealEstateFunnelSubmission({
        firstName, lastName, email, mobile, agency, suburb, dealsPerMonth,
        leadSource: leadSource || null,
        pipelineProblem: pipelineProblem || null,
        utmSource: utm_source || null,
        utmMedium: utm_medium || null,
        utmCampaign: utm_campaign || null,
        referrer: referrer || null,
      });
      try {
        await sendRealEstateFunnelNotification({ firstName, lastName, email, mobile, agency, suburb, dealsPerMonth, leadSource: leadSource || "", pipelineProblem: pipelineProblem || "", utm_source, utm_medium, utm_campaign, referrer });
      } catch (emailError) {
        console.error("Failed to send real estate funnel notification:", emailError);
      }
      try {
        await sendRealEstateFunnelConfirmation({ firstName, lastName, email, mobile, agency, suburb, dealsPerMonth, leadSource: leadSource || "", pipelineProblem: pipelineProblem || "", utm_source, utm_medium, utm_campaign, referrer });
      } catch (confirmError) {
        console.error("Failed to send real estate funnel confirmation:", confirmError);
      }
      res.json({ success: true, message: "Application received. We'll be in touch within 24 hours." });
    } catch (error) {
      console.error("Real estate funnel error:", error);
      res.status(500).json({ success: false, error: "An error occurred. Please try again." });
    }
  });

  return httpServer;
}
