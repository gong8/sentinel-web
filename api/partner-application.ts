import type { VercelRequest, VercelResponse } from '@vercel/node';

interface PartnerApplication {
  name: string;
  email: string;
  company: string;
  role: string;
  agentCount: string;
  useCase?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'hello@sentinel.london';

function generateNotificationEmail(data: PartnerApplication): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Design Partner Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px;">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #4E00FF 0%, #6B00FF 100%); border-radius: 16px 16px 0 0; padding: 32px 40px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; font-family: 'IBM Plex Sans', -apple-system, sans-serif;">
                New Design Partner Application
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                A new application has been submitted
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background-color: #141414; border: 1px solid #262626; border-top: none; border-radius: 0 0 16px 16px; padding: 32px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'IBM Plex Mono', monospace;">Name</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">${escapeHtml(data.name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'IBM Plex Mono', monospace;">Email</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">
                      <a href="mailto:${escapeHtml(data.email)}" style="color: #8B5CF6; text-decoration: none;">${escapeHtml(data.email)}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'IBM Plex Mono', monospace;">Company</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">${escapeHtml(data.company)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'IBM Plex Mono', monospace;">Role</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">${escapeHtml(data.role)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0 0 6px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'IBM Plex Mono', monospace;">Agent Count</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px;">${escapeHtml(data.agentCount)}</p>
                  </td>
                </tr>
                ${data.useCase ? `
                <tr>
                  <td>
                    <p style="margin: 0 0 6px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'IBM Plex Mono', monospace;">Use Case</p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.useCase)}</p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 12px; font-family: 'IBM Plex Mono', monospace;">
                Sentinel Design Partner Programme
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function generateConfirmationEmail(data: PartnerApplication): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Application Received - Sentinel</title>
  <style>
    :root {
      color-scheme: light dark;
    }
    @media (prefers-color-scheme: dark) {
      .body-bg { background-color: #0a0a0a !important; }
      .card-bg { background-color: #141414 !important; border-color: #262626 !important; }
      .text-primary { color: #ffffff !important; }
      .text-secondary { color: #a1a1aa !important; }
      .text-muted { color: #71717a !important; }
    }
    @media (prefers-color-scheme: light) {
      .body-bg { background-color: #fafafa !important; }
      .card-bg { background-color: #ffffff !important; border-color: #e4e4e7 !important; }
      .text-primary { color: #09090b !important; }
      .text-secondary { color: #52525b !important; }
      .text-muted { color: #71717a !important; }
    }
  </style>
</head>
<body class="body-bg" style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="body-bg" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px;">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #4E00FF 0%, #6B00FF 100%); border-radius: 16px 16px 0 0; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; font-family: 'IBM Plex Sans', -apple-system, sans-serif;">
                Sentinel
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="card-bg" style="background-color: #141414; border: 1px solid #262626; border-top: none; border-radius: 0 0 16px 16px; padding: 40px;">
              <h2 class="text-primary" style="margin: 0 0 16px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Application Received
              </h2>

              <p class="text-secondary" style="margin: 0 0 24px 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                Hi ${escapeHtml(data.name.split(' ')[0])},
              </p>

              <p class="text-secondary" style="margin: 0 0 24px 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                Thank you for your interest in becoming a Sentinel design partner. We've received your application and are excited to learn more about how you're using AI agents at ${escapeHtml(data.company)}.
              </p>

              <p class="text-secondary" style="margin: 0 0 32px 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                Our team will review your application and get back to you within 2-3 business days. In the meantime, feel free to reply to this email if you have any questions.
              </p>

              <!-- Summary Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(139, 92, 246, 0.1); border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.2);">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px 0; color: #8B5CF6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; font-family: 'IBM Plex Mono', monospace;">
                      Your Application Summary
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="text-muted" style="color: #71717a; font-size: 14px; padding: 4px 0;">Company:</td>
                        <td class="text-primary" style="color: #ffffff; font-size: 14px; padding: 4px 0; text-align: right;">${escapeHtml(data.company)}</td>
                      </tr>
                      <tr>
                        <td class="text-muted" style="color: #71717a; font-size: 14px; padding: 4px 0;">Role:</td>
                        <td class="text-primary" style="color: #ffffff; font-size: 14px; padding: 4px 0; text-align: right;">${escapeHtml(data.role)}</td>
                      </tr>
                      <tr>
                        <td class="text-muted" style="color: #71717a; font-size: 14px; padding: 4px 0;">Agent Count:</td>
                        <td class="text-primary" style="color: #ffffff; font-size: 14px; padding: 4px 0; text-align: right;">${escapeHtml(data.agentCount)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p class="text-secondary" style="margin: 32px 0 0 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <span class="text-primary" style="color: #ffffff;">The Sentinel Team</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p class="text-muted" style="margin: 0 0 8px 0; color: #71717a; font-size: 12px; font-family: 'IBM Plex Mono', monospace;">
                Sentinel - Unified governance for AI agents
              </p>
              <p class="text-muted" style="margin: 0; color: #52525b; font-size: 11px;">
                <a href="https://sentinel.london" style="color: #8B5CF6; text-decoration: none;">sentinel.london</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sentinel <hello@sentinel.london>',
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for API key
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const { name, email, company, role, agentCount, useCase } = req.body as PartnerApplication;

    // Validate required fields
    if (!name || !email || !company || !role || !agentCount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const applicationData: PartnerApplication = {
      name,
      email,
      company,
      role,
      agentCount,
      useCase,
    };

    // Send notification email to team
    const notificationResult = await sendEmail(
      NOTIFICATION_EMAIL,
      `New Design Partner Application: ${company}`,
      generateNotificationEmail(applicationData)
    );

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error);
    }

    // Send confirmation email to applicant
    const confirmationResult = await sendEmail(
      email,
      'Application Received - Sentinel Design Partner Programme',
      generateConfirmationEmail(applicationData)
    );

    if (!confirmationResult.success) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
      // Still return success since we received the application
    }

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error processing application:', error);
    return res.status(500).json({ error: 'Failed to process application' });
  }
}
