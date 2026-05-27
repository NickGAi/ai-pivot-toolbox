import { db } from "./db";
import { nurtureSequence } from "@shared/schema";
import { eq, lte, and } from "drizzle-orm";

const SENDER = { email: "nick@aipivot.com.au", name: "Nick Griffiths — AI Pivot" };

const SCHEDULE = [2, 2, 3, 3, 4, 7];

function getEmail(step: number, firstName: string, agency: string, suburb: string): { subject: string; html: string } {
  const emails: Record<number, { subject: string; html: string }> = {
    0: {
      subject: `Your Pipeline Growth Map — what happens next`,
      html: `<p>Hi ${firstName},</p>
<p>Thanks for applying — I've received your Growth Map request for <strong>${agency}</strong> in <strong>${suburb}</strong>.</p>
<p>Here's exactly what happens next:</p>
<p>Over the next few days I'm going to send you 3 short insights that show you exactly where most agents are leaking listings — and how to plug the gaps with a system that runs automatically.</p>
<p>No fluff. No theory. Just what's actually working for agents in Australia right now.</p>
<p>First one lands tomorrow.</p>
<p>— Nick<br>AI Pivot<br>0415 685 544</p>`,
    },
    1: {
      subject: `The dirty little secret about real estate marketing`,
      html: `<p>Hi ${firstName},</p>
<p>Here's something most agents never want to admit.</p>
<p>At any given moment, only <strong>3% of people in your market</strong> are actually ready to list right now.</p>
<p>Three. Percent.</p>
<p>But most agents blast every dollar of their budget chasing that 3% — then complain that portals don't work when the phone doesn't ring overnight.</p>
<p>Here's the play the top agents are running:</p>
<p>They go after the 3%. But they also capture and nurture the other 97% — so when those people ARE ready, there's only one agent they've been hearing from for the last 6 months.</p>
<p>That's not luck. That's a system.</p>
<p>Next, I'll show you exactly what that system looks like — and how it runs without you lifting a finger.</p>
<p>— Nick<br>AI Pivot<br>0415 685 544</p>`,
    },
    2: {
      subject: `A lead came in at 9:47pm...`,
      html: `<p>Hi ${firstName},</p>
<p>A buyer sent an enquiry at 9:47pm last Tuesday.</p>
<p>The agent was at dinner.</p>
<p>By 9am the next morning, that buyer had already spoken to two other agents and booked an appraisal with one of them.</p>
<p>The first agent never even knew they existed.</p>
<p>This happens hundreds of times a day across Australia. Not because agents don't care — but because they don't have a system that works when they're not working.</p>
<p>AI Pivot plugs into every lead you're already getting — portals, open homes, website, socials — and automatically replies within seconds, follows up over weeks, and books them into your calendar.</p>
<p>No extra staff. No manual work. Just a system that runs while you sleep.</p>
<p>Hit reply if you want to see what this looks like for <strong>${agency}</strong> specifically.</p>
<p>— Nick<br>AI Pivot<br>0415 685 544</p>`,
    },
    3: {
      subject: `What agents are saying after 90 days`,
      html: `<p>Hi ${firstName},</p>
<p>After 24 years in real estate I know exactly what a leaking pipeline looks like.</p>
<p>Because I watched it happen to good agents every single day.</p>
<p>The leads weren't bad. The follow-up was missing.</p>
<p>An enquiry comes in at the wrong time. Gets missed. Goes cold. That agent never knew how close they were to a listing.</p>
<p>The Growth Map session shows you exactly where this is happening in <strong>${agency}</strong> right now — in black and white. Which leads came in, which got followed up, which ones slipped through.</p>
<p>In a typical agent's pipeline, the Growth Map process usually surfaces between 8 and 15 leads that came in but never got the right follow-up.</p>
<p>Most agents are surprised by what they see.</p>
<p>Ready to look at your numbers? Hit reply and I'll send you a booking link.</p>
<p>— Nick<br>AI Pivot<br>0415 685 544</p>`,
    },
    4: {
      subject: `AI sounds complicated...`,
      html: `<p>Hi ${firstName},</p>
<p>The most common thing I hear from agents before they try AI Pivot:</p>
<p><em>"AI sounds complicated. I'm not a tech person."</em></p>
<p>Here's the truth — you don't touch the technology. That's our job.</p>
<p>We build it, connect it to your existing leads, test it, and hand you something that just works. You see the results in your calendar — more bookings, more appraisals, more listings.</p>
<p>The agents using AI Pivot aren't tech people. They're just agents who got sick of watching leads go cold and decided to do something about it.</p>
<p>After 24 years in real estate, I built this because I lived the problem firsthand. If you're doing 3-5 deals a month and want to squeeze more listings out of the pipeline you already have — this was built for you.</p>
<p>Reply to this email or call me directly on <strong>0415 685 544</strong>.</p>
<p>— Nick<br>AI Pivot<br>0415 685 544</p>`,
    },
    5: {
      subject: `Still thinking about it, ${firstName}?`,
      html: `<p>Hi ${firstName},</p>
<p>Two weeks ago you applied for a free 90-Day Pipeline Growth Map.</p>
<p>I haven't heard back — which usually means one of two things:</p>
<p>Life got busy. Or you're not sure if it's worth 30 minutes.</p>
<p>Here's what the call actually looks like:</p>
<p>We spend 30 minutes looking at your pipeline together. Where leads are coming from, what's happening to them, and exactly where you're losing listings you should be winning.</p>
<p>You walk away with 3 specific things you can do immediately — whether you work with us or not.</p>
<p>No pitch. No pressure. No obligation.</p>
<p><a href="https://calendar.app.google/8HNfmaHndEKnMKpp8" style="background:#FF4500;color:#141413;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;margin-top:8px;">Book My Free Strategy Call →</a></p>
<p>— Nick<br>AI Pivot<br>0415 685 544</p>`,
    },
    6: {
      subject: `Closing your file, ${firstName}`,
      html: `<p>Hi ${firstName},</p>
<p>I'm going to close your Growth Map application at the end of this week.</p>
<p>Not because I don't want to help — but because I only work with a small number of agents each month and I need to keep spots open for people who are ready to move.</p>
<p>If you're still interested in seeing how many extra listings are sitting in your existing database — reply to this email today and I'll send you a booking link directly.</p>
<p>Or book straight in here:</p>
<p><a href="https://calendar.app.google/8HNfmaHndEKnMKpp8" style="background:#FF4500;color:#141413;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;margin-top:8px;">Book My Free Strategy Call →</a></p>
<p>If the timing isn't right, no worries at all. I'll be here when it is.</p>
<p>— Nick<br>AI Pivot<br>0415 685 544</p>`,
    },
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
