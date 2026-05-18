import {
  type ContactSubmission, type InsertContactSubmission, contactSubmissions,
  type LeadMagnetSubmission, type InsertLeadMagnet, leadMagnetSubmissions,
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createLeadMagnetSubmission(submission: InsertLeadMagnet): Promise<LeadMagnetSubmission>;
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
    const [submission] = await db.insert(leadMagnetSubmissions).values(insertSubmission).returning();
    console.log("Lead magnet submission saved to database:", submission);
    return submission;
  }
}

export const storage = new DatabaseStorage();
