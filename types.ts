// Core AppState enum for navigation
export enum AppState {
  COMMAND_CENTER = "COMMAND_CENTER",
  SHOP_VIEW = "SHOP_VIEW",
  INVESTOR_SEARCH = "INVESTOR_SEARCH",
  EMAIL_COMPOSER = "EMAIL_COMPOSER",
  MONEY_DASHBOARD = "MONEY_DASHBOARD",
  METRICS_DASHBOARD = "METRICS_DASHBOARD",
  LEGAL_WAIVER = "LEGAL_WAIVER"
}

// Investor types
export interface Investor {
  id: string;
  name: string;
  firm: string;
  email: string;
  stage: InvestorStage[];
  sectors: string[];
  geography: string[];
  checkSizeMin: number;
  checkSizeMax: number;
  recentInvestments: string[];
  thesis: string;
  linkedIn?: string;
  website?: string;
  fitScore?: number; // 0-100 AI-powered fit score
  status?: InvestorStatus;
  notes?: string;
}

export enum InvestorStage {
  PRE_SEED = "Pre-seed",
  SEED = "Seed",
  SERIES_A = "Series A",
  SERIES_B = "Series B+"
}

export enum InvestorStatus {
  NOT_CONTACTED = "Not Contacted",
  CONTACTED = "Contacted",
  RESPONDED = "Responded",
  MEETING_SCHEDULED = "Meeting Scheduled",
  SECOND_MEETING = "Second Meeting",
  DUE_DILIGENCE = "Due Diligence",
  TERM_SHEET = "Term Sheet Received",
  NEGOTIATING = "Negotiating",
  CLOSED = "CLOSED",
  PASSED = "Passed"
}

// Email types
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  mergeTags: string[];
}

export interface EmailOutreach {
  id: string;
  investorId: string;
  subject: string;
  body: string;
  sentAt?: Date;
  openedAt?: Date;
  repliedAt?: Date;
  meetingBookedAt?: Date;
  status: EmailStatus;
}

export enum EmailStatus {
  DRAFT = "Draft",
  QUEUED = "Queued",
  SENT = "Sent",
  OPENED = "Opened",
  REPLIED = "Replied",
  BOUNCED = "Bounced",
  FAILED = "Failed"
}

// Money Manager types
export interface FinancialData {
  cashOnHand: number;
  monthlyBurnRate: number;
  runway: number; // in months
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Run Rate
  customerCount: number;
  arpu: number; // Average Revenue Per User
  growthRate: number; // month-over-month %
}

export interface InvestorPipelineCard {
  investorId: string;
  stage: InvestorStatus;
  probability: number; // 0-100
  expectedCloseDate: Date;
  notes: string;
}

export interface ExitScenario {
  name: string;
  description: string;
  inputs: Record<string, number>;
  outputs: Record<string, number>;
  timeline: string;
}

// Legal & Safety types
export interface LegalWaiverData {
  accepted: boolean;
  timestamp: Date;
  fullName: string;
  ipAddress: string;
  version: string;
}

// Metrics types
export interface EmailMetrics {
  totalSent: number;
  totalOpened: number;
  totalReplied: number;
  totalMeetings: number;
  totalTermSheets: number;
  totalClosed: number;
  openRate: number;
  replyRate: number;
  meetingRate: number;
  termSheetRate: number;
  closeRate: number;
}

export interface DailyMetrics {
  date: string;
  emailsSent: number;
  opens: number;
  replies: number;
  meetings: number;
}
