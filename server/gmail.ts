// Gmail Integration via @replit/connectors-sdk
// Uses proxy pattern with automatic OAuth2 token refresh
import { ReplitConnectors } from "@replit/connectors-sdk";

async function sendGmail(to: string, subject: string, htmlBody: string): Promise<void> {
  const connectors = new ReplitConnectors();
  const emailLines = [
    "From: me",
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    htmlBody,
  ];
  const raw = Buffer.from(emailLines.join("\r\n"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const response = await connectors.proxy("google-mail", "/gmail/v1/users/me/messages/send", {
    method: "POST",
    body: JSON.stringify({ raw }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gmail send failed (${response.status}): ${errorText}`);
  }
}

export async function sendSubscriberEmail(to: string, subject: string, htmlBody: string): Promise<void> {
  await sendGmail(to, subject, htmlBody);
  console.log(`Sequence email sent to ${to}: ${subject}`);
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  industry?: string | null;
  preferredDate?: string | null;
  message?: string | null;
}

interface LeadMagnetData {
  firstName: string;
  email: string;
}

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  const formattedDate = data.preferredDate
    ? new Date(data.preferredDate).toLocaleString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not specified";

  const subject = `Meeting Request: ${data.firstName} ${data.lastName}${data.industry ? ` (${data.industry})` : ""}`;
  const htmlBody = `
    <h2>New Meeting Request</h2>
    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
    <p><strong>Industry:</strong> ${data.industry || "Not specified"}</p>
    <p><strong>Preferred Date/Time:</strong> ${formattedDate}</p>
    <p><strong>About Their Business:</strong></p>
    <p>${data.message || "No details provided"}</p>
    <hr>
    <p><em>This meeting request was submitted via the AI Pivot Toolbox website.</em></p>
  `;

  await sendGmail("nick@aipivot.com.au, nick@nickgriffiths.com.au", subject, htmlBody);
  console.log("Contact notification email sent successfully");
}

export async function sendLeadMagnetDelivery(data: LeadMagnetData): Promise<void> {
  const BRAND_COLOR = "#0ea5e9";
  const SITE_URL = "https://aipivottoolbox.com.au";

  const subject = `Your Australian Business AI Checklist is here, ${data.firstName} ✓`;
  const htmlBody = `<!DOCTYPE html>
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
  .checklist-title { font-size: 20px; font-weight: 700; color: #0f172a; margin: 28px 0 16px; border-bottom: 2px solid ${BRAND_COLOR}; padding-bottom: 10px; }
  .item { display: flex; align-items: flex-start; margin-bottom: 24px; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid ${BRAND_COLOR}; }
  .item-num { flex-shrink: 0; width: 32px; height: 32px; background: ${BRAND_COLOR}; color: #fff; border-radius: 50%; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-right: 16px; }
  .item-body { flex: 1; }
  .item-body strong { display: block; font-size: 16px; color: #0f172a; margin-bottom: 6px; }
  .item-body p { font-size: 14px; line-height: 1.6; color: #475569; margin: 0; }
  .action { background: #f0f9ff; border-left: 4px solid ${BRAND_COLOR}; padding: 16px 20px; border-radius: 0 6px 6px 0; margin: 28px 0 24px; }
  .action p { margin: 0; font-size: 15px; font-style: italic; color: #0f172a; }
  .cta { display: inline-block; background: ${BRAND_COLOR}; color: #ffffff !important; padding: 14px 28px; border-radius: 6px; font-size: 16px; font-weight: 700; text-decoration: none; margin: 8px 0 24px; }
  .footer { background: #f8fafc; padding: 24px 32px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
  .footer a { color: #64748b; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <a href="${SITE_URL}">AI Pivot Toolbox</a>
  </div>
  <div class="body">
    <p>G'day ${data.firstName},</p>
    <p>Here's your <strong>Australian Business AI Checklist</strong> — 7 things you must do before your competitors do. This is the exact framework we use to get Australian businesses recommended by ChatGPT, Perplexity, and Google AI.</p>
    <p>Each item takes less than a week to action. Most business owners skip half of these. Don't be most business owners.</p>

    <div class="checklist-title">The Australian Business AI Checklist</div>

    <div class="item">
      <div class="item-num">1</div>
      <div class="item-body">
        <strong>Claim and complete your Google Business Profile — fully</strong>
        <p>AI engines pull from structured data first. If your Google Business Profile is incomplete (missing hours, categories, description, or photos), you're invisible. Add at least 10 photos, write a keyword-rich description, and select every relevant category. This is your #1 AI trust signal.</p>
      </div>
    </div>

    <div class="item">
      <div class="item-num">2</div>
      <div class="item-body">
        <strong>Write a clear "What We Do" page that answers questions directly</strong>
        <p>ChatGPT and Perplexity quote pages that answer questions in plain English. Your homepage should open with a one-sentence answer to "What does [Your Business] do?" — no jargon, no "we're passionate about." AI engines reward clarity over cleverness.</p>
      </div>
    </div>

    <div class="item">
      <div class="item-num">3</div>
      <div class="item-body">
        <strong>Add an FAQ section to every core service page</strong>
        <p>AI answer engines are literally question-answering machines. Pages with structured Q&amp;A sections get cited far more often. Write 5–8 real questions your customers ask, then answer each one in 2–3 sentences. Use schema markup (FAQPage) for maximum visibility.</p>
      </div>
    </div>

    <div class="item">
      <div class="item-num">4</div>
      <div class="item-body">
        <strong>Get mentioned on at least 3 credible Australian websites</strong>
        <p>AI engines use citation graphs to decide who to trust. A mention in a local news outlet, industry association, or business directory carries significant weight. Aim for the Yellow Pages, your local Chamber of Commerce, and one industry-specific site this month.</p>
      </div>
    </div>

    <div class="item">
      <div class="item-num">5</div>
      <div class="item-body">
        <strong>Publish one "definitive guide" blog post in your industry</strong>
        <p>AI engines love pages that comprehensively answer a topic. Write a 1,500+ word guide on the #1 question your customers ask (e.g. "How much does [your service] cost in Australia?"). Use real numbers, named tools, and specific timeframes. Update it every 6 months.</p>
      </div>
    </div>

    <div class="item">
      <div class="item-num">6</div>
      <div class="item-body">
        <strong>Make sure your website loads in under 3 seconds on mobile</strong>
        <p>Page speed is a hard ranking signal for both Google and AI engines. Test your site at pagespeed.web.dev. If your mobile score is below 70, your competitors are being recommended instead of you. Common fixes: compress images, remove unused plugins, upgrade your hosting.</p>
      </div>
    </div>

    <div class="item">
      <div class="item-num">7</div>
      <div class="item-body">
        <strong>Set up a consistent review collection system</strong>
        <p>AI engines treat Google reviews as a trust signal. Businesses with 50+ reviews and a 4.5+ star average are significantly more likely to be recommended. Set up an automated SMS or email after every job asking for a Google review. Even 2 new reviews per week compounds fast.</p>
      </div>
    </div>

    <div class="action">
      <p>Quick win: Start with items 1 and 3 — they take under 2 hours combined and produce results within 2–4 weeks.</p>
    </div>

    <p>If you want help implementing any of these — or want to know exactly where your business currently ranks in AI engines — book a free 30-minute Growth Map call. No pitch, no pressure. Just a clear picture of where you stand.</p>

    <a href="${SITE_URL}/#contact" class="cta">Book Your Free Growth Map Call</a>

    <p style="font-size: 14px; color: #64748b;">Takes 30 minutes. You'll walk away with a specific action plan — whether you work with us or not.</p>
  </div>
  <div class="footer">
    <p>AI Pivot Toolbox &mdash; AI Automation for Australian Businesses<br>
    <a href="${SITE_URL}">${SITE_URL}</a></p>
    <p>You're receiving this because you requested the Australian Business AI Checklist. Questions? Just reply to this email.</p>
  </div>
</div>
</body>
</html>`;

  await sendGmail(data.email, subject, htmlBody);
  console.log(`Lead magnet delivery email sent to ${data.email}`);
}

export async function sendLeadMagnetNotification(data: LeadMagnetData): Promise<void> {
  const subject = `New Lead Magnet Download: ${data.firstName} (${data.email})`;
  const htmlBody = `
    <h2>New Lead Magnet Subscriber</h2>
    <p><strong>Name:</strong> ${data.firstName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Resource:</strong> The Australian Business AI Checklist</p>
    <hr>
    <p><em>This lead opted in via the AI Pivot Toolbox homepage lead magnet.</em></p>
  `;
  await sendGmail("nick@aipivot.com.au", subject, htmlBody);
  console.log("Lead magnet notification email sent successfully");
}
