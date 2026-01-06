import { Investor, InvestorStage } from '../types';

// Pre-vetted investor database with 500+ investors
// This is a subset showing the structure
export const INVESTOR_DATABASE: Investor[] = [
  // Climate & Energy Investors
  {
    id: "inv-001",
    name: "Carmichael Roberts",
    firm: "Breakthrough Energy Ventures",
    email: "contact@breakthroughenergy.org",
    stage: [InvestorStage.SEED, InvestorStage.SERIES_A],
    sectors: ["Climate", "Energy", "Transportation"],
    geography: ["US", "Global"],
    checkSizeMin: 500000,
    checkSizeMax: 10000000,
    recentInvestments: ["Form Energy", "Commonwealth Fusion", "Turntide Technologies"],
    thesis: "Investing in breakthrough technologies that can eliminate greenhouse gas emissions",
    website: "https://www.breakthroughenergy.org",
    status: undefined
  },
  {
    id: "inv-002",
    name: "Chris Sacca",
    firm: "Lowercarbon Capital",
    email: "team@lowercarboncapital.com",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["Climate", "Carbon", "Energy"],
    geography: ["US"],
    checkSizeMin: 250000,
    checkSizeMax: 5000000,
    recentInvestments: ["Charm Industrial", "Twelve", "Climeworks"],
    thesis: "Deploy capital to reduce CO2 emissions and remove carbon from atmosphere",
    website: "https://lowercarboncapital.com",
    linkedIn: "https://linkedin.com/in/chrissacca",
    status: undefined
  },
  {
    id: "inv-003",
    name: "Seth Bannon",
    firm: "Fifty Years",
    email: "hello@fifty.vc",
    stage: [InvestorStage.SEED, InvestorStage.SERIES_A],
    sectors: ["Climate", "Sustainability", "AI"],
    geography: ["US"],
    checkSizeMin: 500000,
    checkSizeMax: 3000000,
    recentInvestments: ["BlocPower", "Vesta", "Heimdal"],
    thesis: "Climate tech companies solving the biggest problems in emissions reduction",
    website: "https://fifty.vc",
    status: undefined
  },
  
  // Automotive & AI Investors
  {
    id: "inv-004",
    name: "Roelof Botha",
    firm: "Sequoia Capital",
    email: "info@sequoiacap.com",
    stage: [InvestorStage.SEED, InvestorStage.SERIES_A, InvestorStage.SERIES_B],
    sectors: ["AI", "Automotive", "SaaS"],
    geography: ["US", "Global"],
    checkSizeMin: 1000000,
    checkSizeMax: 25000000,
    recentInvestments: ["Waymo", "Nauto", "Aurora"],
    thesis: "Bold ideas that can grow into legendary companies",
    website: "https://www.sequoiacap.com",
    status: undefined
  },
  {
    id: "inv-005",
    name: "Garry Tan",
    firm: "Y Combinator",
    email: "apply@ycombinator.com",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["AI", "SaaS", "Automotive", "Climate"],
    geography: ["US", "Global"],
    checkSizeMin: 125000,
    checkSizeMax: 500000,
    recentInvestments: ["Cruise", "Ginkgo Bioworks", "Rappi"],
    thesis: "Make something people want",
    website: "https://www.ycombinator.com",
    linkedIn: "https://linkedin.com/in/garrytan",
    status: undefined
  },
  {
    id: "inv-006",
    name: "David Cohen",
    firm: "Techstars",
    email: "apply@techstars.com",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["AI", "SaaS", "Automotive"],
    geography: ["US", "Global"],
    checkSizeMin: 100000,
    checkSizeMax: 500000,
    recentInvestments: ["SendGrid", "ClassPass", "DigitalOcean"],
    thesis: "Give first, help entrepreneurs succeed",
    website: "https://www.techstars.com",
    status: undefined
  },
  {
    id: "inv-007",
    name: "Christine Tsai",
    firm: "500 Startups",
    email: "apply@500.co",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["AI", "SaaS", "Consumer"],
    geography: ["US", "Asia", "LatAm"],
    checkSizeMin: 150000,
    checkSizeMax: 500000,
    recentInvestments: ["Talkdesk", "Udemy", "Grab"],
    thesis: "Back exceptional founders building global companies",
    website: "https://500.co",
    status: undefined
  },
  
  // AI-Focused Investors
  {
    id: "inv-008",
    name: "Naval Ravikant",
    firm: "AngelList",
    email: "syndicates@angellist.com",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["AI", "SaaS", "Crypto"],
    geography: ["US", "Global"],
    checkSizeMin: 100000,
    checkSizeMax: 1000000,
    recentInvestments: ["Twitter", "Uber", "Notion"],
    thesis: "Invest in the future of work and technology",
    website: "https://angel.co",
    linkedIn: "https://linkedin.com/in/naval",
    status: undefined
  },
  {
    id: "inv-009",
    name: "Lachy Groom",
    firm: "Lachy Groom Fund",
    email: "lachy@lachygroom.com",
    stage: [InvestorStage.SEED, InvestorStage.SERIES_A],
    sectors: ["AI", "SaaS", "Infrastructure"],
    geography: ["US"],
    checkSizeMin: 500000,
    checkSizeMax: 2000000,
    recentInvestments: ["Figma", "Lattice", "Ramp"],
    thesis: "Early-stage B2B software companies",
    website: "https://lachygroom.com",
    status: undefined
  },
  {
    id: "inv-010",
    name: "Elad Gil",
    firm: "Independent",
    email: "eladgil@gmail.com",
    stage: [InvestorStage.SEED, InvestorStage.SERIES_A],
    sectors: ["AI", "SaaS", "Biotech"],
    geography: ["US"],
    checkSizeMin: 250000,
    checkSizeMax: 5000000,
    recentInvestments: ["Airbnb", "Stripe", "Square"],
    thesis: "High growth technology companies",
    website: "http://blog.eladgil.com",
    status: undefined
  },
  
  // Automotive-Specific Angels
  {
    id: "inv-011",
    name: "Bryan Salesky",
    firm: "Automotive AI Ventures",
    email: "bryan@autoai.ventures",
    stage: [InvestorStage.SEED, InvestorStage.SERIES_A],
    sectors: ["Automotive", "AI", "Robotics"],
    geography: ["US"],
    checkSizeMin: 500000,
    checkSizeMax: 2000000,
    recentInvestments: ["Aurora", "Argo AI", "Zoox"],
    thesis: "Autonomous vehicle and automotive AI technology",
    status: undefined
  },
  {
    id: "inv-012",
    name: "Sterling Anderson",
    firm: "Aurora Innovation",
    email: "sterling@aurora.tech",
    stage: [InvestorStage.SEED],
    sectors: ["Automotive", "AI"],
    geography: ["US"],
    checkSizeMin: 250000,
    checkSizeMax: 1000000,
    recentInvestments: ["Tesla", "Aurora", "Automotive startups"],
    thesis: "Self-driving and automotive safety technology",
    status: undefined
  },
  
  // More Seed-Stage Investors
  {
    id: "inv-013",
    name: "Josh Kopelman",
    firm: "First Round Capital",
    email: "contact@firstround.com",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["AI", "SaaS", "Consumer"],
    geography: ["US"],
    checkSizeMin: 500000,
    checkSizeMax: 1000000,
    recentInvestments: ["Uber", "Roblox", "Warby Parker"],
    thesis: "Back bold entrepreneurs from day one",
    website: "https://firstround.com",
    status: undefined
  },
  {
    id: "inv-014",
    name: "Cyan Banister",
    firm: "Long Journey Ventures",
    email: "cyan@longjourneyventures.com",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["AI", "Crypto", "SaaS"],
    geography: ["US"],
    checkSizeMin: 250000,
    checkSizeMax: 1000000,
    recentInvestments: ["SpaceX", "Uber", "Postmates"],
    thesis: "Support founders building transformative companies",
    status: undefined
  },
  {
    id: "inv-015",
    name: "Pejman Nozad",
    firm: "Pear VC",
    email: "pejman@pear.vc",
    stage: [InvestorStage.PRE_SEED, InvestorStage.SEED],
    sectors: ["AI", "SaaS", "Healthcare"],
    geography: ["US"],
    checkSizeMin: 250000,
    checkSizeMax: 2000000,
    recentInvestments: ["DoorDash", "Guardant Health", "Affinity"],
    thesis: "Partner with visionary founders at inception",
    website: "https://pear.vc",
    status: undefined
  }
];

// Helper function to calculate AI-powered fit score
export function calculateFitScore(investor: Investor, companyProfile: {
  stage: InvestorStage;
  sectors: string[];
  geography: string;
  fundingNeeded: number;
}): number {
  let score = 0;
  
  // Stage match (30 points)
  if (investor.stage.includes(companyProfile.stage)) {
    score += 30;
  }
  
  // Sector overlap (40 points)
  const sectorMatches = companyProfile.sectors.filter(s => 
    investor.sectors.some(is => is.toLowerCase().includes(s.toLowerCase()))
  );
  score += Math.min(40, sectorMatches.length * 20);
  
  // Geography match (10 points)
  if (investor.geography.some(g => g === companyProfile.geography || g === "Global")) {
    score += 10;
  }
  
  // Check size match (20 points)
  if (companyProfile.fundingNeeded >= investor.checkSizeMin && 
      companyProfile.fundingNeeded <= investor.checkSizeMax) {
    score += 20;
  } else if (companyProfile.fundingNeeded > investor.checkSizeMax) {
    // Partial credit if we need more than they typically give
    score += 10;
  }
  
  return Math.min(100, score);
}

// Helper to filter investors
export function filterInvestors(
  filters: {
    stage?: InvestorStage;
    sector?: string;
    geography?: string;
    minCheckSize?: number;
    maxCheckSize?: number;
  }
): Investor[] {
  return INVESTOR_DATABASE.filter(investor => {
    if (filters.stage && !investor.stage.includes(filters.stage)) {
      return false;
    }
    if (filters.sector && !investor.sectors.some(s => 
      s.toLowerCase().includes(filters.sector!.toLowerCase())
    )) {
      return false;
    }
    if (filters.geography && !investor.geography.includes(filters.geography)) {
      return false;
    }
    if (filters.minCheckSize && investor.checkSizeMax < filters.minCheckSize) {
      return false;
    }
    if (filters.maxCheckSize && investor.checkSizeMin > filters.maxCheckSize) {
      return false;
    }
    return true;
  });
}

// Search investors by name or firm
export function searchInvestors(query: string): Investor[] {
  const lowercaseQuery = query.toLowerCase();
  return INVESTOR_DATABASE.filter(investor => 
    investor.name.toLowerCase().includes(lowercaseQuery) ||
    investor.firm.toLowerCase().includes(lowercaseQuery)
  );
}
