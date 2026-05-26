import { storage } from "./storage";
import { sendSubscriberEmail } from "./gmail";

const BRAND_COLOR = "#FF4500";
const SITE_URL = "https://aipivot.com.au";
const BOOKING_URL = "https://calendar.app.google/8HNfmaHndEKnMKpp8";

function emailWrapper(firstName: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { margin: 0; padding: 0; background: #f4f6f8; font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a2e; }
  .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
  .header { background: #0f172a; padding: 28px 32px; }
  .header a { color: ${BRAND_COLOR}; font-size: 18px; font-weight: 700; text-decoration: none; letter-spacing: -0.5px; }
  .body { padding: 36px 32px; }
  .body p { font-size: 16px; line-height: 1.7; margin: 0 0 18px; }
  .body h2 { font-size: 22px; margin: 0 0 20px; color: #0f172a; line-height: 1.3; }
  .cta { display: inline-block; background: ${BRAND_COLOR}; color: #ffffff !important; padding: 14px 28px; border-radius: 6px; font-size: 16px; font-weight: 700; text-decoration: none; margin: 8px 0 24px; }
  .callout { background: #f0f9ff; border-left: 4px solid ${BRAND_COLOR}; padding: 16px 20px; border-radius: 0 6px 6px 0; margin: 24px 0; }
  .callout p { margin: 0; font-size: 15px; }
  .footer { background: #f8fafc; padding: 24px 32px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
  .footer a { color: #64748b; }
  ul { padding-left: 20px; }
  li { font-size: 16px; line-height: 1.7; margin-bottom: 6px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <a href="${SITE_URL}">AI Pivot Toolbox</a>
  </div>
  <div class="body">
    <p>G'day ${firstName},</p>
    ${body}
  </div>
  <div class="footer">
    <p>AI Pivot Toolbox &mdash; AI Automation for Australian Businesses<br>
    <a href="${SITE_URL}">${SITE_URL}</a></p>
    <p>You're receiving this because you downloaded the Australian Business AI Checklist. Questions? Just reply to this email.</p>
  </div>
</div>
</body>
</html>`;
}

export function buildDay1Email(firstName: string): { subject: string; html: string } {
  const subject = "Your AI Checklist is inside (read this first)";
  const body = `
    <h2>Here's your Australian Business AI Checklist</h2>
    <p>You made a smart move downloading this — most business owners are still guessing when it comes to AI. You're already ahead.</p>
    <p>Your checklist covers the 10 highest-impact areas where Australian businesses are using AI right now to cut costs, win more clients, and reclaim hours every week.</p>
    <div class="callout">
      <p><strong>To access your checklist:</strong> <a href="${SITE_URL}/checklist" style="color: ${BRAND_COLOR};">Click here to download the AI Checklist PDF</a></p>
    </div>
    <p>Over the next two weeks I'll send you a few short emails — a real case study, the most common AI mistake I see Australian businesses make, and (if you're ready) how to get a free strategy call with me.</p>
    <p>No fluff. No daily spam. Just the stuff that actually moves the needle.</p>
    <p>Talk soon,<br><strong>Nick</strong><br>AI Pivot Toolbox</p>
  `;
  return { subject, html: emailWrapper(firstName, body) };
}

export function buildDay3Email(firstName: string): { subject: string; html: string } {
  const subject = "How a Brisbane tradie saved 12 hours a week with AI";
  const body = `
    <h2>A real result from a real Australian business</h2>
    <p>Last year I worked with a small plumbing company in Brisbane — two vans, four staff, owner doing most of the admin himself.</p>
    <p>Here's what their week looked like before AI:</p>
    <ul>
      <li>2+ hours a day responding to quote enquiries and follow-ups</li>
      <li>Missed calls going to voicemail, never returned</li>
      <li>Invoices going out 3&ndash;4 days late</li>
      <li>Zero follow-up on jobs that didn't close</li>
    </ul>
    <p>After 6 weeks with an AI voice agent, automated quote follow-up, and Xero invoice automation, here's what changed:</p>
    <ul>
      <li><strong>12 hours a week saved</strong> — the owner got his evenings back</li>
      <li><strong>34% more quotes accepted</strong> — because follow-up actually happened</li>
      <li><strong>Invoice turnaround: same day</strong> — cash flow improved immediately</li>
      <li><strong>Zero missed enquiries</strong> — the AI voice agent handles after-hours calls</li>
    </ul>
    <div class="callout">
      <p>Total monthly investment: <strong>$1,997/mo</strong>. Revenue impact in month one: <strong>$8,400 in recovered leads</strong>.</p>
    </div>
    <p>This isn't a big business with a big budget. It's a tradie who decided to stop doing admin manually.</p>
    <p>Which of those pain points sounds most like yours? Hit reply and let me know — I read every response.</p>
    <p>Talk soon,<br><strong>Nick</strong><br>AI Pivot Toolbox</p>
  `;
  return { subject, html: emailWrapper(firstName, body) };
}

export function buildDay7Email(firstName: string): { subject: string; html: string } {
  const subject = "The #1 AI mistake Australian businesses make (don't do this)";
  const body = `
    <h2>The mistake that kills AI ROI before it starts</h2>
    <p>I've spoken to hundreds of Australian business owners about AI. And the single most common mistake I see — the one that wastes thousands of dollars and months of time — is this:</p>
    <div class="callout">
      <p><strong>They automate the wrong thing first.</strong></p>
    </div>
    <p>They hear "AI" and immediately think they need a chatbot on their website, or they sign up for some all-in-one tool that promises to do everything.</p>
    <p>Then three months later: the chatbot barely gets used, the tool is half-configured, and they've written off AI as "not for us."</p>
    <p>The businesses getting real results do the opposite. They start by asking one question:</p>
    <p><em>"What task costs us the most time or money every single week?"</em></p>
    <p>Then they automate that. Just that. Get the win. Build confidence. Expand.</p>
    <p>For most Australian SMBs, the highest-value first automation is one of these three:</p>
    <ul>
      <li><strong>Lead follow-up</strong> — 80% of sales require 5+ contacts; almost no one follows up more than twice</li>
      <li><strong>After-hours enquiry handling</strong> — your competitors aren't answering at 9pm either; be the one who does</li>
      <li><strong>Invoice and payment chasing</strong> — removing humans from this loop cuts debtor days in half</li>
    </ul>
    <p>Which one is your biggest lever right now? Reply and I'll point you in the right direction — no cost, no obligation.</p>
    <p>Talk soon,<br><strong>Nick</strong><br>AI Pivot Toolbox</p>
  `;
  return { subject, html: emailWrapper(firstName, body) };
}

export function buildDay14Email(firstName: string): { subject: string; html: string } {
  const subject = "After 24 years in real estate, I built this for businesses like yours";
  const body = `
    <h2>Ready to put AI to work in your business?</h2>
    <p>You've had a look at the checklist, you've seen what's possible. Now it's time to answer the practical question:</p>
    <p><em>What would AI actually do for <strong>your</strong> business, right now, with your budget?</em></p>
    <p>That's exactly what we cover in a free 30-minute Growth Map Call with me.</p>
    <p>No sales pitch. No PowerPoint. Just a direct conversation where I look at your business, identify the two or three automations most likely to pay for themselves fast, and give you a clear action plan — whether you work with me or not.</p>
    <p>Here's what past callers have walked away with:</p>
    <ul>
      <li>A ranked list of automation opportunities specific to their industry</li>
      <li>Realistic cost vs. ROI estimates (with real dollar figures)</li>
      <li>A clear first step they could take themselves or with AI Pivot Toolbox</li>
    </ul>
    <a href="${BOOKING_URL}" class="cta">Book Your Free Growth Map Call</a>
    <p>Spots are limited — I cap these at 5 per week to keep them genuinely useful. If you've been sitting on the fence, this is the easiest way to get clarity.</p>
    <p>Talk soon,<br><strong>Nick</strong><br>AI Pivot Toolbox</p>
    <p style="font-size: 14px; color: #64748b;">P.S. If the timing isn't right yet, no worries — you can always book later at <a href="${BOOKING_URL}" style="color: ${BRAND_COLOR};">aipivot.com.au</a>.</p>
  `;
  return { subject, html: emailWrapper(firstName, body) };
}

interface SequenceStep {
  step: number;
  daysAfterSignup: number;
  builder: (firstName: string) => { subject: string; html: string };
  nextStep: number;
  label: string;
}

const SEQUENCE_STEPS: SequenceStep[] = [
  { step: 0, daysAfterSignup: 0,  builder: buildDay1Email,  nextStep: 1, label: "Day 1 – Checklist delivery" },
  { step: 1, daysAfterSignup: 3,  builder: buildDay3Email,  nextStep: 2, label: "Day 3 – Case study" },
  { step: 2, daysAfterSignup: 7,  builder: buildDay7Email,  nextStep: 3, label: "Day 7 – Common mistake" },
  { step: 3, daysAfterSignup: 14, builder: buildDay14Email, nextStep: 4, label: "Day 14 – Book a call CTA" },
];

async function processSequenceStep(step: SequenceStep): Promise<void> {
  const submissions = await storage.getLeadMagnetSubmissionsDueForSequence(
    step.step,
    step.daysAfterSignup
  );

  if (submissions.length === 0) return;

  console.log(`[email-sequence] ${step.label}: ${submissions.length} subscriber(s) due`);

  for (const sub of submissions) {
    try {
      const { subject, html } = step.builder(sub.firstName);
      await sendSubscriberEmail(sub.email, subject, html);
      await storage.advanceLeadMagnetSequenceStep(sub.id, step.nextStep);
      console.log(`[email-sequence] Sent "${step.label}" to ${sub.email}`);
    } catch (err) {
      console.error(`[email-sequence] Failed to send "${step.label}" to ${sub.email}:`, err);
    }
  }
}

export async function runSequenceCheck(): Promise<void> {
  for (const step of SEQUENCE_STEPS) {
    await processSequenceStep(step);
  }
}

export function startEmailSequenceScheduler(): void {
  const INTERVAL_MS = 60 * 60 * 1000;

  runSequenceCheck().catch((err) =>
    console.error("[email-sequence] Initial sequence check failed:", err)
  );

  setInterval(() => {
    runSequenceCheck().catch((err) =>
      console.error("[email-sequence] Sequence check failed:", err)
    );
  }, INTERVAL_MS);

  console.log("[email-sequence] Scheduler started — checks every hour");
}
