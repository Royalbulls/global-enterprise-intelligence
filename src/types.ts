export interface BusinessInput {
  businessName: string;
  businessType: string;
  businessModel?: string; // e.g. Physical Products, Digital/SaaS, Local Services/Trades, Professional Services, Health/Medical
  businessAge: string;
  monthlyRevenue: string;
  location: string;
  country?: string; // e.g. India, USA, UAE, UK, Canada, Australia, Singapore
  fundingRequirement: string;
  targetGoal?: string;
  additionalDetails?: string;
  knownCompetitors?: string;
  marketScope?: string; // e.g. Local, City-wide, Regional, National, Global
  firstMoverStatus?: string; // e.g. First-Mover, Moderate, Highly Saturated
  businessOfferings?: string; // Core Products/Services offered
}

export interface HealthScoreBreakdown {
  financialHealth: number;
  marketPosition: number;
  operationalStability: number;
  fundingReadiness: number;
  scoreCalculationExplanation?: string;
}

export interface GrowthOpportunity {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low' | string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
}

export interface FundingSuggestion {
  type: string;
  appropriateness: 'High' | 'Medium' | 'Low' | string;
  reasoning: string;
  estimatedAmount: string;
}

export interface GovernmentScheme {
  schemeName: string;
  description: string;
  eligibility: string;
  benefit: string;
}

export interface RiskItem {
  category: 'Strategic' | 'Financial' | 'Operational' | 'Regulatory' | string;
  riskFactor: string;
  severity: 'High' | 'Medium' | 'Low' | string;
  mitigationStrategy: string;
}

export interface TaskItem {
  task: string;
  objective: string;
  timeframe: string;
}

export interface ActionPlan90Days {
  month1: TaskItem[];
  month2: TaskItem[];
  month3: TaskItem[];
}

// === NEW ADVANCED MODULES FOR GLOBAL ENTERPRISE INTELLIGENCE ===

export interface ExpandCountry {
  country: string;
  marketDemand: string;
  competitionLevel: string; // High, Medium, Low
  entryBarriers: string;
  localizationTips: string;
}

export interface IndiaScheme {
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
}

export interface ExternalResourceLink {
  title: string;
  url: string;
  description: string;
}

export interface CompetitorItem {
  name: string;
  pricingStrategy: string;
  marketPositioning: string;
  customerAcquisitionMethod: string;
  digitalPresenceRating: string;
}

export interface CompetitorAnalysis {
  competitors: CompetitorItem[];
  competitiveAdvantageTactics: string[];
  marketSaturationScore?: number; // 0-100 indicating saturation level
  firstMoverFeasibilityNotes?: string; // Analysis of scope or first-mover advantage
  howPlayersArePerforming?: string; // Rich brief on how existing players operate
  industryBenchmarksLinks?: ExternalResourceLink[]; // Links to useful external websites for validation
}

export interface InvestorReadiness {
  score: number;
  scalabilityEvaluation: string;
  profitabilityEvaluation: string;
  teamStrengthEvaluation: string;
  marketSizeEvaluation: string;
  improvementsActionableChecklist: string[];
}

export interface FundingChannel {
  category: string; // Bank Loans, Venture Capital, Angel Investors, Government Grants, Crowdfunding, Revenue-Based Financing
  applicability: string;
  appropriatenessValue: string; // High, Medium, Low
  reasoning: string;
  estimatedMatchAmount: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ProjectionItem {
  timeline: string; // "3-Month Forecast", "6-Month Forecast", "12-Month Forecast"
  projectedMonthlyRevenue: string;
  variancePercentage: string;
  strategicGrowthDrivers: string[];
}

export interface RevenueSimulator {
  currentMonthlyBaseline: string;
  projections: ProjectionItem[];
}

export interface MarketTrendScanner {
  currentIndustryTrends: string[];
  emergingOpportunities: string[];
  disruptionRisks: string[];
}

export interface AutomationAdvisor {
  aiToolsRecommended: string[];
  crmSystems: string[];
  erpSystems: string[];
  marketingAutomation: string[];
  customerSupportAutomation: string[];
}

export interface ComplianceItem {
  regionOrScope: string;
  taxationGuidance: string;
  dataPrivacyGuidance: string;
  licensingGuidance: string;
}

export interface ExecutiveSummary {
  boardroomReadyStrategicReport: string;
  investorFriendlyPitchSummary: string;
}

export interface BoardroomBrief {
  ceoRecommendations: string[];
  investorRecommendations: string[];
  marketingRecommendations: string[];
  costReductionOpportunities: string[];
  hiringStrategy: string[];
  expansionStrategy: string[];
  technologyAdoptionPlan: string[];
  top3PrioritiesNext90Days: string[];
}

export interface IndiaMarketSpecifics {
  udyamRegistrationAdvisor: {
    eligibleCategory: string; // Micro, Small, Medium, Not Eligible
    documentsRequired: string[];
    processSteps: string[];
    benefitsCustom: string[];
  };
  gstReadinessChecker: {
    turnoverThresholdApplicable: string;
    mandatoryRegistrationRequired: boolean;
    readinessScore: number; // 0-100
    actionItems: string[];
    gstRatesApplicableEstimate: string;
  };
  loanEligibilityEstimator: {
    maxEligibleAmount: string;
    suggestedInterestRateRange: string;
    creditScoreRequiredEstimate: string;
    eligibleCollateralFreeUnderCGTMSE: boolean;
    recommendedBanksAndNBFCs: string[];
  };
  franchiseExpansionPlanner: {
    franchisabilityScore: number; // 0-100
    suggestedModel: string; // FOCO, FOFO, COCO
    initialSetupCostEstimate: string;
    franchiseFeeRange: string;
    keyExpansionCities: string[];
  };
  districtSubsidyFinder: {
    stateSubsidySchemeName: string;
    applicableDistricts: string[];
    subsidyPercentageOrAmount: string;
    applicationProcedure: string;
  };
  ruralBusinessOpportunityEngine: {
    ruralFitScore: number; // 0-100
    recommendedRuralMarketsText: string;
    viableSectors: string[];
    ruralLogisticsMitigations: string[];
  };
}

export interface GlobalSaaSFeatures {
  esgSustainabilityScore: {
    overallScore: number; // 0-100
    environmentalRating: string;
    socialResponsibilityRating: string;
    governanceStandardsRating: string;
    sustainabilityInitiatives: string[];
  };
  aiBusinessValuationEstimate: {
    estimatedValuationRange: string;
    multiplierType: string;
    multiplierAppliedValue: string;
    valuationDrivers: string[];
    optimizationStrategies: string[];
  };
  countryExpansionMatrix: {
    country: string;
    entrySpeedRating: string;
    complianceConfidenceScore: number;
    marketFeasibilityScore: number;
    strategicPriorityScore: number;
  }[];
}

export interface OpportunityScores {
  growthScore: number;
  fundingReadinessScore: number;
  digitalMaturityScore: number;
  globalExpansionScore: number;
  operationalEfficiencyScore: number;
  overallPotentialScore: number;
}

export interface AdviceReport {
  id: string; // Unique ID for saved session tracking
  timestamp: string; // Analysis timestamp
  input: BusinessInput; // Pre-saved user inputs
  businessHealthScore: number;
  healthScoreBreakdown: HealthScoreBreakdown;
  growthOpportunities: GrowthOpportunity[];
  fundingSuggestions: FundingSuggestion[];
  governmentSchemes: GovernmentScheme[];
  riskAssessment: RiskItem[];
  actionPlan90Days: ActionPlan90Days;

  // New modules mapping 1 to 1:
  globalMarketExpansion?: ExpandCountry[]; // Module 1
  indiaGovSchemes?: IndiaScheme[]; // Module 2
  competitorAnalysis?: CompetitorAnalysis; // Module 3
  investorReadiness?: InvestorReadiness; // Module 4
  globalFundingIntelligence?: FundingChannel[]; // Module 5
  swotAnalysis?: SwotAnalysis; // Module 6
  revenueSimulator?: RevenueSimulator; // Module 7
  marketTrendScanner?: MarketTrendScanner; // Module 8
  automationAdvisor?: AutomationAdvisor; // Module 9
  globalCompliance?: ComplianceItem[]; // Module 10
  executiveSummary?: ExecutiveSummary; // Module 11
  opportunityScores?: OpportunityScores; // Module 12
  boardroomBrief?: BoardroomBrief;
  indiaMarketSpecifics?: IndiaMarketSpecifics;
  globalSaaSFeatures?: GlobalSaaSFeatures;
  scoreTransparencyExplanation?: string;
}
