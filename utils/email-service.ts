// Email service with SendGrid integration and safety features
// NOTE: In production, SendGrid API key should be accessed via server-side API route
// to prevent client-side exposure. Current implementation is for demonstration only.

const SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;
const FOUNDER_EMAIL = process.env.NEXT_PUBLIC_FOUNDER_EMAIL || "founder@ridewire.ai";
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "RideWire Inc.";

// Rate limiting
// NOTE: In production, this should use persistent storage (Redis, database)
// to work correctly across restarts and multi-instance deployments
const emailsSentToday: Date[] = [];
const MAX_EMAILS_PER_DAY = 100;
const MIN_DELAY_BETWEEN_EMAILS = 5000; // 5 seconds
let lastEmailSent: Date | null = null;

// Legal footer required by CAN-SPAM Act
export const LEGAL_FOOTER = `
<hr style="border: 1px solid #ccc; margin: 20px 0;" />
<p style="font-size: 11px; color: #666; line-height: 1.5;">
  <strong>Legal Disclaimer:</strong> This email is sent in accordance with the CAN-SPAM Act. 
  This is not a securities offering. Investment opportunities are only available to accredited investors 
  and subject to SEC Regulation D compliance.
</p>
<p style="font-size: 11px; color: #666;">
  ${COMPANY_NAME}<br/>
  If you no longer wish to receive these emails, please 
  <a href="{{unsubscribe_url}}" style="color: #0066cc;">unsubscribe here</a>.
</p>
`;

// Rate limit check
export async function rateLimitCheck(): Promise<void> {
  // Remove emails older than 24 hours
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  while (emailsSentToday.length > 0 && emailsSentToday[0] < yesterday) {
    emailsSentToday.shift();
  }
  
  // Check daily limit
  if (emailsSentToday.length >= MAX_EMAILS_PER_DAY) {
    throw new Error(`Daily email limit reached (${MAX_EMAILS_PER_DAY}). Try again tomorrow.`);
  }
  
  // Check delay between emails
  if (lastEmailSent) {
    const timeSinceLastEmail = now.getTime() - lastEmailSent.getTime();
    if (timeSinceLastEmail < MIN_DELAY_BETWEEN_EMAILS) {
      const waitTime = MIN_DELAY_BETWEEN_EMAILS - timeSinceLastEmail;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// Calculate spam score (simplified)
export function calculateSpamScore(subject: string, body: string): number {
  let score = 0;
  
  // Check for spam trigger words
  const spamWords = [
    'free money', 'act now', 'limited time', 'click here', 
    'buy now', 'cash bonus', 'guarantee', '100%', 'risk free',
    'urgent', 'winner', 'congratulations'
  ];
  
  const lowerBody = body.toLowerCase();
  const lowerSubject = subject.toLowerCase();
  
  spamWords.forEach(word => {
    if (lowerBody.includes(word) || lowerSubject.includes(word)) {
      score += 1;
    }
  });
  
  // Check for excessive caps
  const capsRatio = (body.match(/[A-Z]/g) || []).length / body.length;
  if (capsRatio > 0.3) {
    score += 2;
  }
  
  // Check for excessive exclamation marks
  const exclamationCount = (body.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    score += 1;
  }
  
  // Check for excessive links
  const linkCount = (body.match(/https?:\/\//g) || []).length;
  if (linkCount > 5) {
    score += 1;
  }
  
  return score;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if email is disposable
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    'tempmail.com', 'throwaway.email', '10minutemail.com',
    'guerrillamail.com', 'mailinator.com'
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}

// Main email sending function
export interface SendEmailOptions {
  to: string;
  subject: string;
  body: string;
  investorName?: string;
  firmName?: string;
}

export async function sendInvestorEmail({
  to,
  subject,
  body,
  investorName,
  firmName
}: SendEmailOptions): Promise<{
  success: boolean;
  message: string;
  emailId?: string;
}> {
  try {
    // Validate email
    if (!isValidEmail(to)) {
      throw new Error("Invalid email format");
    }
    
    if (isDisposableEmail(to)) {
      throw new Error("Disposable email addresses are not allowed");
    }
    
    // Rate limiting check
    await rateLimitCheck();
    
    // Spam score check
    const spamScore = calculateSpamScore(subject, body);
    if (spamScore > 5) {
      throw new Error(`Email flagged as potential spam (score: ${spamScore}). Please revise content.`);
    }
    
    // If SendGrid is not configured, log to console
    if (!SENDGRID_API_KEY) {
      console.warn("⚠️ SendGrid not configured. Email logged to console instead.");
      console.log("📧 EMAIL PREVIEW:");
      console.log("To:", to);
      console.log("Subject:", subject);
      console.log("Body:", body);
      console.log("---");
      
      // Still track the send
      emailsSentToday.push(new Date());
      lastEmailSent = new Date();
      
      return {
        success: true,
        message: "Email logged to console (SendGrid not configured)",
        emailId: `console-${Date.now()}`
      };
    }
    
    // Send via SendGrid
    const emailBody = body + LEGAL_FOOTER.replace('{{unsubscribe_url}}', 
      `https://ridewire.ai/unsubscribe?email=${encodeURIComponent(to)}`
    );
    
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ 
            email: to,
            name: investorName 
          }],
          subject: subject
        }],
        from: { 
          email: FOUNDER_EMAIL,
          name: "RideWire Team"
        },
        content: [{
          type: "text/html",
          value: emailBody
        }],
        tracking_settings: {
          click_tracking: { enable: true },
          open_tracking: { enable: true }
        },
        reply_to: {
          email: FOUNDER_EMAIL
        }
      })
    });
    
    // Track the send
    emailsSentToday.push(new Date());
    lastEmailSent = new Date();
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SendGrid API error: ${errorText}`);
    }
    
    // Get message ID from response headers
    const messageId = response.headers.get('x-message-id') || `sg-${Date.now()}`;
    
    return {
      success: true,
      message: "Email sent successfully",
      emailId: messageId
    };
    
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Batch email sending with retry logic
export async function sendBatchEmails(
  emails: SendEmailOptions[],
  onProgress?: (completed: number, total: number, status: string) => void
): Promise<{
  successful: number;
  failed: number;
  results: Array<{ email: string; success: boolean; message: string }>;
}> {
  const results: Array<{ email: string; success: boolean; message: string }> = [];
  let successful = 0;
  let failed = 0;
  
  for (let i = 0; i < emails.length; i++) {
    const emailData = emails[i];
    
    // Report progress
    if (onProgress) {
      onProgress(i, emails.length, `Sending to ${emailData.to}...`);
    }
    
    // Retry logic (max 3 attempts)
    let attempts = 0;
    let result;
    
    while (attempts < 3) {
      result = await sendInvestorEmail(emailData);
      
      if (result.success) {
        successful++;
        results.push({
          email: emailData.to,
          success: true,
          message: result.message
        });
        break;
      } else {
        attempts++;
        if (attempts < 3) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }
    }
    
    if (!result?.success) {
      failed++;
      results.push({
        email: emailData.to,
        success: false,
        message: result?.message || "Failed after 3 attempts"
      });
    }
  }
  
  if (onProgress) {
    onProgress(emails.length, emails.length, "Complete");
  }
  
  return { successful, failed, results };
}

// Get remaining emails for today
export function getRemainingEmailsToday(): number {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  // Clean up old entries
  while (emailsSentToday.length > 0 && emailsSentToday[0] < yesterday) {
    emailsSentToday.shift();
  }
  
  return MAX_EMAILS_PER_DAY - emailsSentToday.length;
}
