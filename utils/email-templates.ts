import { Investor } from '../types';

// Email template generator with AI-powered personalization

export interface EmailVariables {
  investorName: string;
  firmName: string;
  recentInvestment?: string;
  founderName: string;
  companyName: string;
  companyDescription: string;
  fundingAmount: string;
  keyMetric?: string;
}

// Generate personalized subject lines
export function generateSubjectLines(investor: Investor, variables: EmailVariables): string[] {
  const { investorName, firmName, recentInvestment } = variables;
  
  return [
    // Variant 1: Direct and metric-focused
    `${investorName} - RideWire: Stark-class AI for $47B automotive repair market`,
    
    // Variant 2: Reference their recent investment
    recentInvestment 
      ? `${investorName} - Similar to ${recentInvestment}, but for automotive diagnostics`
      : `${investorName} - 40% first-time fix rate improvement with AI`,
    
    // Variant 3: Problem-focused
    `${investorName} - Solving the $14B automotive misdiagnosis problem`
  ];
}

// Generate personalized email body (3 variants for A/B testing)
export function generateEmailBody(
  investor: Investor,
  variables: EmailVariables,
  variant: 1 | 2 | 3 = 1
): string {
  const {
    investorName,
    firmName,
    recentInvestment,
    founderName,
    companyName,
    companyDescription,
    fundingAmount,
    keyMetric
  } = variables;
  
  // Opening paragraph variations
  const openings = [
    // Variant 1: Reference their recent investment
    recentInvestment
      ? `I noticed ${firmName} recently invested in ${recentInvestment}. ${companyName} solves a similar problem in the $47B automotive repair market.`
      : `I've been following ${firmName}'s investments in ${investor.sectors[0]} and believe ${companyName} aligns with your thesis.`,
    
    // Variant 2: Direct problem statement
    `The automotive repair industry has a $14B misdiagnosis problem. ${companyName} is solving it with multi-agent AI.`,
    
    // Variant 3: Metric-focused
    keyMetric
      ? `${keyMetric} - that's what we've achieved in 30 days with ${companyName}.`
      : `We've increased first-time fix rates by 40% using AI-powered diagnostics.`
  ];
  
  // Core value proposition
  const valueProps = [
    // Variant 1: Technical
    `We're building a Stark-class AR diagnostic OS that uses multi-agent AI to guide mechanics through complex repairs. Think Jarvis for automotive technicians.`,
    
    // Variant 2: Market-focused  
    `${companyName} is an AI-powered diagnostic platform for the 250,000 independent repair shops in the US. We increase first-time fix rates and reduce comebacks.`,
    
    // Variant 3: Founder story
    `After watching mechanics struggle with misdiagnoses, I built R.I.D.E. OS - a multi-agent AI system that provides real-time repair guidance through AR glasses.`
  ];
  
  // Traction/Proof points
  const traction = [
    // Variant 1: Development speed
    `Built R.I.D.E. OS in 30 days. Ready to ship to 1,000 shops.`,
    
    // Variant 2: Market validation
    `Early pilots with 3 shops show 40% improvement in first-time fix rates and 6-hour reduction in diagnostic time.`,
    
    // Variant 3: Technical achievement
    `Our multi-agent system combines computer vision, OBD-II data, and repair manuals to provide context-aware guidance.`
  ];
  
  // Call to action
  const ctas = [
    `Raising ${fundingAmount} seed. Would love 15 minutes to show you the demo.`,
    `Looking to connect for ${fundingAmount} seed round. Happy to share our technical roadmap and pilot results.`,
    `We're raising ${fundingAmount}. Can I send you a demo video?`
  ];
  
  // Select variant
  const variantIndex = variant - 1;
  
  const body = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
  <p>Hi ${investorName},</p>
  
  <p>${openings[variantIndex]}</p>
  
  <p>${valueProps[variantIndex]}</p>
  
  <p>${traction[variantIndex]}</p>
  
  <p>${ctas[variantIndex]}</p>
  
  <p>Best,<br/>
  ${founderName}</p>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 13px; color: #666;">
    <p><strong>${companyName}</strong> - ${companyDescription}</p>
  </div>
</div>
  `.trim();
  
  return body;
}

// Pre-built templates for quick access
export const EMAIL_TEMPLATES = {
  COLD_OUTREACH: {
    id: 'cold-outreach',
    name: 'Cold Outreach',
    description: 'First contact with investor',
    mergeTags: [
      '{{investor_name}}',
      '{{firm_name}}',
      '{{recent_investment}}',
      '{{founder_name}}',
      '{{company_name}}',
      '{{funding_amount}}'
    ]
  },
  FOLLOW_UP: {
    id: 'follow-up',
    name: 'Follow Up',
    description: 'Follow up after no response',
    mergeTags: [
      '{{investor_name}}',
      '{{days_since_last_email}}',
      '{{founder_name}}'
    ]
  },
  DEMO_INVITE: {
    id: 'demo-invite',
    name: 'Demo Invitation',
    description: 'Invite to product demo',
    mergeTags: [
      '{{investor_name}}',
      '{{demo_link}}',
      '{{founder_name}}'
    ]
  },
  MEETING_CONFIRMATION: {
    id: 'meeting-confirmation',
    name: 'Meeting Confirmation',
    description: 'Confirm scheduled meeting',
    mergeTags: [
      '{{investor_name}}',
      '{{meeting_date}}',
      '{{meeting_time}}',
      '{{meeting_link}}',
      '{{founder_name}}'
    ]
  }
};

// Generate follow-up email
export function generateFollowUpEmail(
  investor: Investor,
  daysSinceLastEmail: number,
  founderName: string
): string {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
  <p>Hi ${investor.name},</p>
  
  <p>Following up on my email from ${daysSinceLastEmail} days ago about RideWire.</p>
  
  <p>Quick recap: We're building AI-powered diagnostic tools for automotive repair shops, and we're raising $500K seed.</p>
  
  <p>Would you be open to a quick 15-minute call? I can share our demo and early traction.</p>
  
  <p>Best,<br/>
  ${founderName}</p>
</div>
  `.trim();
}

// Generate demo invitation email
export function generateDemoInviteEmail(
  investor: Investor,
  demoLink: string,
  founderName: string
): string {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
  <p>Hi ${investor.name},</p>
  
  <p>Thanks for your interest in RideWire!</p>
  
  <p>I've recorded a 5-minute demo showing our AI diagnostic system in action:</p>
  
  <p style="text-align: center; margin: 30px 0;">
    <a href="${demoLink}" style="display: inline-block; padding: 12px 30px; background: #00d9ff; color: #000; text-decoration: none; border-radius: 6px; font-weight: 600;">
      Watch Demo Video
    </a>
  </p>
  
  <p>After you watch, I'd love to discuss how we can work together.</p>
  
  <p>Available for a call this week?</p>
  
  <p>Best,<br/>
  ${founderName}</p>
</div>
  `.trim();
}

// Merge template with variables
export function mergeTemplate(template: string, variables: Record<string, string>): string {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const tag = `{{${key}}}`;
    result = result.replace(new RegExp(tag, 'g'), value);
  });
  
  return result;
}

// Validate email content before sending
export function validateEmailContent(subject: string, body: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check subject line
  if (subject.length === 0) {
    errors.push("Subject line is empty");
  }
  if (subject.length > 100) {
    warnings.push("Subject line is very long (>100 chars)");
  }
  
  // Check body
  if (body.length < 50) {
    errors.push("Email body is too short");
  }
  if (body.length > 5000) {
    warnings.push("Email body is very long (>5000 chars)");
  }
  
  // Check for merge tags that weren't replaced
  const unreplacedTags = body.match(/\{\{[^}]+\}\}/g);
  if (unreplacedTags) {
    errors.push(`Unreplaced merge tags: ${unreplacedTags.join(', ')}`);
  }
  
  // Check for common mistakes
  if (body.includes('[') || body.includes(']')) {
    warnings.push("Email contains brackets - make sure placeholders are replaced");
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
