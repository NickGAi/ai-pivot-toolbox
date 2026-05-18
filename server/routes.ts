import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertLeadMagnetSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactNotification, sendLeadMagnetNotification } from "./gmail";
import { buildDay1Email } from "./email-sequences";
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
        const { subject, html } = buildDay1Email(submission.firstName);
        const { sendSubscriberEmail } = await import("./gmail");
        await sendSubscriberEmail(submission.email, subject, html);
        await storage.advanceLeadMagnetSequenceStep(submission.id, 1);
        console.log(`Day 1 sequence email sent to ${submission.email}`);
      } catch (seqError) {
        console.error("Failed to send Day 1 sequence email:", seqError);
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

  return httpServer;
}
