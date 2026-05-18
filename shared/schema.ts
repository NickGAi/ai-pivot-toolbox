import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  industry: text("industry"),
  preferredDate: text("preferred_date"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please provide a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const leadMagnetSubmissions = pgTable("lead_magnet_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  sequenceStep: integer("sequence_step").notNull().default(0),
  sequenceLastSentAt: timestamp("sequence_last_sent_at"),
});

export const insertLeadMagnetSchema = createInsertSchema(leadMagnetSubmissions).omit({
  id: true,
  createdAt: true,
  sequenceStep: true,
  sequenceLastSentAt: true,
}).extend({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please provide a valid email address"),
});

export type InsertLeadMagnet = z.infer<typeof insertLeadMagnetSchema>;
export type LeadMagnetSubmission = typeof leadMagnetSubmissions.$inferSelect;
