import {
  type ContactSubmission, type InsertContactSubmission, contactSubmissions,
  type LeadMagnetSubmission, type InsertLeadMagnet, leadMagnetSubmissions,
} from "@shared/schema";
import { db } from "./db";
import { lte, lt, and, eq } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createLeadMagnetSubmission(submission: InsertLeadMagnet): Promise<LeadMagnetSubmission>;
  getLeadMagnetSubmissionsDueForSequence(step: number, daysAfterSignup: number): Promise<LeadMagnetSubmission[]>;
  advanceLeadMagnetSequenceStep(id: string, nextStep: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
    console.log("Contact submission saved to database:", submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }

  async createLeadMagnetSubmission(insertSubmission: InsertLeadMagnet): Promise<LeadMagnetSubmission> {
    const [submission] = await db.insert(leadMagnetSubmissions).values({ ...insertSubmission, sequenceStep: 1 }).returning();
    console.log("Lead magnet submission saved to database:", submission);
    return submission;
  }

  async getLeadMagnetSubmissionsDueForSequence(step: number, daysAfterSignup: number): Promise<LeadMagnetSubmission[]> {
    const cutoff = new Date(Date.now() - daysAfterSignup * 24 * 60 * 60 * 1000);
    return await db
      .select()
      .from(leadMagnetSubmissions)
      .where(and(eq(leadMagnetSubmissions.sequenceStep, step), lte(leadMagnetSubmissions.createdAt, cutoff)));
  }

  async advanceLeadMagnetSequenceStep(id: string, nextStep: number): Promise<void> {
    await db
      .update(leadMagnetSubmissions)
      .set({ sequenceStep: nextStep, sequenceLastSentAt: new Date() })
      .where(eq(leadMagnetSubmissions.id, id));
  }
}

export const storage = new DatabaseStorage();
