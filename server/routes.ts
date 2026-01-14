import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactNotification } from "./gmail";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
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
        // Continue even if email fails - the submission is still saved
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

  return httpServer;
}
