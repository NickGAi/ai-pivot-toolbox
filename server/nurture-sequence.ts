import { db } from "./db";
import { nurtureSequence } from "@shared/schema";
import { eq, lte, and } from "drizzle-orm";

const SENDER = { email: "nick@aipivot.com.au", name: "Nick Griffiths — AI Pivot Toolbox" };

const SCHEDULE = [2, 2, 3, 3, 4, 7];

function getEmail(step: number, firstName: string, agency: string, suburb: string): { subject: string; html: string } {
  const emails: Record<number, { subject: string; html: string }> = {
    0: { subject: `Your Growth Map is ready, ${firstName}`, html: `<p>PLACEHOLDER - Email 1</p>` },
    1: { subject: `The #1 reason agents in ${suburb} lose listings`, html: `<p>PLACEHOLDER - Email 2</p>` },
    2: { subject: `What a 90-day pipeline looks like for ${agency}`, html: `<p>PLACEHOLDER - Email 3</p>` },
    3: { subject: `Real numbers: what follow-up is actually worth`, html: `<p>PLACEHOLDER - Email 4</p>` },
    4: { subject: `The system I'd build for you in week one`, html: `<p>PLACEHOLDER - Email 5</p>` },
    5: { subject: `Still thinking about it, ${firstName}?`, html: `<p>PLACEHOLDER - Email 6</p>` },
    6: { subject: `Last one from me`, html: `<p>PLACEHOLDER - Email 7</p>` },
  };
  return emails[step];
}

async function sendViaSendGrid(to: string, subject: string, html: string): Promise<void> {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: SENDER,
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SendGrid /v3/mail/send error ${res.status}: ${body}`);
  }
}

async function runNurtureCheck(): Promise<void> {
  const due = await db
    .select()
    .from(nurtureSequence)
    .where(and(
      eq(nurtureSequence.completed, false),
      lte(nurtureSequence.nextSendAt, new Date()),
    ));

  for (const contact of due) {
    const step = contact.emailsSent;
    if (step > 6) {
      await db.update(nurtureSequence).set({ completed: true }).where(eq(nurtureSequence.id, contact.id));
      continue;
    }
    try {
      const { subject, html } = getEmail(step, contact.firstName, contact.agency, contact.suburb);
      await sendViaSendGrid(contact.email, subject, html);

      const newCount = step + 1;
      const isLast = newCount >= 7;
      const daysUntilNext = SCHEDULE[step] ?? 7;
      const nextSendAt = new Date(Date.now() + daysUntilNext * 24 * 60 * 60 * 1000);

      await db.update(nurtureSequence)
        .set({ emailsSent: newCount, nextSendAt, completed: isLast })
        .where(eq(nurtureSequence.id, contact.id));

      console.log(`[nurture] Sent email ${newCount}/7 to ${contact.email}`);
    } catch (err) {
      console.error(`[nurture] Failed for ${contact.email}:`, err);
    }
  }
}

export function startNurtureScheduler(): void {
  runNurtureCheck().catch(err => console.error("[nurture] Initial check failed:", err));
  setInterval(() => {
    runNurtureCheck().catch(err => console.error("[nurture] Check failed:", err));
  }, 60 * 60 * 1000);
  console.log("[nurture] Scheduler started — checks every 60 min");
}

export async function enrolInNurture(data: {
  email: string; firstName: string; lastName: string; agency: string; suburb: string;
}): Promise<void> {
  await db.insert(nurtureSequence).values({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    agency: data.agency,
    suburb: data.suburb,
  });
  console.log(`[nurture] Enrolled ${data.email}`);
}
