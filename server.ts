import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Guard helper
app.use(express.json());

// API: Analyze Business
app.post("/api/analyze", async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      businessModel,
      businessAge,
      monthlyRevenue,
      location,
      country,
      fundingRequirement,
      targetGoal,
      additionalDetails
    } = req.body;

    if (!businessName || !businessType || !location) {
      return res.status(400).json({ error: "Required fields are missing: Business Name, Industry, and Location." });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY environment variable is not configured in this applet's secrets. Please add it to Settings > Secrets."
      });
    }

    const prompt = `
Analyze the following enterprise/service and generate an integrated Global Boardroom-Ready Strategic Intelligence Report.

Business Details:
- Name: ${businessName}
- Type/Industry: ${businessType}
- Model/Sector Category: ${businessModel || "Not specified (General Business & Services)"}
- Age: ${businessAge}
- Current Monthly Revenue: ${monthlyRevenue}
- Country Context: ${country || "India"}
- Specific Location/State: ${location}
- Funding Required: ${fundingRequirement}
${targetGoal ? `- Primary Growth Goal: ${targetGoal}` : ""}
${additionalDetails ? `- Context/Challenges: ${additionalDetails}` : ""}

Please use your advanced reasoning to provide tailored advice based on their Sector Category and target location.
Special Sector Rules:
1. If is a service sector business (e.g. Local Services/Trades, Professional Consulting, Wellness Clinic, Agency, coaching etc):
   - Growth opportunities must focus heavily on "productizing" services (creating packages/subscriptions), optimizing billable hours, customer acquisition cost (CAC), local SEO/referrals, and scaling staff skill development.
   - Recommended schemes and risks must relate to professional indemnity, local licenses, service dispatch logistics, or certifications.
2. If is a product business (e.g. physical retail, SaaS, apps, e-commerce, manufacturing):
   - Growth opportunities must focus on inventory cost control, supply chain optimization, recurring run rates (MRR), manufacturing/server constraints, and broad international scale.

Provide high-fidelity outputs for the following 15 mandatory intelligence dimensions, fully formulated and specific to their context:
1. Global Market Expansion: Top 5 foreign countries for expansion with realistic data on demand, entry barriers, and localizations.
2. India Government Schemes: Custom-matched schemes from MSME, Startup India, Mudra, CGTMSE, PMEGP, Stand-Up India, Digital India, etc. provide eligibility and benefits (relevant regardless of starting region, for international growth/imports/exports/regional setups).
3. AI Competitor Analysis: Likely competitor archetypes, their strategies, and clear strategic USPs/advantage tactics.
4. Investor Readiness Assessment: Score and evaluation of scalability, margin profitability, team, and addressable market, plus pre-approach checklist.
5. Global Funding Intelligence: Separate diagnostic evaluations for ALL standard channels (Bank Loans, Venture Capital, Angel Investors, Government Grants, Crowdfunding, Revenue-Based Financing).
6. Business SWOT: Crisp Strengths, Weaknesses, Opportunities, and Threats arrays.
7. AI Revenue Growth Simulator: Calculated predictions for 3, 6, and 12-month marks based on the specified baseline, including specific strategic growth drivers.
8. Market Trend Scanner: Top current trends, emerging opportunities, and disruption risks.
9. Business Automation Advisor: Tailored software systems (AI Tools, CRM, ERP, Marketing Automation, Support Automation) appropriate to business scale and model limit factors.
10. Global Compliance Assistant: Accurate regulatory compliance, taxation, privacy (e.g. GDPR, CCPA, India DPDP), and licensing guides.
11. Executive Summary: High-level narrative summaries suited for boardroom review and investor pitches.
12. Opportunity Score Engine: Detailed numerical score indexes mapped from 0-100 indicating core performance and an overall Potential Score.
13. CEO & Boardroom Advisor Perspectives (boardroomBrief): Actionable, data-driven, direct recommendations across 8 areas: CEO Recommendations, Investor Recommendations, Marketing Recommendations, Cost Reduction Opportunities, Hiring Strategy, Expansion Strategy, Technology Adoption Plan, and Top 3 Priorities for the Ultimate/Next 90 Days.
14. India Market Specifics (indiaMarketSpecifics): Practical advisor systems: Udyam Registration Advisor, GST Readiness Checker (with thresholds and rates), Loan Eligibility Estimator (cgtmse compatible), Franchise Expansion Planner (FOFO/FOCO suggestions), District-wise Government Subsidy Finder, and Rural Business Opportunity Engine.
15. Global SaaS-Level Features (globalSaaSFeatures): Custom ESG Sustainability Scores, automated, AI-driven Business Valuation Estimate based on standard sector ARR/revenue multiple ranges, and a dynamic multi-country expansion speed and risk matrix.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, world-class executive-level Business Enterprise Intelligence Advisor, VC partner, and international scaling champion. Your task is to analyze details and calculate rigorous, high-fidelity business indexes. Avoid generic padding; write detailed, practical and realistic recommendations tailored precisely to the entity's industry, model, location, and revenue scale.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessHealthScore: {
              type: Type.INTEGER,
              description: "An overall health score for this business from 0 to 100 based on standard industry metrics, revenue-to-funding ratio, and operational age risk."
            },
            healthScoreBreakdown: {
              type: Type.OBJECT,
              properties: {
                financialHealth: { type: Type.INTEGER, description: "Financial metrics score from 0 to 100" },
                marketPosition: { type: Type.INTEGER, description: "Market potential and competitive position from 0 to 100" },
                operationalStability: { type: Type.INTEGER, description: "Operational maturity from 0 to 100" },
                fundingReadiness: { type: Type.INTEGER, description: "Readiness to absorb funding from 0 to 100" }
              },
              required: ["financialHealth", "marketPosition", "operationalStability", "fundingReadiness"]
            },
            growthOpportunities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Short title of the opportunity" },
                  description: { type: Type.STRING, description: "Detailed strategy and implementation details, unique to this business and location." },
                  impact: { type: Type.STRING, description: "High, Medium, or Low" },
                  difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" }
                },
                required: ["title", "description", "impact", "difficulty"]
              }
            },
            fundingSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: "E.g. Bootstrapping, Seed Investment, Venture Capital, Small Business Loan, Equipment Financing, Invoice Factoring, Grants" },
                  appropriateness: { type: Type.STRING, description: "High, Medium, or Low" },
                  reasoning: { type: Type.STRING, description: "Explain why this matches their current revenue and age." },
                  estimatedAmount: { type: Type.STRING, description: "Estimated matching range based on details" }
                },
                required: ["type", "appropriateness", "reasoning", "estimatedAmount"]
              }
            },
            governmentSchemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  schemeName: { type: Type.STRING, description: "Name of scheme/grant (be as realistic and geographically accurate as possible)" },
                  description: { type: Type.STRING, description: "What the scheme is and who runs it" },
                  eligibility: { type: Type.STRING, description: "Eligibility criteria detailed description" },
                  benefit: { type: Type.STRING, description: "Financial or non-financial benefits provided" }
                },
                required: ["schemeName", "description", "eligibility", "benefit"]
              }
            },
            riskAssessment: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "Strategic, Financial, Operational, or Regulatory" },
                  riskFactor: { type: Type.STRING, description: "A high-probability or high-severity risk this business faces" },
                  severity: { type: Type.STRING, description: "High, Medium, or Low" },
                  mitigationStrategy: { type: Type.STRING, description: "Actionable concrete step to prevent or handle this risk" }
                },
                required: ["category", "riskFactor", "severity", "mitigationStrategy"]
              }
            },
            actionPlan90Days: {
              type: Type.OBJECT,
              properties: {
                month1: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      task: { type: Type.STRING, description: "Focus action item" },
                      objective: { type: Type.STRING, description: "What this achieves" },
                      timeframe: { type: Type.STRING, description: "Week 1-2, Week 3-4, etc." }
                    },
                    required: ["task", "objective", "timeframe"]
                  }
                },
                month2: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      task: { type: Type.STRING, description: "Focus action item" },
                      objective: { type: Type.STRING, description: "What this achieves" },
                      timeframe: { type: Type.STRING, description: "Week 5-6, Week 7-8, etc." }
                    },
                    required: ["task", "objective", "timeframe"]
                  }
                },
                month3: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      task: { type: Type.STRING, description: "Focus action item" },
                      objective: { type: Type.STRING, description: "What this achieves" },
                      timeframe: { type: Type.STRING, description: "Week 9-10, Week 11-12, etc." }
                    },
                    required: ["task", "objective", "timeframe"]
                  }
                }
              },
              required: ["month1", "month2", "month3"]
            },
            globalMarketExpansion: {
              type: Type.ARRAY,
              description: "Top 5 countries for strategic expansion",
              items: {
                type: Type.OBJECT,
                properties: {
                  country: { type: Type.STRING },
                  marketDemand: { type: Type.STRING, description: "Demand description for this business model" },
                  competitionLevel: { type: Type.STRING, description: "High, Medium, or Low" },
                  entryBarriers: { type: Type.STRING },
                  localizationTips: { type: Type.STRING }
                },
                required: ["country", "marketDemand", "competitionLevel", "entryBarriers", "localizationTips"]
              }
            },
            indiaGovSchemes: {
              type: Type.ARRAY,
              description: "Matched schemes representing Mudra, CGTMSE, MSME registers, Startup India, etc.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  eligibility: { type: Type.STRING },
                  benefits: { type: Type.STRING }
                },
                required: ["name", "description", "eligibility", "benefits"]
              }
            },
            competitorAnalysis: {
              type: Type.OBJECT,
              properties: {
                competitors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      pricingStrategy: { type: Type.STRING },
                      marketPositioning: { type: Type.STRING },
                      customerAcquisitionMethod: { type: Type.STRING },
                      digitalPresenceRating: { type: Type.STRING }
                    },
                    required: ["name", "pricingStrategy", "marketPositioning", "customerAcquisitionMethod", "digitalPresenceRating"]
                  }
                },
                competitiveAdvantageTactics: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["competitors", "competitiveAdvantageTactics"]
            },
            investorReadiness: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.INTEGER },
                scalabilityEvaluation: { type: Type.STRING },
                profitabilityEvaluation: { type: Type.STRING },
                teamStrengthEvaluation: { type: Type.STRING },
                marketSizeEvaluation: { type: Type.STRING },
                improvementsActionableChecklist: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["score", "scalabilityEvaluation", "profitabilityEvaluation", "teamStrengthEvaluation", "marketSizeEvaluation", "improvementsActionableChecklist"]
            },
            globalFundingIntelligence: {
              type: Type.ARRAY,
              description: "Separate matched options for ALL categories: Bank Loans, Venture Capital, Angel Investors, Government Grants, Crowdfunding, Revenue-Based Financing",
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  applicability: { type: Type.STRING },
                  appropriatenessValue: { type: Type.STRING, description: "High, Medium, or Low" },
                  reasoning: { type: Type.STRING },
                  estimatedMatchAmount: { type: Type.STRING }
                },
                required: ["category", "applicability", "appropriatenessValue", "reasoning", "estimatedMatchAmount"]
              }
            },
            swotAnalysis: {
              type: Type.OBJECT,
              properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                threats: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["strengths", "weaknesses", "opportunities", "threats"]
            },
            revenueSimulator: {
              type: Type.OBJECT,
              properties: {
                currentMonthlyBaseline: { type: Type.STRING },
                projections: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      timeline: { type: Type.STRING }, // "3-Month Forecast", "6-Month Forecast", "12-Month Forecast"
                      projectedMonthlyRevenue: { type: Type.STRING },
                      variancePercentage: { type: Type.STRING },
                      strategicGrowthDrivers: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["timeline", "projectedMonthlyRevenue", "variancePercentage", "strategicGrowthDrivers"]
                  }
                }
              },
              required: ["currentMonthlyBaseline", "projections"]
            },
            marketTrendScanner: {
              type: Type.OBJECT,
              properties: {
                currentIndustryTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
                emergingOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                disruptionRisks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["currentIndustryTrends", "emergingOpportunities", "disruptionRisks"]
            },
            automationAdvisor: {
              type: Type.OBJECT,
              properties: {
                aiToolsRecommended: { type: Type.ARRAY, items: { type: Type.STRING } },
                crmSystems: { type: Type.ARRAY, items: { type: Type.STRING } },
                erpSystems: { type: Type.ARRAY, items: { type: Type.STRING } },
                marketingAutomation: { type: Type.ARRAY, items: { type: Type.STRING } },
                customerSupportAutomation: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["aiToolsRecommended", "crmSystems", "erpSystems", "marketingAutomation", "customerSupportAutomation"]
            },
            globalCompliance: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  regionOrScope: { type: Type.STRING },
                  taxationGuidance: { type: Type.STRING },
                  dataPrivacyGuidance: { type: Type.STRING },
                  licensingGuidance: { type: Type.STRING }
                },
                required: ["regionOrScope", "taxationGuidance", "dataPrivacyGuidance", "licensingGuidance"]
              }
            },
            executiveSummary: {
              type: Type.OBJECT,
              properties: {
                boardroomReadyStrategicReport: { type: Type.STRING },
                investorFriendlyPitchSummary: { type: Type.STRING }
              },
              required: ["boardroomReadyStrategicReport", "investorFriendlyPitchSummary"]
            },
            opportunityScores: {
              type: Type.OBJECT,
              properties: {
                growthScore: { type: Type.INTEGER },
                fundingReadinessScore: { type: Type.INTEGER },
                digitalMaturityScore: { type: Type.INTEGER },
                globalExpansionScore: { type: Type.INTEGER },
                operationalEfficiencyScore: { type: Type.INTEGER },
                overallPotentialScore: { type: Type.INTEGER }
              },
              required: ["growthScore", "fundingReadinessScore", "digitalMaturityScore", "globalExpansionScore", "operationalEfficiencyScore", "overallPotentialScore"]
            },
            boardroomBrief: {
              type: Type.OBJECT,
              properties: {
                ceoRecommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific strategic data-driven advisory lists from a world-class CEO perspective" },
                investorRecommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "High-value guidance pointers from an active VC and growth investor lens" },
                marketingRecommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Pragmatic modern marketing tactics, SEO, content growth, or local referrals" },
                costReductionOpportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable ways to secure margins or lower unit operating costs immediately" },
                hiringStrategy: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Strategic skill onboarding and scale workforce design recommendations" },
                expansionStrategy: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Target scale geographic or capability-driven expansion checklist vectors" },
                technologyAdoptionPlan: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific modern SaaS, AI tool, ERP or API layer recommendations to speed up flows" },
                top3PrioritiesNext90Days: { type: Type.ARRAY, items: { type: Type.STRING }, description: "The top 3 high-impact prioritized focus items to unlock multi-fold growth next 90 days" }
              },
              required: [
                "ceoRecommendations",
                "investorRecommendations",
                "marketingRecommendations",
                "costReductionOpportunities",
                "hiringStrategy",
                "expansionStrategy",
                "technologyAdoptionPlan",
                "top3PrioritiesNext90Days"
              ]
            },
            indiaMarketSpecifics: {
              type: Type.OBJECT,
              properties: {
                udyamRegistrationAdvisor: {
                  type: Type.OBJECT,
                  properties: {
                    eligibleCategory: { type: Type.STRING },
                    documentsRequired: { type: Type.ARRAY, items: { type: Type.STRING } },
                    processSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
                    benefitsCustom: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["eligibleCategory", "documentsRequired", "processSteps", "benefitsCustom"]
                },
                gstReadinessChecker: {
                  type: Type.OBJECT,
                  properties: {
                    turnoverThresholdApplicable: { type: Type.STRING },
                    mandatoryRegistrationRequired: { type: Type.BOOLEAN },
                    readinessScore: { type: Type.INTEGER },
                    actionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
                    gstRatesApplicableEstimate: { type: Type.STRING }
                  },
                  required: ["turnoverThresholdApplicable", "mandatoryRegistrationRequired", "readinessScore", "actionItems", "gstRatesApplicableEstimate"]
                },
                loanEligibilityEstimator: {
                  type: Type.OBJECT,
                  properties: {
                    maxEligibleAmount: { type: Type.STRING },
                    suggestedInterestRateRange: { type: Type.STRING },
                    creditScoreRequiredEstimate: { type: Type.STRING },
                    eligibleCollateralFreeUnderCGTMSE: { type: Type.BOOLEAN },
                    recommendedBanksAndNBFCs: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["maxEligibleAmount", "suggestedInterestRateRange", "creditScoreRequiredEstimate", "eligibleCollateralFreeUnderCGTMSE", "recommendedBanksAndNBFCs"]
                },
                franchiseExpansionPlanner: {
                  type: Type.OBJECT,
                  properties: {
                    franchisabilityScore: { type: Type.INTEGER },
                    suggestedModel: { type: Type.STRING },
                    initialSetupCostEstimate: { type: Type.STRING },
                    franchiseFeeRange: { type: Type.STRING },
                    keyExpansionCities: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["franchisabilityScore", "suggestedModel", "initialSetupCostEstimate", "franchiseFeeRange", "keyExpansionCities"]
                },
                districtSubsidyFinder: {
                  type: Type.OBJECT,
                  properties: {
                    stateSubsidySchemeName: { type: Type.STRING },
                    applicableDistricts: { type: Type.ARRAY, items: { type: Type.STRING } },
                    subsidyPercentageOrAmount: { type: Type.STRING },
                    applicationProcedure: { type: Type.STRING }
                  },
                  required: ["stateSubsidySchemeName", "applicableDistricts", "subsidyPercentageOrAmount", "applicationProcedure"]
                },
                ruralBusinessOpportunityEngine: {
                  type: Type.OBJECT,
                  properties: {
                    ruralFitScore: { type: Type.INTEGER },
                    recommendedRuralMarketsText: { type: Type.STRING },
                    viableSectors: { type: Type.ARRAY, items: { type: Type.STRING } },
                    ruralLogisticsMitigations: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["ruralFitScore", "recommendedRuralMarketsText", "viableSectors", "ruralLogisticsMitigations"]
                }
              },
              required: [
                "udyamRegistrationAdvisor",
                "gstReadinessChecker",
                "loanEligibilityEstimator",
                "franchiseExpansionPlanner",
                "districtSubsidyFinder",
                "ruralBusinessOpportunityEngine"
              ]
            },
            globalSaaSFeatures: {
              type: Type.OBJECT,
              properties: {
                esgSustainabilityScore: {
                  type: Type.OBJECT,
                  properties: {
                    overallScore: { type: Type.INTEGER },
                    environmentalRating: { type: Type.STRING },
                    socialResponsibilityRating: { type: Type.STRING },
                    governanceStandardsRating: { type: Type.STRING },
                    sustainabilityInitiatives: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["overallScore", "environmentalRating", "socialResponsibilityRating", "governanceStandardsRating", "sustainabilityInitiatives"]
                },
                aiBusinessValuationEstimate: {
                  type: Type.OBJECT,
                  properties: {
                    estimatedValuationRange: { type: Type.STRING },
                    multiplierType: { type: Type.STRING },
                    multiplierAppliedValue: { type: Type.STRING },
                    valuationDrivers: { type: Type.ARRAY, items: { type: Type.STRING } },
                    optimizationStrategies: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["estimatedValuationRange", "multiplierType", "multiplierAppliedValue", "valuationDrivers", "optimizationStrategies"]
                },
                countryExpansionMatrix: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      country: { type: Type.STRING },
                      entrySpeedRating: { type: Type.STRING },
                      complianceConfidenceScore: { type: Type.INTEGER },
                      marketFeasibilityScore: { type: Type.INTEGER },
                      strategicPriorityScore: { type: Type.INTEGER }
                    },
                    required: ["country", "entrySpeedRating", "complianceConfidenceScore", "marketFeasibilityScore", "strategicPriorityScore"]
                  }
                }
              },
              required: ["esgSustainabilityScore", "aiBusinessValuationEstimate", "countryExpansionMatrix"]
            }
          },
          required: [
            "businessHealthScore",
            "healthScoreBreakdown",
            "growthOpportunities",
            "fundingSuggestions",
            "governmentSchemes",
            "riskAssessment",
            "actionPlan90Days",
            "globalMarketExpansion",
            "indiaGovSchemes",
            "competitorAnalysis",
            "investorReadiness",
            "globalFundingIntelligence",
            "swotAnalysis",
            "revenueSimulator",
            "marketTrendScanner",
            "automationAdvisor",
            "globalCompliance",
            "executiveSummary",
            "opportunityScores",
            "boardroomBrief",
            "indiaMarketSpecifics",
            "globalSaaSFeatures"
          ]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response received from Gemini.");
    }

    const reportData = JSON.parse(resultText);
    res.json(reportData);

  } catch (error: any) {
    console.error("Error analyzing business:", error);
    res.status(500).json({
      error: "An error occurred while generating the advice.",
      details: error.message || error
    });
  }
});

// Setup Vite Dev server or Production file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
