// Gmail Integration - Connected via Replit
import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  // Always fetch fresh credentials to avoid stale token issues
  connectionSettings = null;
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }
  return accessToken;
}

async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
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

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  try {
    const gmail = await getUncachableGmailClient();
    
    const formattedDate = data.preferredDate 
      ? new Date(data.preferredDate).toLocaleString('en-AU', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : 'Not specified';
    
    const subject = `Meeting Request: ${data.firstName} ${data.lastName}${data.industry ? ` (${data.industry})` : ''}`;
    const htmlBody = `
      <h2>New Meeting Request</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
      <p><strong>Preferred Date/Time:</strong> ${formattedDate}</p>
      <p><strong>About Their Business:</strong></p>
      <p>${data.message || 'No details provided'}</p>
      <hr>
      <p><em>This meeting request was submitted via your AIPivot website.</em></p>
    `;
    
    const emailLines = [
      'From: me',
      'To: nick@aipivot.com.au',
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      htmlBody
    ];

    const email = emailLines.join('\r\n');
    const encodedMessage = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    console.log('Contact notification email sent successfully');
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
}
