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
