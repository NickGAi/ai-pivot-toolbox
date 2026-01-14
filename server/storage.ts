import { type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.contactSubmissions = new Map();
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      id,
      firstName: insertSubmission.firstName,
      lastName: insertSubmission.lastName,
      email: insertSubmission.email,
      phone: insertSubmission.phone ?? null,
      industry: insertSubmission.industry ?? null,
      preferredDate: insertSubmission.preferredDate ?? null,
      message: insertSubmission.message ?? null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    console.log("Contact submission received:", submission);
    return submission;
  }
}

export const storage = new MemStorage();
