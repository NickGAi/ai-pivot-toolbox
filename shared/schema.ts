import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
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
  lastName: z.string().optional().default(""),
  phone: z.string().min(1, "Phone number is required"),
  preferredDate: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const realEstateFunnelSubmissions = pgTable("real_estate_funnel_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  agency: text("agency").notNull(),
  suburb: text("suburb").notNull(),
  dealsPerMonth: text("deals_per_month").notNull(),
  leadSource: text("lead_source"),
  pipelineProblem: text("pipeline_problem"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertRealEstateFunnelSchema = createInsertSchema(realEstateFunnelSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertRealEstateFunnel = z.infer<typeof insertRealEstateFunnelSchema>;
export type RealEstateFunnelSubmission = typeof realEstateFunnelSubmissions.$inferSelect;

export const tradiesFunnelSubmissions = pgTable("tradies_funnel_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  businessName: text("business_name").notNull(),
  tradeType: text("trade_type").notNull(),
  suburb: text("suburb").notNull(),
  jobsPerMonth: text("jobs_per_month").notNull(),
  leadSource: text("lead_source"),
  biggestProblem: text("biggest_problem"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertTradiesFunnelSchema = createInsertSchema(tradiesFunnelSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertTradiesFunnel = z.infer<typeof insertTradiesFunnelSchema>;
export type TradiesFunnelSubmission = typeof tradiesFunnelSubmissions.$inferSelect;

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
  firstName: z.string().optional().default(""),
  email: z.string().email("Please provide a valid email address"),
});

export type InsertLeadMagnet = z.infer<typeof insertLeadMagnetSchema>;
export type LeadMagnetSubmission = typeof leadMagnetSubmissions.$inferSelect;

export const nurtureSequence = pgTable("nurture_sequence", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  agency: text("agency").notNull(),
  suburb: text("suburb").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  emailsSent: integer("emails_sent").notNull().default(0),
  nextSendAt: timestamp("next_send_at").notNull().default(sql`now()`),
  completed: boolean("completed").notNull().default(false),
});
