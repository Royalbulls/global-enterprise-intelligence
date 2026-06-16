import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  TrendingUp,
  Coins,
  ShieldAlert,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  Award,
  ArrowRight,
  Plus,
  History,
  Sparkles,
  CheckCircle2,
  Trash2,
  Cpu,
  Layers,
  AlertTriangle,
  FileText,
  Clock,
  Printer,
  ChevronRight,
  Target,
  Globe,
  Activity,
  CheckSquare,
  Square,
  Scale,
  ShieldCheck,
  FileJson,
  Zap,
  BarChart3,
  Languages,
  Map,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Users,
  ExternalLink
} from "lucide-react";
import { BusinessInput, AdviceReport, TaskItem } from "./types";

const INDUSTRY_PRESETS = [
  "SaaS / Tech Startup",
  "Local Bakery / Food Service",
  "E-commerce Retailer",
  "Boutique Fashion Brand",
  "Specialty Coffee Shop",
  "Healthcare Practice",
  "Construction / Contracting",
  "Marketing & Creative Agency",
  "EduTech & Live Tutoring",
  "Plumbing & Home Services",
  "Therapy & Dental Clinic",
  "Consulting & Business Advisory"
];

const BUSINESS_MODELS = [
  "Local Services & Trades (Plumbing, Salon, Cafe, Care, Tuition)",
  "Professional Services & Agency (Consulting, Marketing, IT Dev)",
  "Health, Medical & Wellness (Clinic, Gym, Therapy, Pharmacy)",
  "Digital Products & Tech (SaaS, Mobile Apps, Creator Assets)",
  "Physical Products & Manufacturing (Retail, F&B, Consumer Goods)"
];

const PRESETS: Record<string, Partial<BusinessInput>> = {
  Bakery: {
    businessName: "Crumbs & Crust Bakery",
    businessType: "Local Bakery / Food Service",
    businessModel: "Physical Products & Manufacturing (Retail, F&B, Consumer Goods)",
    businessAge: "1-2 Years",
    monthlyRevenue: "$18,500",
    location: "Austin, Texas",
    fundingRequirement: "$45,000",
    targetGoal: "Scale operations",
    additionalDetails: "High ingredient costs (inflation) and intense competition from local supermarket chains. Wanting to hire a full-time lead baker and buy an industrial deck oven."
  },
  SaaS: {
    businessName: "CognitiveFlow AI",
    businessType: "SaaS / Tech Startup",
    businessModel: "Digital Products & Tech (SaaS, Mobile Apps, Creator Assets)",
    businessAge: "Less than 1 year",
    monthlyRevenue: "$8,200",
    location: "San Francisco, CA",
    fundingRequirement: "$250,000",
    targetGoal: "Customer acquisitions",
    additionalDetails: "Product is built and showing strong early retention. Customers love the smart scheduling feature, but we are struggling with organic traffic. We want to hire an growth marketer."
  },
  Trades: {
    businessName: "Apex Plumbing & Electrical",
    businessType: "Plumbing & Home Services",
    businessModel: "Local Services & Trades (Plumbing, Salon, Cafe, Care, Tuition)",
    businessAge: "3-5 Years",
    monthlyRevenue: "$26,000",
    location: "Chicago, Illinois",
    fundingRequirement: "$60,000",
    targetGoal: "Scale operations",
    additionalDetails: "Growing customer base but dispatch schedules are extremely unorganized and hand-written. Looking to buy dispatch software and hire 2 more experienced team technicians to handle urgent callouts."
  },
  Agency: {
    businessName: "Quantum Growth Partners",
    businessType: "Marketing & Creative Agency",
    businessModel: "Professional Services & Agency (Consulting, Marketing, IT Dev)",
    businessAge: "1-2 Years",
    monthlyRevenue: "$42,000",
    location: "New York, NY",
    fundingRequirement: "$110,000",
    targetGoal: "Build team",
    additionalDetails: "Provides high-touch retainer services. Profit margins are good, but we have reached our maximum hours capacity and need to convert standard services into scalable packages and hire a senior project manager."
  }
};

export default function App() {
  const [formData, setFormData] = useState<BusinessInput>({
    businessName: "",
    businessType: "",
    businessModel: "Local Services & Trades (Plumbing, Salon, Cafe, Care, Tuition)",
    businessAge: "1-2 Years",
    monthlyRevenue: "",
    location: "",
    country: "India",
    fundingRequirement: "",
    targetGoal: "Scale operations",
    additionalDetails: "",
    knownCompetitors: "",
    marketScope: "Local",
    firstMoverStatus: "Moderate Competition (Some similar businesses, but room to disrupt)",
    businessOfferings: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentReport, setCurrentReport] = useState<AdviceReport | null>(null);
  const [savedReports, setSavedReports] = useState<AdviceReport[]>([]);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [checkedImprovements, setCheckedImprovements] = useState<Record<string, boolean>>({});
  
  // State for Hindi Print-optimized PDF Custom Export feature
  const [showExportModal, setShowExportModal] = useState(false);
  const [skipExportGuide, setSkipExportGuide] = useState(() => {
    try {
      return localStorage.getItem("skip_hindi_pdf_guide") === "true";
    } catch {
      return false;
    }
  });

  // State variables for Copy, Like/Dislike feedback, and Audio Narrator
  const [reportCopied, setReportCopied] = useState(false);
  const [isReportLiked, setIsReportLiked] = useState(false);
  const [isReportDisliked, setIsReportDisliked] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Custom Global SaaS States
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "INR" | "EUR" | "GBP" | "JPY">("INR");
  const [selectedLanguage, setSelectedLanguage] = useState<"EN" | "HI" | "HINGLISH" | "MR" | "TA" | "TE" | "BN" | "ES" | "DE" | "FR">("HI");

  // Multi-Language translation matrix
  const TRANSLATIONS: Record<string, Record<string, string>> = {
    EN: {
      businessAnalysis: "Business Analysis",
      growthOpportunities: "Growth Opportunities",
      recommendedFunding: "Recommended Funding",
      riskAssessment: "Risk Assessment",
      dashboardTitle: "Global Market Scaling & Enterprise Intelligence",
      executiveHub: "Executive Hub",
      ceoAdvisory: "CEO & Boardroom Advisor",
      strategyForecasts: "Strategy & Forecasts",
      globalExpansion: "Global Expansion",
      capitalInvestor: "Capital & Investor Hub",
      competitiveEdge: "Competitive Edge",
      risksCompliance: "Risks & Compliance",
      indiaEnterprise: "India Market Advisor",
      currencySelect: "Display Currency",
      languageSelect: "Display Language",
      overallScore: "Overall Potential Score",
      generateAnalysis: "Generate Analysis",
      allReports: "All Historic Reports",
      udyamTitle: "Udyam Registration Advisor",
      gstReady: "GST Readiness Checker",
      loanEstimator: "CGTMSE Loan Eligibility Estimator",
      franchisePlanner: "Franchise Expansion Planner",
      subsidyFinder: "District-wise Gov Subsidy Finder",
      ruralEngine: "Rural Business Opportunity Engine",
      valuationHeadline: "AI Business Valuation Estimate",
      esgHeadline: "ESG Sustainability Score Card",
      countryMatrix: "Country Market Expansion Matrix",
      valuationDrivers: "Valuation Multipliers & Strategic Drivers",
      backToDashboard: "Go Back",
      analyzingText: "Analyzing Enterprise Model...",
      esgEnv: "Environmental Rating",
      esgSocial: "Social Responsibility Rating",
      esgGov: "Governance Standards Rating",
    },
    ES: {
      dashboardTitle: "Escalamiento del Mercado Global e Inteligencia Empresarial",
      executiveHub: "Centro Ejecutivo",
      ceoAdvisory: "Asesor del CEO y Junta Directiva",
      strategyForecasts: "Estrategia y Pronósticos",
      globalExpansion: "Expansión Global",
      capitalInvestor: "Sede de Capital e Inversores",
      competitiveEdge: "Ventaja Competitiva",
      risksCompliance: "Riesgos y Cumplimiento",
      indiaEnterprise: "Asesor de Mercado de la India",
      currencySelect: "Moneda de Visualización",
      languageSelect: "Idioma de Visualización",
      overallScore: "Puntaje de Potencial General",
      generateAnalysis: "Generar Análisis",
      allReports: "Todos los Informes Históricos",
      udyamTitle: "Asesor de Registro de Udyam",
      gstReady: "Verificador de Preparación para el GST",
      loanEstimator: "Estimador de Elegibilidad para Préstamos CGTMSE",
      franchisePlanner: "Planificador de Expansión de Franquicias",
      subsidyFinder: "Buscador de Subsidios del Distrito",
      ruralEngine: "Motor de Oportunidades en Negocios Rurales",
      valuationHeadline: "Estimación de Valoración Comercial por IA",
      esgHeadline: "Tarjeta de Puntaje de Sostenibilidad ESG",
      countryMatrix: "Matriz de Expansión del Mercado por País",
      valuationDrivers: "Multiplicadores de Valoración y Factores Clave",
      backToDashboard: "Volver",
      analyzingText: "Analizando Modelo de Empresa...",
      esgEnv: "Calificación Ambiental",
      esgSocial: "Responsabilidad Social",
      esgGov: "Estándares de Gobernanza",
    },
    DE: {
      dashboardTitle: "Globale Marktskalierung & Unternehmensintelligenz",
      executiveHub: "Vorstandshub",
      ceoAdvisory: "CEO- und Aufsichtsratsberatung",
      strategyForecasts: "Strategie & Prognosen",
      globalExpansion: "Globale Expansion",
      capitalInvestor: "Kapital- & Investorenzentrum",
      competitiveEdge: "Wettbewerbsvorteil",
      risksCompliance: "Risiken & Compliance",
      indiaEnterprise: "Indien-Marktberater",
      currencySelect: "Währung anzeigen",
      languageSelect: "Sprache anzeigen",
      overallScore: "Gesamtes Potenzial-Ergebnis",
      generateAnalysis: "Analyse Generieren",
      allReports: "Alle historischen Berichte",
      udyamTitle: "Udyam-Registrierungsberater",
      gstReady: "GST-Bereitschaftsführung",
      loanEstimator: "CGTMSE Kredit-Eignungsschätzer",
      franchisePlanner: "Franchise-Expansionsplaner",
      subsidyFinder: "Bezirksregierungs-Subventionssuchen",
      ruralEngine: "Ländlicher Geschäftschancen-Motor",
      valuationHeadline: "KI-Unternehmensbewertungsschätzung",
      esgHeadline: "ESG-Nachhaltigkeitsbewertung",
      countryMatrix: "Länder-Erweiterungsmatrix",
      valuationDrivers: "Bewertungsschlüssel & Strategische Treiber",
      backToDashboard: "Zurück",
      analyzingText: "Unternehmensmodell wird analysiert...",
      esgEnv: "Umweltbewertung",
      esgSocial: "Soziale Verantwortung",
      esgGov: "Governance-Standards (Unternehmensführung)",
    },
    HI: {
      businessAnalysis: "व्यवसाय विश्लेषण",
      growthOpportunities: "विकास के अवसर",
      recommendedFunding: "अनुशंसित वित्तीय सहायता",
      riskAssessment: "जोखिम मूल्यांकन",
      dashboardTitle: "वैश्विक बाजार स्केलिंग और एंटरप्राइज इंटेलिजेंस",
      executiveHub: "कार्यकारी हब",
      ceoAdvisory: "सीईओ और बोर्डरूम सलाहकार",
      strategyForecasts: "रणनीति और पूर्वानुमान",
      globalExpansion: "वैश्विक विस्तार",
      capitalInvestor: "पूंजी और निवेशक हब",
      competitiveEdge: "प्रतिस्पर्धी बढ़त",
      risksCompliance: "जोखिम और अनुपालन",
      indiaEnterprise: "भारत बाजार सलाहकार",
      currencySelect: "मुद्रा प्रदर्शित करें",
      languageSelect: "भाषा प्रदर्शित करें",
      overallScore: "कुल संभावित स्कोर",
      generateAnalysis: "विश्लेषण उत्पन्न करें",
      allReports: "सभी ऐतिहासिक रिपोर्ट",
      udyamTitle: "उद्यम पंजीकरण सलाहकार",
      gstReady: "GST तैयारी चेकर",
      loanEstimator: "CGTMSE ऋण पात्रता अनुमानक",
      franchisePlanner: "फ्रैंचाइज़ी विस्तार योजनाकार",
      subsidyFinder: "जिला-वार सरकारी सब्सिडी खोजक",
      ruralEngine: "ग्रामीण व्यवसाय अवसर इंजन",
      valuationHeadline: "एआई व्यवसाय मूल्यांकन अनुमान",
      esgHeadline: "ESG स्थिरता स्कोर कार्ड",
      countryMatrix: "देश विस्तार मैट्रिक्स",
      valuationDrivers: "मूल्यांकन गुणक और रणनीतिक चालक",
      backToDashboard: "वापस जाएँ",
      analyzingText: "उद्यम मॉडल का विश्लेषण जारी...",
      esgEnv: "पर्यावरण रेटिंग",
      esgSocial: "सामाजिक दायित्व रेटिंग",
      esgGov: "सुशासन मानक रेटिंग",
    },
    HINGLISH: {
      businessAnalysis: "Business Analysis",
      growthOpportunities: "Growth Opportunities",
      recommendedFunding: "Recommended Funding",
      riskAssessment: "Risk Assessment",
      dashboardTitle: "Global Market Scaling aur Enterprise Intelligence Platform",
      executiveHub: "Executive Hub",
      ceoAdvisory: "CEO aur Boardroom Advice",
      strategyForecasts: "Strategy aur Forecasts",
      globalExpansion: "Global Market Expansion",
      capitalInvestor: "Capital aur Investor Hub",
      competitiveEdge: "Competitor Intelligence aur Competitive Advantage",
      risksCompliance: "Risks aur Legal Compliance",
      indiaEnterprise: "India Mode Specialist Advisor",
      currencySelect: "Paisa Currency Select",
      languageSelect: "Bhasha Select Karein",
      overallScore: "Over-all Potential Score",
      generateAnalysis: "Smart Analysis Chalayein",
      allReports: "Puraane Analysis Reports History",
      udyamTitle: "Udyam Registration Advisor",
      gstReady: "GST Readiness Checker aur Solutions",
      loanEstimator: "CGTMSE Collateral-Free Loan Estimator",
      franchisePlanner: "Franchise Plan & Scale",
      subsidyFinder: "Zila/District Subsidy Finder",
      ruralEngine: "Rural Markets Business Engine",
      valuationHeadline: "AI Business Valuation Estimate",
      esgHeadline: "ESG Sustainability Score Card",
      countryMatrix: "Country-wise Expansion Grid/Matrix",
      valuationDrivers: "Company Value aur Badhaane ke Tareeqe",
      backToDashboard: "Wapas Jayein",
      analyzingText: "Smart Model Analysis Chal raha hai...",
      esgEnv: "Environment (Environmental Rating)",
      esgSocial: "Social (Social Work)",
      esgGov: "Governance (Management Quality)",
    },
    MR: {
      dashboardTitle: "ग्लोबल मार्केट स्केलिंग आणि इंटरप्राइझ इंटेलिजन्स",
      executiveHub: "कार्यकारी केंद्र",
      ceoAdvisory: "मुख्य कार्यकारी अधिकारी आणि बोर्ड सल्लागार",
      strategyForecasts: "रणनीती आणि अंदाज",
      globalExpansion: "जागतिक विस्तार",
      capitalInvestor: "भांडवल आणि गुंतवणूकदार हब",
      competitiveEdge: "स्पर्धात्मक फायदा",
      risksCompliance: "जोखिम आणि अनुपालन",
      indiaEnterprise: "भारतीय बाजार सल्लागार",
      currencySelect: "चलन निवडा",
      languageSelect: "भाषा निवडा",
      overallScore: "एकूण संभाव्य गुण",
      generateAnalysis: "विश्लेषण सुरू करा",
      allReports: "सर्व ऐतिहासिक अहवाल",
      udyamTitle: "उद्यम नोंदणी सल्लागार",
      gstReady: "जीएसटी सज्जता तपासणी",
      loanEstimator: "CGTMSE कर्ज पात्रता अंदाजक",
      franchisePlanner: "फ्रँचायझी विस्तार नियोजक",
      subsidyFinder: "जिल्हानिहाय शासकीय अनुदान शोधक",
      ruralEngine: "ग्रामीण व्यवसाय संधी इंजिन",
      valuationHeadline: "एआय व्यवसाय मूल्यांकन अंदाज",
      esgHeadline: "ESG शाश्वतता धावसंख्या कार्ड",
      countryMatrix: "देश विस्तार मॅट्रिक्स",
      valuationDrivers: "मूल्यांकन गुणक आणि धोरणात्मक चालक",
      backToDashboard: "परत जा",
      analyzingText: "इंटरप्राइझ मॉडेलचे विश्लेषण सुरू आहे...",
      esgEnv: "पर्यावरण रेटिंग",
      esgSocial: "सामाजिक दायित्व",
      esgGov: "शासन मानके",
    },
    TA: {
      dashboardTitle: "உலகளாவிய சந்தை அளவீடு மற்றும் நிறுவன நுண்ணறிவு",
      executiveHub: "நிர்வாக மையம்",
      ceoAdvisory: "தலைமை நிர்வாக அதிகாரி & வாரிய ஆலோசகர்",
      strategyForecasts: "மூலோபாயம் மற்றும் கணிப்புகள்",
      globalExpansion: "உலகளாவிய விரிவாக்கம்",
      capitalInvestor: "மூலதனம் மற்றும் முதலீட்டாளர் மையம்",
      competitiveEdge: "போட்டித்திறன் நன்மை",
      risksCompliance: "அபாயங்கள் மற்றும் இணக்கம்",
      indiaEnterprise: "இந்திய சந்தை ஆலோசகர்",
      currencySelect: "நாணயத்தை தேர்ந்தெடுக்கவும்",
      languageSelect: "மொழியை தேர்ந்தெடுக்கவும்",
      overallScore: "ஒட்டுமொத்த சாத்தியமான மதிப்பெண்",
      generateAnalysis: "பகுப்பாய்வை உருவாக்கு",
      allReports: "அனைத்து வரலாற்று அறிக்கைகள்",
      udyamTitle: "உத்யம் பதிவு ஆலோசகர்",
      gstReady: "ஜிஎஸ்டி தயார்நிலை சரிபார்ப்பு",
      loanEstimator: "CGTMSE கடன் தகுதி மதிப்பீட்டாளர்",
      franchisePlanner: "அங்கீகார விரிவாக்க திட்டமிடுபவர்",
      subsidyFinder: "மாவட்ட வாரியான அரசு மானியக் கண்டுபிடிப்பாளர்",
      ruralEngine: "கிராமப்புற வணிக வாய்ப்பு இயந்திரம்",
      valuationHeadline: "AI வணிக மதிப்பீட்டு மதிப்பீடு",
      esgHeadline: "ESG நிலைத்தன்மை மதிப்பெண் அட்டை",
      countryMatrix: "நாட்டு விரிவாக்க அணி",
      valuationDrivers: "மதிப்பீட்டு காரணிகள் & மூலோபாய இயக்கிகள்",
      backToDashboard: "திரும்பி செல்",
      analyzingText: "வணிக மாதிரியை பகுப்பாய்வு செய்கிறது...",
      esgEnv: "சுற்றுச்சூழல் மதிப்பீடு",
      esgSocial: "சமூகப் பொறுப்பு",
      esgGov: "ஆளுமைத் தரநிலைகள்",
    },
    TE: {
      dashboardTitle: "గ్లోబల్ మార్కెట్ స్కేలింగ్ & ఎంటర్ప్రైజ్ ఇంటెలిజెన్స్",
      executiveHub: "ఎగ్జిక్యూటివ్ హబ్",
      ceoAdvisory: "CEO & బోర్డు సలహాదారు",
      strategyForecasts: "వ్యూహం & అంచనాలు",
      globalExpansion: "గ్లోబల్ విస్తరణ",
      capitalInvestor: "క్యాపిటల్ & ఇన్వెస్టర్ హబ్",
      competitiveEdge: "పోటీ ప్రయోజనం",
      risksCompliance: "ప్రమాదాలు & సమ్మతి",
      indiaEnterprise: "ఇండియా మార్కెట్ సలహాదారు",
      currencySelect: "కరెన్సీని ఎంచుకోండి",
      languageSelect: "భాషను ఎంచుకోండి",
      overallScore: "మొత్తం సంభావ్య స్కోరు",
      generateAnalysis: "విశ్లేషణను రూపొందించండి",
      allReports: "అన్ని చారిత్రక నిവേదికలు",
      udyamTitle: "ఉద్యమ్ రిజిస్ట్రేషన్ సలహాదారు",
      gstReady: "GST సన్నద్ధత తనిఖీ",
      loanEstimator: "CGTMSE రుణ అర్హత అంచనా వేయువాడు",
      franchisePlanner: "ఫ్రాంచైజీ విస్తరణ ప్లానర్",
      subsidyFinder: "జిల్లా వారీ ప్రభుత్వ సబ్సిడీ ఫైండర్",
      ruralEngine: "గ్రామీణ వ్యాపార అవకాశాల ఇంజన్",
      valuationHeadline: "AI వ్యాపార విలువ అంచనా",
      esgHeadline: "ESG సుస్థిరత స్కోర్‌కార్డ్",
      countryMatrix: "దేశ విస్తరణ మాతృక",
      valuationDrivers: "విలువ డ్రైవర్లు & వ్యూహాత్మక డ్రైవర్లు",
      backToDashboard: "తిరిగి వెళ్ళు",
      analyzingText: "ఎంటర్ప్రైజ్ మోడల్‌ను విశ్లేషిస్తోంది...",
      esgEnv: "పర్యాवरण రేటింగ్",
      esgSocial: "సామాజిక బాధ్యత",
      esgGov: "పాలనా ప్రమాణాలు",
    },
    BN: {
      dashboardTitle: "গলোবাল মার্কেট স্কেলিং এবং এন্টারপ্রাইজ ইন্টেলিজেন্স",
      executiveHub: "এক্সিকিউটিভ হাব",
      ceoAdvisory: "সিইও এবং বোর্ডরুম উপদেষ্টা",
      strategyForecasts: "কৌশল ও পূর্বাভাস",
      globalExpansion: "গ্লোবাল সম্প্রসারণ",
      capitalInvestor: "ক্যাপিটাল ও ইনভেস্টর হাব",
      competitiveEdge: "প্রতিযোগিতামূলক সুবিধা",
      risksCompliance: "ঝুঁকি ও সম্মতি",
      indiaEnterprise: "ভারত মার্केट উপদেষ্টা",
      currencySelect: "মুদ্রা নির্বাচন করুন",
      languageSelect: "ভাষা নির্বাচন করুন",
      overallScore: "সামগ্রিক সম্ভাব্য স্কোর",
      generateAnalysis: "বিশ্লেষণ তৈরি করুন",
      allReports: "সমস্ত ঐতিহাসিক প্রতিবেদন",
      udyamTitle: "উদ্যম নিবন্ধন উপদেষ্টা",
      gstReady: "জিএসটি প্রস্তুতি পরীক্ষা",
      loanEstimator: "CGTMSE ঋণ যোগ্যতা নির্ধারক",
      franchisePlanner: "ফ্র্যাঞ্চাইজি সম্প্রসারণ পরিকল্পনাকারী",
      subsidyFinder: "জেলা-ভিত্তিক সরকারি ভর্তুকি অনুসন্ধানকারী",
      ruralEngine: "গ্রামীণ ব্যবসায়িক সুযোগ ইঞ্জিন",
      valuationHeadline: "এআই ব্যবসায়িক মূল্যায়ন অনুমান",
      esgHeadline: "ইএসজি স্থায়িত্ব স্কোর কার্ড",
      countryMatrix: "দেশ সম্প্রসারণ ম্যাট্রিক্স",
      valuationDrivers: "মূল্যায়ন গুণক ও কৌশলগত চালক",
      backToDashboard: "ফিরে যান",
      analyzingText: "এন্টারপ্রাইজ মডেল বিশ্লেষণ করা হচ্ছে...",
      esgEnv: "পরিবেশগত রেটিং",
      esgSocial: "সামাজিক দায়বদ্ধতা",
      esgGov: "শাসনমান",
    },
    FR: {
      dashboardTitle: "Mise à l'Échelle du Marché Global & Enterprise Intelligence",
      executiveHub: "Centre Exécutif",
      ceoAdvisory: "Conseiller du CEO & Conseil d'Administration",
      strategyForecasts: "Stratégie & Prévisions",
      globalExpansion: "Expansion Globale",
      capitalInvestor: "Pôle Capital & Investisseurs",
      competitiveEdge: "Avantage Concurrentiel",
      risksCompliance: "Risques & Conformité",
      indiaEnterprise: "Conseiller du Marché d'Inde",
      currencySelect: "Devise d'Affichage",
      languageSelect: "Langue d'Affichage",
      overallScore: "Score de Potentiel Global",
      generateAnalysis: "Générer l'Analyse",
      allReports: "Tous les Rapports Historiques",
      udyamTitle: "Conseiller d'Enregistrement Udyam",
      gstReady: "Vérificateur de Préparation au GST",
      loanEstimator: "Estimateur d'Éligibilité de Prêt CGTMSE",
      franchisePlanner: "Planificateur d'Expansion de Franchises",
      subsidyFinder: "Chercheur de Subventions Publiques Régionales",
      ruralEngine: "Moteur d'Opportunités Commerciales Rurales",
      valuationHeadline: "Estimation AI de la Valorisation de l'Entreprise",
      esgHeadline: "Carte de Score de Durabilité ESG",
      countryMatrix: "Matrice d'Expansion Géographique",
      valuationDrivers: "Multiplicateurs de Valeur & Leviers Stratégiques",
      backToDashboard: "Retour",
      analyzingText: "Analyse en cours...",
      esgEnv: "Évaluation Environnementale",
      esgSocial: "Responsabilité Sociale",
      esgGov: "Normes de Gouvernance",
    }
  };

  const t = (key: keyof typeof TRANSLATIONS["EN"]): string => {
    return TRANSLATIONS[selectedLanguage]?.[key] || TRANSLATIONS["EN"][key] || key;
  };

  const formatCurrencyValue = (val: string | undefined | number): string => {
    if (val === undefined || val === null) return "N/A";
    
    // If it's a number, treat as USD baseline
    if (typeof val === "number") {
      let converted = val;
      let symbol = "$";
      if (selectedCurrency === "INR") {
        converted = val * 83.0;
        symbol = "₹";
      } else if (selectedCurrency === "EUR") {
        converted = val * 0.92;
        symbol = "€";
      } else if (selectedCurrency === "GBP") {
        converted = val * 0.79;
        symbol = "£";
      } else if (selectedCurrency === "JPY") {
        converted = val * 155.0;
        symbol = "¥";
      }
      
      if (converted >= 1000000) {
        return `${symbol}${(converted / 1000000).toFixed(1)}M`;
      } else if (converted >= 1000) {
        return `${symbol}${(converted / 1000).toFixed(1)}K`;
      }
      return `${symbol}${converted.toFixed(0)}`;
    }

    const strVal = String(val);
    const cleanNumbers = strVal.replace(/[^0-9.]/g, "");
    const numericVal = parseFloat(cleanNumbers);
    
    if (isNaN(numericVal)) {
      let mapped = strVal;
      if (selectedCurrency === "INR") {
        mapped = mapped.replace(/\$/g, "₹").replace(/USD/g, "INR").replace(/USD/gi, "INR").replace(/\bRs\.?\b/gi, "₹");
      } else if (selectedCurrency === "EUR") {
        mapped = mapped.replace(/\$/g, "€").replace(/USD/g, "EUR").replace(/₹/g, "€").replace(/INR/g, "EUR");
      } else if (selectedCurrency === "GBP") {
        mapped = mapped.replace(/\$/g, "£").replace(/USD/g, "GBP").replace(/₹/g, "£").replace(/INR/g, "GBP");
      } else if (selectedCurrency === "JPY") {
        mapped = mapped.replace(/\$/g, "¥").replace(/USD/g, "JPY").replace(/₹/g, "¥").replace(/INR/g, "JPY");
      } else {
        mapped = mapped.replace(/₹/g, "$").replace(/INR/gi, "USD").replace(/Rs\.?/gi, "$");
      }
      return mapped;
    }

    const isOriginalRupee = strVal.includes("₹") || strVal.toLowerCase().includes("inr") || strVal.toLowerCase().includes("rs");
    let usdBaseline = numericVal;
    if (isOriginalRupee) {
      usdBaseline = numericVal / 83.0;
    }

    let converted = usdBaseline;
    let symbol = "$";
    if (selectedCurrency === "INR") {
      converted = usdBaseline * 83.0;
      symbol = "₹";
    } else if (selectedCurrency === "EUR") {
      converted = usdBaseline * 0.92;
      symbol = "€";
    } else if (selectedCurrency === "GBP") {
      converted = usdBaseline * 0.79;
      symbol = "£";
    } else if (selectedCurrency === "JPY") {
      converted = usdBaseline * 155.0;
      symbol = "¥";
    }

    const originalSuffix = strVal.replace(/[0-9$,.₹\s]/g, "");
    let formattedNum = "";
    if (converted >= 1000000) {
      formattedNum = (converted / 1000000).toFixed(1) + "M";
    } else if (converted >= 1000) {
      formattedNum = (converted / 1000).toFixed(1) + "K";
    } else {
      formattedNum = converted.toFixed(0);
    }

    return `${symbol}${formattedNum}${originalSuffix ? " " + originalSuffix : ""}`.trim();
  };

  // Load saved reports from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("growth_advisor_reports");
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load records from localStorage", e);
    }
  }, []);

  // Loading indicator step cycles
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 3500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const applyPreset = (presetKey: "Bakery" | "SaaS" | "Trades" | "Agency") => {
    const preset = PRESETS[presetKey];
    if (preset) {
      setFormData({
        businessName: preset.businessName || "",
        businessType: preset.businessType || "",
        businessModel: preset.businessModel || "Local Services & Trades (Plumbing, Salon, Cafe, Care, Tuition)",
        businessAge: preset.businessAge || "1-2 Years",
        monthlyRevenue: preset.monthlyRevenue || "",
        location: preset.location || "",
        fundingRequirement: preset.fundingRequirement || "",
        targetGoal: preset.targetGoal || "Scale operations",
        additionalDetails: preset.additionalDetails || "",
        knownCompetitors: preset.knownCompetitors || "",
        marketScope: preset.marketScope || "Local",
        firstMoverStatus: preset.firstMoverStatus || "Moderate Competition (Some similar businesses, but room to disrupt)",
        businessOfferings: preset.businessOfferings || ""
      });
    }
  };

  const handleInputChange = (field: keyof BusinessInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.businessType || !formData.location) {
      setError("Please fill out all required fields: Business Name, Industry, and Location.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStep(0);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedLanguage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to generate report.");
      }

      const newReport: AdviceReport = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleString(),
        input: data.input || { ...formData }
      };

      // Save to state & localstorage
      const updatedReports = [newReport, ...savedReports];
      setSavedReports(updatedReports);
      localStorage.setItem("growth_advisor_reports", JSON.stringify(updatedReports));

      setCurrentReport(newReport);
      setActiveTab("hub");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadReport = (report: AdviceReport) => {
    setCurrentReport(report);
    setFormData({ ...report.input });
    setActiveTab("hub");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedReports.filter((r) => r.id !== id);
    setSavedReports(updated);
    localStorage.setItem("growth_advisor_reports", JSON.stringify(updated));
    if (currentReport?.id === id) {
      setCurrentReport(null);
    }
  };

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      try {
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {
        console.error("Cleanup speech synthesis failed:", e);
      }
    };
  }, []);

  const handleCopyReport = () => {
    if (!currentReport) return;
    try {
      // 1. Core Header & Metadata
      let text = `======================================================================
🏢 BUSINESS INTELLIGENCE ADVISORY REPORT
======================================================================
Generated on: ${currentReport.timestamp || new Date().toLocaleString()}

💼 General Information:
----------------------
• Business Name: ${currentReport.input.businessName || "N/A"}
• Industry / Sector: ${currentReport.input.businessType || "N/A"}
• Business Model: ${currentReport.input.businessModel || "N/A"}
• Business Age: ${currentReport.input.businessAge || "N/A"}
• Monthly Baseline Revenue: ${currentReport.input.monthlyRevenue || "N/A"}
• Location: ${currentReport.input.location || "N/A"}${currentReport.input.country ? ` (${currentReport.input.country})` : ""}
• Target Goal: ${currentReport.input.targetGoal || "N/A"}
• Funding Requirement: ${currentReport.input.fundingRequirement || "N/A"}
• Market Scope: ${currentReport.input.marketScope || "N/A"}
• Competition Level: ${currentReport.input.firstMoverStatus || "N/A"}
• Core Offerings: ${currentReport.input.businessOfferings || "N/A"}

📊 Enterprise Scores & Diagnostics:
-------------------------------
• Overall Business Health Index: ${currentReport.businessHealthScore}%`;

      if (currentReport.healthScoreBreakdown) {
        text += `
  - Financial Health: ${currentReport.healthScoreBreakdown.financialHealth}/100
  - Market Position: ${currentReport.healthScoreBreakdown.marketPosition}/100
  - Operational Stability: ${currentReport.healthScoreBreakdown.operationalStability}/100
  - Funding Readiness: ${currentReport.healthScoreBreakdown.fundingReadiness}/100`;
      }

      if (currentReport.opportunityScores) {
        text += `
• Ultimate Opportunity Potential Score: ${currentReport.opportunityScores.overallPotentialScore}/100
  - Growth Score: ${currentReport.opportunityScores.growthScore}/100
  - Funding Readiness: ${currentReport.opportunityScores.fundingReadinessScore}/100
  - Digital Maturity: ${currentReport.opportunityScores.digitalMaturityScore}/100
  - Global Expansion: ${currentReport.opportunityScores.globalExpansionScore}/100
  - Operational Efficiency: ${currentReport.opportunityScores.operationalEfficiencyScore}/100`;
      }

      // 2. Executive Summary & Pitch
      if (currentReport.executiveSummary) {
        text += `

======================================================================
📝 EXECUTIVE SUMMARY & INVESTOR PITCH
======================================================================
👔 C-Suites / Boardroom Ready Strategic Report:
------------------------------------------
${currentReport.executiveSummary.boardroomReadyStrategicReport || "N/A"}

⚡ Investor Pitch Summary:
------------------------
${currentReport.executiveSummary.investorFriendlyPitchSummary || "N/A"}`;
      }

      // 3. Boardroom Ready Strategic Advisor Briefing
      const brief = currentReport.boardroomBrief || {
        ceoRecommendations: [
          `Formally transition ${currentReport.input.businessName || "the business"} to a brand-exclusive positioning within the ${currentReport.input.businessType || "services"} industry.`,
          `Design and institute monthly OKRs focusing purely on high-margin customer cohorts.`,
          `Establish a formal management dashboard tracking customer lifetime value (LTV) to acquisition cost (CAC) monthly.`
        ],
        investorRecommendations: [
          `Optimize the recurring/subscription component of your pricing models to appeal to valuation multipliers.`,
          `Document operational processes and playbooks to demonstrate repeatable scalability.`,
          `Consolidate unit economics showing a path to consistent 45%+ gross operating margins.`
        ],
        marketingRecommendations: [
          `Launch a localized SEO campaign using target search queries relevant to the sector.`,
          `Develop a partner referral program offering 10% commission or value incentive.`,
          `Execute 3 high-authority educational case studies or service showcase videos.`
        ],
        costReductionOpportunities: [
          `Review software licenses and consolidate duplicate cloud solutions/SaaS tools.`,
          `Renegotiate contractor flat-rates or vendor wholesale supply agreements.`,
          `Audit service delivery or inventory pipelines to reduce leakage or waste by 12-15% immediately.`
        ],
        hiringStrategy: [
          `Prioritize onboarding a high-agency operations manager to offload general administrative overhead.`,
          `Onboard performance-incentivized sales development reps to scale pipeline dynamically.`,
          `Establish clear technical/process playbooks for instant onboarding in under 10 business days.`
        ],
        expansionStrategy: [
          `Explore adjacent regions, online vertical channels, or physical service territories.`,
          `Investigate setup/incorporation criteria for secondary high-potential growth regions.`,
          `Form strategic partnerships with non-competing firms catering to similar enterprise targets.`
        ],
        technologyAdoptionPlan: [
          `Integrate a robust CRM system to manage prospects, inquiries and client workflows automatically.`,
          `Deploy low-code workflows (Zapier/Make) to connect forms, alerts, and customer databases.`,
          `Deploy customized AI voice/text agents to handle 80% of tier-1 support queries.`
        ],
        top3PrioritiesNext90Days: [
          `Re-engage dormant accounts with custom premium product/service bundles.`,
          `Audit existing cost centers and software licenses to maximize unit operating margins.`,
          `Harden localized client acquisition channels (SEO, landing page optimizations).`
        ]
      };

      text += `

======================================================================
💼 BOARDROOM ADVISORY BRIEFING (C-SUITE PERSPECTIVES)
======================================================================
🎯 TOP 3 PRIORITIES NEXT 90 DAYS:
--------------------------------
${brief.top3PrioritiesNext90Days?.map((item, idx) => `${idx + 1}. ${item}`).join("\n") || "N/A"}

👔 CEO Recommendations:
---------------------
${brief.ceoRecommendations?.map((item) => `• ${item}`).join("\n") || "N/A"}

💰 Investor Recommendations:
--------------------------
${brief.investorRecommendations?.map((item) => `• ${item}`).join("\n") || "N/A"}

📣 Marketing Recommendations:
---------------------------
${brief.marketingRecommendations?.map((item) => `• ${item}`).join("\n") || "N/A"}

📉 Cost Reduction Opportunities:
------------------------------
${brief.costReductionOpportunities?.map((item) => `• ${item}`).join("\n") || "N/A"}

👥 Hiring Strategy:
-----------------
${brief.hiringStrategy?.map((item) => `• ${item}`).join("\n") || "N/A"}

🌍 Expansion Strategy:
--------------------
${brief.expansionStrategy?.map((item) => `• ${item}`).join("\n") || "N/A"}

💻 Technology Adoption Plan:
--------------------------
${brief.technologyAdoptionPlan?.map((item) => `• ${item}`).join("\n") || "N/A"}`;

      // 4. SWOT Analysis
      if (currentReport.swotAnalysis) {
        text += `

======================================================================
🛡️ SWOT STRATEGIC ANALYSIS
======================================================================
💪 Strengths:
-----------
${currentReport.swotAnalysis.strengths?.map((item) => `• ${item}`).join("\n") || "N/A"}

⚠️ Weaknesses:
------------
${currentReport.swotAnalysis.weaknesses?.map((item) => `• ${item}`).join("\n") || "N/A"}

🌟 Opportunities:
--------------
${currentReport.swotAnalysis.opportunities?.map((item) => `• ${item}`).join("\n") || "N/A"}

🛑 Threats:
---------
${currentReport.swotAnalysis.threats?.map((item) => `• ${item}`).join("\n") || "N/A"}`;
      }

      // 5. Growth Opportunities
      if (currentReport.growthOpportunities && currentReport.growthOpportunities.length > 0) {
        text += `

======================================================================
🚀 STRATEGIC EXPANSION OPPORTUNITIES
======================================================================
${currentReport.growthOpportunities.map((opp, idx) => `
${idx + 1}. ${opp.title}
   - Impact: ${opp.impact} | Effort: ${opp.difficulty}
   - Description: ${opp.description}`).join("\n")}`;
      }

      // 6. Action Plan (90 Days)
      if (currentReport.actionPlan90Days) {
        text += `

======================================================================
📅 90-DAY STEP-BY-STEP ACTION PLAYBOOK
======================================================================
🏁 Month 1 Actions:
------------------
${currentReport.actionPlan90Days.month1?.map((item) => `• ${item.task} (Timeframe: ${item.timeframe})\n  Objective: ${item.objective}`).join("\n\n") || "N/A"}

🏁 Month 2 Actions:
------------------
${currentReport.actionPlan90Days.month2?.map((item) => `• ${item.task} (Timeframe: ${item.timeframe})\n  Objective: ${item.objective}`).join("\n\n") || "N/A"}

🏁 Month 3 Actions:
------------------
${currentReport.actionPlan90Days.month3?.map((item) => `• ${item.task} (Timeframe: ${item.timeframe})\n  Objective: ${item.objective}`).join("\n\n") || "N/A"}`;
      }

      // 7. Global Valuation and ESG (GlobalSaaSFeatures)
      const esg = currentReport.globalSaaSFeatures?.esgSustainabilityScore || {
        overallScore: 82,
        environmentalRating: "Eco-Optimized & Energy Efficient",
        socialResponsibilityRating: "High-Standard Workforce Care",
        governanceStandardsRating: "Ethical & Audit-Ready Integrity",
        sustainabilityInitiatives: [
          "Transition 80% of server resources to carbon-neutral data centers.",
          "Provide digital-first operations reducing physical paper footprint by 95%.",
          "Promote diversity and complete wage transparency policies across staff."
        ]
      };

      const valuation = currentReport.globalSaaSFeatures?.aiBusinessValuationEstimate || {
        estimatedValuationRange: "Valuation Estimator is initializing based on industry ARR targets",
        multiplierType: "EV/Revenue",
        multiplierAppliedValue: "3x - 5x",
        valuationDrivers: [
          "Scalability profile and customer retention index",
          "Recurring subscription or repeat purchasing ratio",
          "Technology intellectual property (IP) or unique operational efficiencies"
        ],
        optimizationStrategies: [
          "Grow monthly recurring revenue (MRR) ratio to make cash flow reliable.",
          "Standardize team onboarding playbooks to remove CEO dependency.",
          "Build exclusive proprietary databases or system workflows to defend competitive edge."
        ]
      };

      text += `

======================================================================
💎 AI BUSINESS VALUATION & SUSTAINABILITY (ESG)
======================================================================
💰 AI Business Valuation Estimate:
-------------------------------
• Estimated Valuation Range: ${valuation.estimatedValuationRange || (valuation as any).valuationRange || "N/A"}
• Multiplier Applied: ${valuation.multiplierAppliedValue || "N/A"} (${valuation.multiplierType || "N/A"})

📈 Strategic Valuation Drivers:
-----------------------------
${valuation.valuationDrivers?.map((driver) => `• ${driver}`).join("\n") || "N/A"}

🛠️ Valuation Optimization Strategies:
-----------------------------------
${valuation.optimizationStrategies?.map((strategy) => `• ${strategy}`).join("\n") || "N/A"}

🌱 ESG Sustainability Report Card:
--------------------------------
• ESG Score: ${esg.overallScore}/100
• Environmental: ${esg.environmentalRating}
• Social Responsibility: ${esg.socialResponsibilityRating}
• Corporate Governance: ${esg.governanceStandardsRating}

🌿 Sustainability Initiatives:
----------------------------
${esg.sustainabilityInitiatives?.map((item) => `• ${item}`).join("\n") || "N/A"}`;

      // 8. Competitor Analysis
      const compAnalysis = currentReport.competitorAnalysis;
      if (compAnalysis) {
        text += `

======================================================================
🔍 COMPETITOR RECONNAISSANCE & EDGE
======================================================================
📊 Key Competitors Map:
---------------------`;
        compAnalysis.competitors?.forEach((comp, idx) => {
          text += `
[${idx + 1}] Competitor: ${comp.name}
    - Market Position: ${comp.marketPositioning}
    - Pricing / Packaging: ${comp.pricingStrategy}
    - Customer Acquisition: ${comp.customerAcquisitionMethod}
    - Digital Presence Rating: ${comp.digitalPresenceRating}`;
        });

        if (compAnalysis.competitiveAdvantageTactics && compAnalysis.competitiveAdvantageTactics.length > 0) {
          text += `

🌟 Exclusive Competitor Beat Tactics (USP):
----------------------------------------
${compAnalysis.competitiveAdvantageTactics.map((t, idx) => `${idx + 1}. ${t}`).join("\n")}`;
        }
      }

      // 9. Government Scheme Matching & Finance Intelligence
      if (currentReport.globalFundingIntelligence && currentReport.globalFundingIntelligence.length > 0) {
        text += `

======================================================================
💰 GLOBAL FUNDING AND MATCHED CHANNELS
======================================================================`;
        currentReport.globalFundingIntelligence.forEach((fund) => {
          text += `
• Match Category: ${fund.category}
  - Fit Appropriateness: ${fund.appropriatenessValue}
  - Matched Range: ${fund.estimatedMatchAmount}
  - Usage Applicability: ${fund.applicability}
  - Expert Insights: ${fund.reasoning}
--------------------------------------`;
        });
      } else if (currentReport.fundingSuggestions && currentReport.fundingSuggestions.length > 0) {
        text += `

======================================================================
💰 STRATEGIC FUNDING OPTIONS MATCHED
======================================================================`;
        currentReport.fundingSuggestions.forEach((fund) => {
          text += `
• Funding Mechanism: ${fund.type}
  - Fit Appropriateness: ${fund.appropriateness}
  - Estimated Amount Match: ${fund.estimatedAmount}
  - Strategic Rationale: ${fund.reasoning}
--------------------------------------`;
        });
      }

      // 10. India Market Specifics (Udyam, CGTMSE, GST, Rural, District, etc.)
      const isIndia = currentReport.input.country?.toLowerCase() === "india" || 
                      currentReport.input.location?.toLowerCase().includes("india") || 
                      currentReport.indiaGovSchemes || 
                      currentReport.indiaMarketSpecifics;

      if (isIndia) {
        text += `

======================================================================
🇮🇳 INDIA REGULATORY & FINANCE PORTAL (MSME/MUDRA/CGTMSE)
======================================================================`;
        
        if (currentReport.indiaGovSchemes && currentReport.indiaGovSchemes.length > 0) {
          text += `
🏛️ High-Prospect Government Schemes:
----------------------------------`;
          currentReport.indiaGovSchemes.forEach((scheme, idx) => {
            text += `
[${idx + 1}] Scheme: ${scheme.name}
    - Description: ${scheme.description}
    - Eligibility: ${scheme.eligibility}
    - Matched Benefits: ${scheme.benefits}`;
          });
        }

        const msme = currentReport.indiaMarketSpecifics;
        if (msme) {
          if (msme.udyamRegistrationAdvisor) {
            text += `

📊 Udyam Registration Advisor Summary:
------------------------------------
• Eligible MSME Classification: ${msme.udyamRegistrationAdvisor.eligibleCategory}
• Documents Required Checklist:
${msme.udyamRegistrationAdvisor.documentsRequired?.map(d => `  [ ] ${d}`).join("\n") || "  • Aadhaar and PAN Card"}
• Custom MSME Subsidy Benefits:
${msme.udyamRegistrationAdvisor.benefitsCustom?.map(b => `  • ${b}`).join("\n") || "  • Direct access to public tenders & concessions"}`;
          }

          if (msme.loanEligibilityEstimator) {
            text += `

💵 Loan & Credit Limit Estimator:
-------------------------------
• Estimated Max Eligible Amount: ${msme.loanEligibilityEstimator.maxEligibleAmount}
• Target Interest Rate Margin: ${msme.loanEligibilityEstimator.suggestedInterestRateRange}
• Credit Score (CIBIL) Benchmark: ${msme.loanEligibilityEstimator.creditScoreRequiredEstimate}
• Collateral-Free (CGTMSE) Guard: ${msme.loanEligibilityEstimator.eligibleCollateralFreeUnderCGTMSE ? "ELIGIBLE under Indian CGTMSE Credit Trust" : "Standard Collateral Required"}
• Recommended Banking Partner Targets: ${msme.loanEligibilityEstimator.recommendedBanksAndNBFCs?.join(", ") || "SBI, HDFC, ICICI, Sidbi"}`;
          }

          if (msme.gstReadinessChecker) {
            text += `

💼 GST Readiness audit:
---------------------
• Turnover Benchmark Threshold: ${msme.gstReadinessChecker.turnoverThresholdApplicable}
• Is Registration Mandated?: ${msme.gstReadinessChecker.mandatoryRegistrationRequired ? "YES (Required for operations)" : "NO (Threshold under registration limit)"}
• Current GST Action Guidelines:
${msme.gstReadinessChecker.actionItems?.map(item => `  • ${item}`).join("\n") || "  • Standardized bookkeeping alignment"}
• Estimated Class Tax GST Rates: ${msme.gstReadinessChecker.gstRatesApplicableEstimate || "18% Standard rate"}`;
          }

          if (msme.ruralBusinessOpportunityEngine) {
            text += `

🌾 Rural & Semi-Urban Growth Portal:
----------------------------------
• Rural Sizing Fit: ${msme.ruralBusinessOpportunityEngine.ruralFitScore}/100
• Viable Rural Sectors: ${msme.ruralBusinessOpportunityEngine.viableSectors?.join(", ") || "N/A"}
• Specific Entry Advice: ${msme.ruralBusinessOpportunityEngine.recommendedRuralMarketsText || "N/A"}`;
          }
        }
      }

      // 11. Market Trends
      if (currentReport.marketTrendScanner) {
        text += `

======================================================================
📡 INDUSTRY FORECAST & MARKET TRENDS
======================================================================
📈 Current Industry Waves:
-----------------------
${currentReport.marketTrendScanner.currentIndustryTrends?.map((item) => `• ${item}`).join("\n") || "N/A"}

🌟 Next-Gen Growth Windows:
-------------------------
${currentReport.marketTrendScanner.emergingOpportunities?.map((item) => `• ${item}`).join("\n") || "N/A"}

⚡ Disruption Risk Warning:
-------------------------
${currentReport.marketTrendScanner.disruptionRisks?.map((item) => `• ${item}`).join("\n") || "N/A"}`;
      }

      // 12. Automation Advisor
      if (currentReport.automationAdvisor) {
        text += `

======================================================================
⚙️ TECH AUTOMATION & SYSTEM STACK ADVISOR
======================================================================
🤖 AI Tools Recommended:
----------------------
${currentReport.automationAdvisor.aiToolsRecommended?.map((item) => `• ${item}`).join("\n") || "N/A"}

📈 Customer Relationship Management (CRM):
----------------------------------------
${currentReport.automationAdvisor.crmSystems?.map((item) => `• ${item}`).join("\n") || "N/A"}

📊 Enterprise Software & ERP:
---------------------------
${currentReport.automationAdvisor.erpSystems?.map((item) => `• ${item}`).join("\n") || "N/A"}

📣 Marketing Automators:
----------------------
${currentReport.automationAdvisor.marketingAutomation?.map((item) => `• ${item}`).join("\n") || "N/A"}

🎧 Customer Service Tech:
-----------------------
${currentReport.automationAdvisor.customerSupportAutomation?.map((item) => `• ${item}`).join("\n") || "N/A"}`;
      }

      // 13. Global Compliance
      if (currentReport.globalCompliance && currentReport.globalCompliance.length > 0) {
        text += `

======================================================================
⚖️ GLOBAL REGULATORY & COMPLIANCE ROADMAP
======================================================================`;
        currentReport.globalCompliance.forEach((comp) => {
          text += `
🌐 Compliance Jurisdiction: ${comp.regionOrScope}
  - Taxation Guidance: ${comp.taxationGuidance}
  - Data Privacy Standards: ${comp.dataPrivacyGuidance}
  - Licensing Requirements: ${comp.licensingGuidance}
-------------------------------------`;
        });
      }

      text += `

======================================================================
🔒 END OF ADVISORY REPORT • CONFIDENTIAL
Generated via VC Room Intelligence Engine
======================================================================`;

      navigator.clipboard.writeText(text);
      setReportCopied(true);
      setTimeout(() => setReportCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = () => {
    setIsReportLiked(prev => {
      const nextLiked = !prev;
      if (nextLiked) setIsReportDisliked(false);
      return nextLiked;
    });
  };

  const handleDislike = () => {
    setIsReportDisliked(prev => {
      const nextDisliked = !prev;
      if (nextDisliked) setIsReportLiked(false);
      return nextDisliked;
    });
  };

  const handleNarrate = () => {
    if (!currentReport) return;

    if (isNarrating) {
      try {
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {
        console.error(e);
      }
      setIsNarrating(false);
      return;
    }

    try {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      const isHindi = selectedLanguage === "HI" || selectedLanguage === "HINGLISH" || !currentReport.boardroomBrief?.recommendedActionSteps;
      
      let speechText = "";
      if (isHindi) {
        speechText = `व्यवसाय सलाह रिपोर्ट सारांश। आपके व्यवसाय, ${currentReport.input.businessName || "उद्यम"}, का स्वास्थ्य स्कोर ${currentReport.businessHealthScore || 80} प्रतिशत है। प्रमुख सिफ़ारिशें इस प्रकार हैं: ${currentReport.boardroomBrief?.recommendedActionSteps?.slice(0, 3).join(". ") || "सफलता की दिशा में आगे बढ़ें।"}`;
      } else {
        speechText = `Business Intelligence Advisory Report. For ${currentReport.input.businessName || "your enterprise"}, the overall Health Score is ${currentReport.businessHealthScore || 80} percent. Major recommendations include: ${currentReport.boardroomBrief?.recommendedActionSteps?.slice(0, 3).join(". ") || "Execute defined strategic frameworks."}`;
      }

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = isHindi ? "hi-IN" : "en-US";
      
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(v => v.lang.startsWith(isHindi ? "hi" : "en"));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsNarrating(false);
      };

      utterance.onerror = () => {
        setIsNarrating(false);
      };

      speechUtteranceRef.current = utterance;
      setIsNarrating(true);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Speech Synthesis failed:", error);
      setIsNarrating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getCurrentReportPDFHTML = (report: AdviceReport): string => {
    const businessName = report.input.businessName || "उद्यम (Your Enterprise)";
    const businessType = report.input.businessType || "N/A";
    const businessModel = report.input.businessModel || "N/A";
    const businessAge = report.input.businessAge || "N/A";
    const monthlyRevenue = report.input.monthlyRevenue || "N/A";
    const location = report.input.location || "N/A";
    const country = report.input.country || "India";
    const targetGoal = report.input.targetGoal || "N/A";
    const fundingRequirement = report.input.fundingRequirement || "N/A";
    const marketScope = report.input.marketScope || "N/A";
    const firstMoverStatus = report.input.firstMoverStatus || "N/A";
    const businessOfferings = report.input.businessOfferings || "N/A";

    const brief = report.boardroomBrief || {
      ceoRecommendations: [],
      investorRecommendations: [],
      marketingRecommendations: [],
      costReductionOpportunities: [],
      hiringStrategy: [],
      expansionStrategy: [],
      technologyAdoptionPlan: [],
      top3PrioritiesNext90Days: []
    };

    const swot = report.swotAnalysis || { strengths: [], weaknesses: [], opportunities: [], threats: [] };
    
    // ESG & Valuation
    const esg = report.globalSaaSFeatures?.esgSustainabilityScore || {
      overallScore: 82,
      environmentalRating: "Eco-Optimized & Sustainable",
      socialResponsibilityRating: "High Workforce Welfare Standards",
      governanceStandardsRating: "Transparent & Boardroom Audit Ready",
      sustainabilityInitiatives: []
    };

    const valuation = report.globalSaaSFeatures?.aiBusinessValuationEstimate || {
      estimatedValuationRange: "N/A",
      multiplierType: "EV/Revenue",
      multiplierAppliedValue: "N/A",
      valuationDrivers: [],
      optimizationStrategies: []
    };

    // Competitive Section helper
    const competitorsList = report.competitorAnalysis?.competitors || [];
    const tacticsList = report.competitorAnalysis?.competitiveAdvantageTactics || [];

    // Funding category helper
    const fundingChannels = report.globalFundingIntelligence || [];
    const legacyFunding = report.fundingSuggestions || [];

    // India Gov Schemes
    const schemeList = report.indiaGovSchemes || [];
    const msme = report.indiaMarketSpecifics;

    return `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - Business Intelligence Advisory Report</title>
  
  <!-- CSS Fonts Setup -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS Integration -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
            display: ['Space Grotesk', 'Noto Sans Devanagari', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style type="text/css">
    body {
      font-family: 'Inter', 'Noto Sans Devanagari', sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    @media print {
      .no-print {
        display: none !important;
      }
      body {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      .print-card {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
        border: 1px solid #e2e8f0 !important;
        box-shadow: none !important;
        background: #ffffff !important;
      }
      .page-break {
        page-break-before: always !important;
        break-before: page !important;
      }
      @page {
        size: A4 portrait;
        margin: 15mm 15mm 20mm 15mm;
      }
      .print-footer-fixed {
        display: none !important;
      }
      @media print {
        .print-footer-fixed {
          position: fixed;
          bottom: -10mm;
          left: 0;
          right: 0;
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          font-size: 8px;
          color: #475569 !important;
          border-top: 1px solid #cbd5e1 !important;
          padding-top: 6px;
          background-color: #ffffff !important;
          z-index: 9999;
          height: 10mm;
        }
        .page-number::before {
          content: "Page " counter(page);
        }
      }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">

  <!-- TOP NO-PRINT CONTROL NAVIGATION HEADER -->
  <div class="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-red-500/20 text-red-400 p-1.5 rounded-lg border border-red-500/30">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 class="text-sm font-bold tracking-tight text-white font-display">Hindi-Optimized High-Fidelity Advisory Exporter</h1>
          <p class="text-[11px] text-slate-400">यह लोकल फ़ाइल iframe प्रतिबंधों से पूरी तरह मुक्त है। (Printers & PDF Ready)</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="window.close()" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg transition-all border border-slate-700">
          बंद करें (Close)
        </button>
        <button onclick="window.print()" class="px-5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center space-x-1.5 border border-indigo-500">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>पीडीएफ में सहेजें (Print / Save PDF)</span>
        </button>
      </div>
    </div>
  </div>

  <!-- PRINT WRAPPER -->
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    
    <!-- BRAND HEADER OVERVIEW -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden print-card mb-6">
      <div class="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-red-600 via-indigo-600 to-indigo-800"></div>
      
      <div class="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center">
        <div>
          <span class="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold tracking-wider rounded-full uppercase font-mono">
            CONFIDENTIAL ADVISORY BRIEFING
          </span>
          <h1 class="text-2xl sm:text-3.5xl font-extrabold text-slate-900 mt-2 font-display leading-tight">
            ${businessName}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
            Generated via Vault Intelligence Engine • ${report.timestamp || new Date().toLocaleString()}
          </p>
        </div>
        
        <div class="flex items-center space-x-4 bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl print-card">
          <div class="text-center">
            <p class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Health Score</p>
            <div class="text-3xl font-black text-indigo-600 font-display">${report.businessHealthScore}%</div>
          </div>
        </div>
      </div>

      <!-- INCOMING SPECIFICS GRID -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Sector</span>
          <span class="text-xs font-semibold text-slate-800">${businessType}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Business Model</span>
          <span class="text-xs font-semibold text-slate-800">${businessModel}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Monthly Revenue</span>
          <span class="text-xs font-semibold text-slate-800 text-indigo-600 font-mono">${monthlyRevenue}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Location</span>
          <span class="text-xs font-semibold text-slate-800">${location}${country ? ` (${country})` : ""}</span>
        </div>
      </div>
      
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Business Age</span>
          <span class="text-xs font-semibold text-slate-800">${businessAge}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Target Goal</span>
          <span class="text-xs font-semibold text-slate-800">${targetGoal}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Market Scope</span>
          <span class="text-xs font-semibold text-slate-800">${marketScope}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-400 block font-bold uppercase">Funding Requirement</span>
          <span class="text-xs font-semibold text-slate-800 text-indigo-600 font-mono">${fundingRequirement}</span>
        </div>
      </div>
    </div>

    <!-- CORE DIAGNOSTIC SCORING -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        📊 Enterprise Performance Matrix (प्रदर्शन विश्लेषण)
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div>
          <h3 class="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-3">Core Health Indexes (/100)</h3>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>वित्तीय स्वास्थ्य (Financial Health)</span>
                <span>${report.healthScoreBreakdown?.financialHealth || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: ${report.healthScoreBreakdown?.financialHealth || 0}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>बाज़ार स्थिति (Market Position)</span>
                <span>${report.healthScoreBreakdown?.marketPosition || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-indigo-500 h-full rounded-full" style="width: ${report.healthScoreBreakdown?.marketPosition || 0}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>परिचालन स्थिरता (Operational Stability)</span>
                <span>${report.healthScoreBreakdown?.operationalStability || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-blue-500 h-full rounded-full" style="width: ${report.healthScoreBreakdown?.operationalStability || 0}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>फंडिंग तत्परता (Funding Readiness)</span>
                <span>${report.healthScoreBreakdown?.fundingReadiness || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" style="width: ${report.healthScoreBreakdown?.fundingReadiness || 0}%"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-3">Ultimate Potential Parameters</h3>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>विकास क्षमता (Growth Potential)</span>
                <span>${report.opportunityScores?.growthScore || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: ${report.opportunityScores?.growthScore || 0}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>डिजिटल परिपक्वता (Digital Maturity)</span>
                <span>${report.opportunityScores?.digitalMaturityScore || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-indigo-500 h-full rounded-full" style="width: ${report.opportunityScores?.digitalMaturityScore || 0}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>वैश्विक विस्तार (Global Expansion)</span>
                <span>${report.opportunityScores?.globalExpansionScore || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" style="width: ${report.opportunityScores?.globalExpansionScore || 0}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>परिचालन दक्षता (Operational Efficiency)</span>
                <span>${report.opportunityScores?.operationalEfficiencyScore || 0}%</span>
              </div>
              <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-teal-500 h-full rounded-full" style="width: ${report.opportunityScores?.operationalEfficiencyScore || 0}%"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- SCORE CALCULATION TRANSPARENCY EXPLANATION -->
      <div class="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
        <span class="font-bold text-slate-800 block mb-1">
          📊 व्यावसायिक स्वास्थ्य सूचकांक गणना विवरण (Business Health Index Calculation Methodology):
        </span>
        <p class="leading-relaxed">
          ${report.healthScoreBreakdown?.scoreCalculationExplanation || report.scoreTransparencyExplanation || "The Business Health Index is calculated as a weighted average: Financial Health (35%), Market Position (25%), Operational Stability (20%), and Funding Readiness (20%)."}
        </p>
      </div>
    </div>

    <!-- EXECUTIVE EXECUTIVE SUMMARY -->
    ${report.executiveSummary ? `
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        📝 Executive Summary & Strategic Blueprint (रणनीति सारांश)
      </h2>
      <div class="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <div class="bg-slate-50 border border-slate-100 rounded-xl p-4.5 print-card">
          <h4 class="font-bold text-slate-900 mb-1.5 text-xs sm:text-sm flex items-center space-x-1">
            <span>👔 Boardroom Strategic Briefing (मुख्य रणनीतिक रोडमैप)</span>
          </h4>
          <p class="font-sans whitespace-pre-line text-slate-600">${report.executiveSummary.boardroomReadyStrategicReport}</p>
        </div>
        
        <div class="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4.5 print-card">
          <h4 class="font-bold text-slate-900 mb-1.5 text-xs sm:text-sm flex items-center space-x-1">
            <span>⚡ Investor friendly Elevator Pitch (निवेशक पिच सारांश)</span>
          </h4>
          <p class="font-sans whitespace-pre-line text-slate-600">${report.executiveSummary.investorFriendlyPitchSummary}</p>
        </div>
      </div>
    </div>
    ` : ""}

    <!-- PAGE BREAK FOR CLEAN PRINTING -->
    <div class="page-break"></div>

    <!-- SWOSTRATEGIC PERSPECTIVE -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        🛡️ SWOT Strategic Analysis Card (ताकत, कमजोरी, अवसर एवं खतरे)
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div class="bg-emerald-50/45 border border-emerald-100 rounded-xl p-4 print-card">
          <h3 class="font-bold text-emerald-800 text-xs sm:text-sm mb-2 uppercase flex items-center space-x-1.5">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>💪 Strengths (मजबूती)</span>
          </h3>
          <ul class="space-y-1.5 text-xs text-slate-700 pl-3 list-disc">
            ${swot.strengths?.map(s => `<li>${s}</li>`).join("") || "<li>N/A</li>"}
          </ul>
        </div>

        <div class="bg-rose-50/45 border border-rose-100 rounded-xl p-4 print-card">
          <h3 class="font-bold text-rose-800 text-xs sm:text-sm mb-2 uppercase flex items-center space-x-1.5">
            <span class="h-2 w-2 rounded-full bg-rose-500"></span>
            <span>⚠️ Weaknesses (कमजोरियां)</span>
          </h3>
          <ul class="space-y-1.5 text-xs text-slate-700 pl-3 list-disc">
            ${swot.weaknesses?.map(w => `<li>${w}</li>`).join("") || "<li>N/A</li>"}
          </ul>
        </div>

        <div class="bg-indigo-50/45 border border-indigo-100 rounded-xl p-4 print-card">
          <h3 class="font-bold text-indigo-800 text-xs sm:text-sm mb-2 uppercase flex items-center space-x-1.5">
            <span class="h-2 w-2 rounded-full bg-indigo-500"></span>
            <span>🌟 Opportunities (अवसर)</span>
          </h3>
          <ul class="space-y-1.5 text-xs text-slate-700 pl-3 list-disc">
            ${swot.opportunities?.map(o => `<li>${o}</li>`).join("") || "<li>N/A</li>"}
          </ul>
        </div>

        <div class="bg-amber-50/45 border border-amber-100 rounded-xl p-4 print-card">
          <h3 class="font-bold text-amber-800 text-xs sm:text-sm mb-2 uppercase flex items-center space-x-1.5">
            <span class="h-2 w-2 rounded-full bg-amber-500"></span>
            <span>🛑 Threats (खतरे)</span>
          </h3>
          <ul class="space-y-1.5 text-xs text-slate-700 pl-3 list-disc">
            ${swot.threats?.map(t => `<li>${t}</li>`).join("") || "<li>N/A</li>"}
          </ul>
        </div>

      </div>
    </div>

    <!-- BOARDROOM PERSPECTIVE DIRECTIVES -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        👔 Boardroom Advisory Brief (बोर्डरूम सलाह और सी-सुइट योजना)
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Top Priorities -->
        ${brief.top3PrioritiesNext90Days?.length ? `
        <div class="md:col-span-2 bg-rose-50/30 border border-rose-100 rounded-xl p-4.5 print-card">
          <h3 class="text-xs sm:text-sm font-bold text-rose-900 uppercase tracking-wide mb-2.5">🎯 Top 3 Priorities Next 90 Days (आने वाले 90 दिनों की सर्वोच्च प्राथमिकताएं)</h3>
          <ol class="space-y-2 text-xs text-slate-705 list-decimal pl-4 font-semibold">
            ${brief.top3PrioritiesNext90Days.map(p => `<li>${p}</li>`).join("")}
          </ol>
        </div>
        ` : ""}

        <!-- Executive Segments -->
        ${brief.ceoRecommendations?.length ? `
        <div class="bg-slate-50 border border-slate-150 rounded-xl p-4 print-card">
          <h4 class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">CEO Strategic Recommendations</h4>
          <ul class="space-y-1.5 text-xs text-slate-650 list-disc pl-3">
            ${brief.ceoRecommendations.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
        ` : ""}

        ${brief.investorRecommendations?.length ? `
        <div class="bg-slate-50 border border-slate-150 rounded-xl p-4 print-card">
          <h4 class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Investor Readiness & Growth</h4>
          <ul class="space-y-1.5 text-xs text-slate-650 list-disc pl-3">
            ${brief.investorRecommendations.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
        ` : ""}

        ${brief.marketingRecommendations?.length ? `
        <div class="bg-slate-50 border border-slate-150 rounded-xl p-4 print-card">
          <h4 class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Marketing & Sales Channels</h4>
          <ul class="space-y-1.5 text-xs text-slate-650 list-disc pl-3">
            ${brief.marketingRecommendations.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
        ` : ""}

        ${brief.costReductionOpportunities?.length ? `
        <div class="bg-slate-50 border border-slate-150 rounded-xl p-4 print-card">
          <h4 class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Operational Cost Reduction</h4>
          <ul class="space-y-1.5 text-xs text-slate-650 list-disc pl-3">
            ${brief.costReductionOpportunities.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
        ` : ""}

        ${brief.hiringStrategy?.length ? `
        <div class="bg-slate-50 border border-slate-150 rounded-xl p-4 print-card">
          <h4 class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Hiring & Human Resources</h4>
          <ul class="space-y-1.5 text-xs text-slate-650 list-disc pl-3">
            ${brief.hiringStrategy.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
        ` : ""}

        ${brief.technologyAdoptionPlan?.length ? `
        <div class="bg-slate-50 border border-slate-150 rounded-xl p-4 print-card">
          <h4 class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Automated Tech Stack Plan</h4>
          <ul class="space-y-1.5 text-xs text-slate-650 list-disc pl-3">
            ${brief.technologyAdoptionPlan.map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
        ` : ""}

      </div>
    </div>

    <!-- PAGE BREAK FOR CLEAN PRINTING -->
    <div class="page-break"></div>

    <!-- 90-DAY DETAILED STEP ACTION PLAYBOOK -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        📅 90-Day Full Action Playbook (कार्रवाई कार्य योजना)
      </h2>
      
      <div class="space-y-6">
        
        <div>
          <span class="px-2.5 py-0.5 bg-indigo-100 text-indigo-850 font-bold font-mono text-[11px] rounded-md uppercase">
            Month 1 Playbook
          </span>
          <div class="grid grid-cols-1 gap-3 mt-3">
            ${report.actionPlan90Days.month1?.map(item => `
            <div class="border border-slate-150 bg-slate-50/50 rounded-lg p-3.5 print-card">
              <div class="flex justify-between items-center text-xs font-bold text-slate-800 mb-1">
                <span class="text-indigo-700 font-display font-semibold">${item.task}</span>
                <span class="text-slate-400 font-mono text-[10px]">${item.timeframe}</span>
              </div>
              <p class="text-xs text-slate-600 mt-1"><strong class="text-slate-500 font-medium">Objective:</strong> ${item.objective}</p>
            </div>
            `).join("") || `<p class="text-xs text-slate-500">N/A</p>`}
          </div>
        </div>

        <div>
          <span class="px-2.5 py-0.5 bg-blue-100 text-blue-850 font-bold font-mono text-[11px] rounded-md uppercase">
            Month 2 Playbook
          </span>
          <div class="grid grid-cols-1 gap-3 mt-3">
            ${report.actionPlan90Days.month2?.map(item => `
            <div class="border border-slate-150 bg-slate-50/50 rounded-lg p-3.5 print-card">
              <div class="flex justify-between items-center text-xs font-bold text-slate-800 mb-1">
                <span class="text-blue-700 font-display font-semibold">${item.task}</span>
                <span class="text-slate-400 font-mono text-[10px]">${item.timeframe}</span>
              </div>
              <p class="text-xs text-slate-600 mt-1"><strong class="text-slate-500 font-medium">Objective:</strong> ${item.objective}</p>
            </div>
            `).join("") || `<p class="text-xs text-slate-500">N/A</p>`}
          </div>
        </div>

        <div>
          <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-850 font-bold font-mono text-[11px] rounded-md uppercase">
            Month 3 Playbook
          </span>
          <div class="grid grid-cols-1 gap-3 mt-3">
            ${report.actionPlan90Days.month3?.map(item => `
            <div class="border border-slate-150 bg-slate-50/50 rounded-lg p-3.5 print-card">
              <div class="flex justify-between items-center text-xs font-bold text-slate-800 mb-1">
                <span class="text-emerald-700 font-display font-semibold">${item.task}</span>
                <span class="text-slate-400 font-mono text-[10px]">${item.timeframe}</span>
              </div>
              <p class="text-xs text-slate-600 mt-1"><strong class="text-slate-500 font-medium">Objective:</strong> ${item.objective}</p>
            </div>
            `).join("") || `<p class="text-xs text-slate-500">N/A</p>`}
          </div>
        </div>

      </div>
    </div>

    <!-- FINANCIAL & VALUATION INSIGHTS -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Business Valuation -->
        <div>
          <h2 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3.5 font-display flex items-center space-x-1">
            <span>💎 AI Business Valuation (मूल्यांकन अनुमान)</span>
          </h2>
          <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 print-card mb-4">
            <p class="text-[10px] uppercase font-bold text-slate-500">Estimated Value Range</p>
            <p class="text-xl sm:text-2xl font-black text-indigo-800 font-display mt-0.5">${valuation.estimatedValuationRange || (valuation as any).valuationRange || "Calculating..."}</p>
            <div class="flex items-center justify-between text-xs text-slate-600 mt-2.5 pt-2 border-t border-indigo-100/60">
              <span>Multiplier Applied</span>
              <span class="font-bold text-indigo-700">${valuation.multiplierAppliedValue} (${valuation.multiplierType})</span>
            </div>
          </div>
          
          <h4 class="text-[11px] uppercase font-bold text-slate-400 mb-1.5">Value Amplifying Drivers</h4>
          <ul class="text-xs text-slate-650 space-y-1 pl-3.5 list-disc leading-relaxed">
            ${valuation.valuationDrivers?.map(d => `<li>${d}</li>`).join("") || "<li>SaaS multiplier alignment</li>"}
          </ul>
        </div>

        <!-- ESG Scorecard -->
        <div>
          <h2 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3.5 font-display flex items-center space-x-1">
            <span>🌱 ESG Sustainability (पर्यावरण एवं सुस्थिरता)</span>
          </h2>
          <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-4 print-card mb-4 flex justify-between items-center">
            <div>
              <p class="text-[10.5px] uppercase font-bold text-slate-500">Sustainability Score</p>
              <p class="text-2xl font-extrabold text-emerald-800 mt-0.5">${esg.overallScore}/100</p>
            </div>
            <div class="text-[11.5px] text-emerald-850 bg-emerald-100/60 font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-200">
              Grade: High Standard
            </div>
          </div>
          
          <div class="space-y-1.5 text-xs text-slate-650">
            <div><strong class="text-slate-500 font-medium">Environmental Rating:</strong> ${esg.environmentalRating}</div>
            <div><strong class="text-slate-500 font-medium">Social Responsibility:</strong> ${esg.socialResponsibilityRating}</div>
            <div><strong class="text-slate-500 font-medium">Governance Standards:</strong> ${esg.governanceStandardsRating}</div>
          </div>
        </div>

      </div>
    </div>

    <!-- PAGE BREAK FOR CLEAN PRINTING -->
    <div class="page-break"></div>

    <!-- COMPETITOR DETAILED MAP -->
    ${competitorsList.length ? `
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        🔍 Competitor Reconnaissance Profile (प्रतिद्वंद्वी विश्लेषण)
      </h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-200 text-slate-400 font-bold bg-slate-50 print:bg-white print-card">
              <th class="py-2.5 px-3">Competitor</th>
              <th class="py-2.5 px-3">Positioning</th>
              <th class="py-2.5 px-3">Pricing System</th>
              <th class="py-2.5 px-3">Sourcing/Lead gen</th>
              <th class="py-2.5 px-3 text-right">Digital Score</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${competitorsList.map(comp => `
            <tr class="text-slate-705">
              <td class="py-3 px-3 font-semibold text-slate-900">${comp.name}</td>
              <td class="py-3 px-3 text-slate-600">${comp.marketPositioning}</td>
              <td class="py-3 px-3 text-slate-600">${comp.pricingStrategy}</td>
              <td class="py-3 px-3 text-slate-600 font-mono text-[11px]">${comp.customerAcquisitionMethod}</td>
              <td class="py-3 px-3 text-right font-bold text-indigo-600">${comp.digitalPresenceRating}</td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      ${tacticsList.length ? `
      <div class="mt-5.5 pt-4.5 border-t border-slate-105">
        <h4 class="text-[12px] font-extrabold text-slate-500 uppercase tracking-wide mb-2.5">💡 Exclusive Tactics to Outperform Rivals (प्रतिद्वंदी प्रभुत्व की रणनीतियां):</h4>
        <ul class="text-xs text-slate-700 pl-4 space-y-1.5 list-disc font-medium">
          ${tacticsList.map(t => `<li>${t}</li>`).join("")}
        </ul>
      </div>
      ` : ""}
    </div>
    ` : ""}

    <!-- REGULATORY matching & MSME specifics (INDIA PORTAL EXCLUSIVE) -->
    ${msme || schemeList.length ? `
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        🇮🇳 India Scheme Matching & Regulatory Portal (MSME / CGTMSE भारत सरकार योजनाएं)
      </h2>
      
      <!-- Matched Schemes Cards -->
      ${schemeList.length ? `
      <div class="space-y-3 mb-5.5">
        <h3 class="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Matched MSME / Mudra / CGTMSE Schemes</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          ${schemeList.map(scheme => `
          <div class="bg-slate-50/50 border border-slate-150 p-4 rounded-xl print-card">
            <h4 class="text-xs font-bold text-slate-900 leading-tight mb-1 flex items-center space-x-1 text-indigo-800">
              <span>🏛️ ${scheme.name}</span>
            </h4>
            <p class="text-[11px] text-slate-600 leading-relaxed mb-2 font-sans">${scheme.description}</p>
            <div class="space-y-1 text-[10px] text-slate-500 bg-white/60 p-2 rounded-lg border border-slate-100 print-card">
              <div><strong class="font-bold text-slate-600">Eligibility:</strong> ${scheme.eligibility}</div>
              <div><strong class="font-bold text-slate-600">Benefits Match:</strong> ${scheme.benefits}</div>
            </div>
          </div>
          `).join("")}
        </div>
      </div>
      ` : ""}

      <!-- MSME Specific details -->
      ${msme ? `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3.5 border-t border-slate-100">
        
        <!-- Udyam Registration Advisor -->
        ${msme.udyamRegistrationAdvisor ? `
        <div class="bg-slate-50/30 border border-slate-150 p-4 rounded-xl print-card">
          <h4 class="text-xs font-bold text-indigo-805 uppercase tracking-wide mb-2.5">📊 Udyam Registration Advisor</h4>
          <p class="text-xs text-slate-700 mb-2"><strong class="font-bold text-slate-500">Eligible Category:</strong> ${msme.udyamRegistrationAdvisor.eligibleCategory}</p>
          <div class="space-y-1 text-[10.5px] text-slate-605">
            <div><strong class="font-bold text-slate-450">Benefits:</strong> ${msme.udyamRegistrationAdvisor.benefitsCustom?.join(", ") || "Concessions & Subsidies"}</div>
            <div><strong class="font-bold text-slate-450">Required Documents:</strong> ${msme.udyamRegistrationAdvisor.documentsRequired?.join(", ") || "PAN, Aadhaar"}</div>
          </div>
        </div>
        ` : ""}

        <!-- Loan Eligibility Under CGTMSE -->
        ${msme.loanEligibilityEstimator ? `
        <div class="bg-indigo-50/20 border border-indigo-100 p-4 rounded-xl print-card">
          <h4 class="text-xs font-bold text-indigo-805 uppercase tracking-wide mb-2.5">💵 Collateral-Free & Credit Limits</h4>
          <p class="text-xs text-slate-700 mb-1.5"><strong class="font-bold text-slate-500">Max Eligible Range:</strong> <span class="font-black text-indigo-700 text-sm font-mono">${msme.loanEligibilityEstimator.maxEligibleAmount}</span></p>
          <div class="space-y-1 text-[10.5px] text-slate-605 leading-relaxed">
            <div><strong class="font-bold text-indigo-800">CGTMSE Cover:</strong> ${msme.loanEligibilityEstimator.eligibleCollateralFreeUnderCGTMSE ? "ELIGIBLE (कॉलैटरल-फ्री सीजीटीएमएसई के तहत पात्र)" : "Standard Collateral Required"}</div>
            <div><strong class="font-bold text-indigo-800">CIBIL Benchmark:</strong> ${msme.loanEligibilityEstimator.creditScoreRequiredEstimate}</div>
            <div><strong class="font-bold text-indigo-800">Interest Range:</strong> ${msme.loanEligibilityEstimator.suggestedInterestRateRange}</div>
          </div>
        </div>
        ` : ""}

        <!-- GST Readiness Advisor -->
        ${msme.gstReadinessChecker ? `
        <div class="bg-slate-50/30 border border-slate-150 p-4 rounded-xl print-card">
          <h4 class="text-xs font-bold text-indigo-805 uppercase tracking-wide mb-2.5">💼 GST Tax & Bookkeeping Readiness</h4>
          <p class="text-xs text-slate-705 mb-2"><strong class="font-bold text-slate-500">Registration Mandatory?:</strong> ${msme.gstReadinessChecker.mandatoryRegistrationRequired ? "YES (Required for current tier)" : "NO (Under statutory limit)"}</p>
          <div class="space-y-1 text-[10.5px] text-slate-605">
            <div><strong class="font-bold text-slate-450">Applicable Threshold:</strong> ${msme.gstReadinessChecker.turnoverThresholdApplicable}</div>
            <div><strong class="font-bold text-slate-450">GST Rates Estimate:</strong> ${msme.gstReadinessChecker.gstRatesApplicableEstimate}</div>
            <div><strong class="font-bold text-slate-450">Action Items:</strong> ${msme.gstReadinessChecker.actionItems?.join(". ") || "Standardize accounts"}</div>
          </div>
        </div>
        ` : ""}

        <!-- Rural Business opportunity -->
        ${msme.ruralBusinessOpportunityEngine ? `
        <div class="bg-emerald-50/20 border border-emerald-100 p-4 rounded-xl print-card">
          <h4 class="text-xs font-bold text-emerald-805 uppercase tracking-wide mb-2">🌾 Rural Growth Opportunity Engine</h4>
          <p class="text-xs text-slate-700 mb-1.5"><strong class="font-bold text-slate-500">Rural Fit Index:</strong> <span class="font-black text-emerald-700">${msme.ruralBusinessOpportunityEngine.ruralFitScore}/100</span></p>
          <div class="space-y-1 text-[10.5px] text-slate-605 font-medium">
            <div><strong class="font-bold text-emerald-800">Recommended Markets:</strong> ${msme.ruralBusinessOpportunityEngine.recommendedRuralMarketsText}</div>
            <div><strong class="font-bold text-emerald-800">Viable Sectors:</strong> ${msme.ruralBusinessOpportunityEngine.viableSectors?.join(", ") || "N/A"}</div>
          </div>
        </div>
        ` : ""}

      </div>
      ` : ""}

    </div>
    ` : ""}

    <!-- PAGE BREAK FOR CLEAN PRINTING -->
    <div class="page-break"></div>

    <!-- FUNDING CHANNELS MATCHED -->
    ${fundingChannels.length || legacyFunding.length ? `
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        💰 Global Funding Intelligence Platform (वैश्विक फंड और निवेश)
      </h2>
      <div class="space-y-3.5">
        ${fundingChannels.length ? fundingChannels.map(fund => `
        <div class="bg-slate-50 border border-slate-150 p-4 rounded-xl print-card">
          <div class="flex flex-wrap justify-between items-center text-xs font-bold text-indigo-900 mb-1.5 border-b border-slate-100 pb-1.5">
            <span class="text-sm font-semibold">${fund.category}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono ${
              fund.appropriatenessValue?.toLowerCase().includes("high") 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }">
              Fit Match: ${fund.appropriatenessValue}
            </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-2.5">
            <div class="sm:col-span-1">
              <span class="text-[9.5px] uppercase font-bold text-slate-420 block">Estimated Amount</span>
              <span class="text-sm font-black text-indigo-705 font-mono">${fund.estimatedMatchAmount}</span>
            </div>
            <div class="sm:col-span-2">
              <span class="text-[9.5px] uppercase font-bold text-slate-420 block">Applicable Fund Uses</span>
              <span class="text-xs text-slate-705 font-medium">${fund.applicability}</span>
            </div>
          </div>
          <p class="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans border-t border-slate-100/60 pt-2"><strong class="text-slate-500 font-medium">Expert Matching Reasoning:</strong> ${fund.reasoning}</p>
        </div>
        `).join("") : legacyFunding.map(fund => `
        <div class="bg-slate-50 border border-slate-150 p-4 rounded-xl print-card">
          <div class="flex flex-wrap justify-between items-center text-xs font-bold text-indigo-900 mb-1.5 pb-1.5 border-b border-indigo-100/20">
            <span class="text-sm font-semibold">${fund.type}</span>
            <span class="px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] rounded-full uppercase">
              Match Quality: ${fund.appropriateness}
            </span>
          </div>
          <div class="flex items-center space-x-1.5 my-2">
            <span class="text-xs font-bold text-slate-500">Estimated Match Capacity:</span>
            <span class="text-sm font-black text-indigo-700 font-mono">${fund.estimatedAmount}</span>
          </div>
          <p class="text-xs text-slate-650 font-sans leading-relaxed mt-2"><strong class="text-slate-500 font-medium">Matching Reasoning:</strong> ${fund.reasoning}</p>
        </div>
        `).join("")}
      </div>
    </div>
    ` : ""}

    <!-- DYNAMIC EXPENDITURE TRENDS AI AUTOMATION Compliance -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Industry Trends -->
        ${report.marketTrendScanner ? `
        <div>
          <h2 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3.5 font-display flex items-center space-x-1">
            <span>📡 Industry Trends & Risks (बाजार रुझान)</span>
          </h2>
          <div class="space-y-3.5 text-xs text-slate-650">
            <div>
              <span class="text-[9.5px] uppercase font-black text-indigo-700 block tracking-wider">Current Market Waves</span>
              <ul class="list-disc pl-3.5 mt-1 space-y-1 text-slate-700 font-sans">
                ${report.marketTrendScanner.currentIndustryTrends?.map(t => `<li>${t}</li>`).join("") || "<li>E-commerce transition</li>"}
              </ul>
            </div>
            <div>
              <span class="text-[9.5px] uppercase font-black text-indigo-700 block tracking-wider">Disruption Risk Warnings</span>
              <ul class="list-disc pl-3.5 mt-1 space-y-1 text-rose-700 font-semibold font-sans">
                ${report.marketTrendScanner.disruptionRisks?.map(d => `<li>${d}</li>`).join("") || "<li>Supplier dependencies</li>"}
              </ul>
            </div>
          </div>
        </div>
        ` : ""}

        <!-- Automation Tech Advisor -->
        ${report.automationAdvisor ? `
        <div>
          <h2 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3.5 font-display flex items-center space-x-1">
            <span>⚙️ Technology Stack & Automation</span>
          </h2>
          <div class="space-y-3.5 text-xs text-slate-650">
            <div>
              <span class="text-[9.5px] uppercase font-black text-indigo-700 block tracking-wider">AI Operations Assistants</span>
              <ul class="list-disc pl-3.5 mt-1 space-y-1 text-slate-700 font-sans">
                ${report.automationAdvisor.aiToolsRecommended?.map(tool => `<li>${tool}</li>`).join("") || "<li>Automated support agents</li>"}
              </ul>
            </div>
            <div>
              <span class="text-[9.5px] uppercase font-black text-indigo-700 block tracking-wider">Customer Care & Support</span>
              <p class="text-slate-600 mt-1 font-sans">${report.automationAdvisor.customerSupportAutomation?.join(". ") || "Standard CRM integrations"}</p>
            </div>
          </div>
        </div>
        ` : ""}

      </div>
    </div>

    <!-- STATUTORY AND COMPLIANCE MAP -->
    ${report.globalCompliance?.length ? `
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm print-card mb-6">
      <h2 class="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-display mb-4">
        ⚖️ Compliance & Statutory Jurisdictions (अनुपालन गाइड)
      </h2>
      <div class="space-y-4">
        ${report.globalCompliance.map(comp => `
        <div class="border border-slate-150 bg-slate-50/35 p-4 rounded-xl print-card">
          <h4 class="text-xs font-black text-slate-900 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg border-b border-slate-150 mb-3">${comp.regionOrScope} Jurisdiction</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span class="text-[9.5px] font-bold text-slate-400 uppercase block">Licensing Standards</span>
              <p class="text-slate-650 leading-relaxed font-sans mt-0.5">${comp.licensingGuidance}</p>
            </div>
            <div>
              <span class="text-[9.5px] font-bold text-slate-400 uppercase block">Taxation Guidance</span>
              <p class="text-slate-650 leading-relaxed font-sans mt-0.5">${comp.taxationGuidance}</p>
            </div>
            <div>
              <span class="text-[9.5px] font-bold text-slate-400 uppercase block">Data Privacy Protection</span>
              <p class="text-slate-650 leading-relaxed font-sans mt-0.5">${comp.dataPrivacyGuidance}</p>
            </div>
          </div>
        </div>
        `).join("")}
      </div>
    </div>
    ` : ""}

    <!-- FOOTER WITH HIGH FIDELITY NOTES AND VERSION CONTROLS -->
    <div class="pt-8 border-t border-slate-200 text-center text-[10px] text-slate-400 leading-relaxed mb-12">
      <p>This advisory report was assembled by the VC Room AI Boardroom Advisor platform with dedicated support for Devanagari script glyph scaling.</p>
      <p class="mt-1 font-mono uppercase tracking-wider">CONFIDENTIALITY GUARANTEED • FOR OFFICIAL INTERNAL AND INVESTOR PURPOSES ONLY</p>
    </div>

    <!-- PRINT-ONLY REPEATING FIXED FOOTER WITH BRANDING LOGO AND DYNAMIC PAGE NUMBERS -->
    <div class="print-footer-fixed px-6 select-none">
      <div class="flex items-center gap-1.5">
        <span class="p-1 px-1.5 bg-indigo-900 border border-slate-700 text-white rounded text-[8px] font-black tracking-tighter leading-none font-display">VE</span>
        <span class="text-[9px] font-extrabold text-slate-800 tracking-tight font-display">VAULT ADVISORY BOARDROOM ENGINE</span>
      </div>
      <div class="text-[8px] tracking-widest text-slate-400 font-sans uppercase hidden sm:block">CONFIDENTIAL REPORT • SYSTEM VERIFIED</div>
      <div class="page-number text-[9px] text-slate-600 font-bold font-mono"></div>
    </div>

  </div>

</body>
</html>`;
  };

  const handleDownloadHTMLReport = () => {
    if (!currentReport) return;
    try {
      const htmlContent = getCurrentReportPDFHTML(currentReport);
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // Clean up whitespace/specials in the business name
      const cleanBusinessName = (currentReport.input.businessName || "business")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "_");
      link.download = `${cleanBusinessName}_Intelligence_Report.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("HTML report compilation/download failed:", error);
    }
  };

  // Helper colors for health score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200 stroke-emerald-500 fill-emerald-500";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200 stroke-amber-500 fill-amber-500";
    return "text-rose-600 bg-rose-50 border-rose-200 stroke-rose-500 fill-rose-500";
  };

  const getScoreProgressBarColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getSeverityBadge = (severity: string) => {
    const s = severity.toLowerCase();
    if (s.includes("high") || s.includes("critical")) return "bg-rose-50 text-rose-600 border-rose-100 font-bold";
    if (s.includes("med")) return "bg-amber-50 text-amber-600 border-amber-100 font-bold";
    return "bg-emerald-50 text-emerald-600 border-emerald-100 font-bold";
  };

  const getImpactBadge = (impact: string) => {
    const imp = impact.toLowerCase();
    if (imp.includes("high")) return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (imp.includes("med")) return "bg-blue-50 text-blue-700 border-blue-100";
    return "bg-slate-50 text-slate-700 border-slate-100";
  };

  const getDifficultyBadge = (difficulty: string) => {
    const d = difficulty.toLowerCase();
    if (d.includes("hard")) return "bg-purple-50 text-purple-700 border-purple-100";
    if (d.includes("med")) return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-sky-50 text-sky-700 border-sky-100";
  };

  // Human, friendly progress steps
  const loadingSteps = [
    "Crunching financial performance & revenue capacity...",
    "Scanning regionally-specific government grant schemas...",
    "Assessing growth opportunities & industry market context...",
    "Compiling detailed risk profiles & your 90-day milestone roadmap..."
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Navigation Bar in Theme Style */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm z-10 sticky top-0 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight font-display flex items-center">
              GrowthAdvisor AI
            </h1>
            <span className="text-[10px] text-blue-600 font-bold tracking-wider uppercase flex items-center">
              <Sparkles className="h-2.5 w-2.5 mr-1" />
              Professional Suite
            </span>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-semibold text-slate-600">
          <button 
            type="button" 
            onClick={() => setActiveTab("dashboard")} 
            className={`transition-colors pb-1 ${activeTab === "dashboard" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-950"}`}
          >
            {t("businessAnalysis")}
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("opportunities")} 
            className={`transition-colors pb-1 ${activeTab === "opportunities" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-950"}`}
          >
            {t("growthOpportunities")}
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("funding")} 
            className={`transition-colors pb-1 ${activeTab === "funding" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-950"}`}
          >
            {t("recommendedFunding")}
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("risks")} 
            className={`transition-colors pb-1 ${activeTab === "risks" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-950"}`}
          >
            {t("riskAssessment")}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Selection Header */}
          <div className="flex items-center space-x-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-1 px-2.5 text-xs font-semibold text-slate-700 transition-all shadow-xs">
            <Languages className="h-4 w-4 text-blue-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-semibold cursor-pointer text-slate-700 py-0.5"
            >
              <option value="EN">English</option>
              <option value="HI">हिन्दी (HI)</option>
              <option value="HINGLISH">Hinglish (HI-EN)</option>
              <option value="MR">मराठी (MR)</option>
              <option value="TA">தமிழ் (TA)</option>
              <option value="TE">తెలుగు (TE)</option>
              <option value="BN">বাংলা (BN)</option>
              <option value="ES">Español (ES)</option>
              <option value="DE">Deutsch (DE)</option>
              <option value="FR">Français (FR)</option>
            </select>
          </div>

          {/* Currency Selection Header */}
          <div className="flex items-center space-x-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-1 px-2.5 text-xs font-semibold text-slate-700 transition-all shadow-xs">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as any)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-semibold cursor-pointer text-slate-700 py-0.5"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          <span className="hidden lg:flex text-xs font-semibold text-slate-500 bg-slate-100 rounded-full py-1.5 px-3 items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            AI Active
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Business Profile Form */}
        <aside className="lg:col-span-5 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5 print:hidden max-h-[820px] overflow-y-auto">
          
          {/* Quick-Fill Presets Card */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-150">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 mr-2" />
              Quick-Fill All-in-One Templates
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => applyPreset("Bakery")}
                className="py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-lg text-center text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-1"
              >
                🥖 Bakery (Product)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("SaaS")}
                className="py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-lg text-center text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-1"
              >
                💻 SaaS (Tech)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("Trades")}
                className="py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-lg text-center text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-1"
              >
                🔧 Trades (Services)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("Agency")}
                className="py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-lg text-center text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-1"
              >
                📈 Agency (Consulting)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Corporate Parameters
            </h2>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full font-bold border border-indigo-100 uppercase tracking-wide">All-In-One Enterprise</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Business / Enterprise Name
              </label>
              <input
                id="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="AstraTech Solutions"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="businessModel" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Business / Service Model Category
              </label>
              <select
                id="businessModel"
                value={formData.businessModel}
                onChange={(e) => handleInputChange("businessModel", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              >
                {BUSINESS_MODELS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="businessType" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Specific Industry
                </label>
                <input
                  id="businessType"
                  type="text"
                  required
                  list="industry-presets"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  placeholder="SaaS / Tech / Plumbing"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
                <datalist id="industry-presets">
                  {INDUSTRY_PRESETS.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </div>

              <div>
                <label htmlFor="businessAge" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Business Age
                </label>
                <select
                  id="businessAge"
                  value={formData.businessAge}
                  onChange={(e) => handleInputChange("businessAge", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                >
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="monthlyRevenue" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Monthly Rev ($)
                </label>
                <input
                  id="monthlyRevenue"
                  type="text"
                  value={formData.monthlyRevenue}
                  onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
                  placeholder="42000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Country Profile
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleInputChange("country", e.target.value);
                    if (e.target.value === "India") {
                      setSelectedCurrency("INR");
                    } else if (e.target.value === "UK") {
                      setSelectedCurrency("GBP");
                    } else {
                      setSelectedCurrency("USD");
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UAE">UAE</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Specific Location / State
              </label>
              <input
                id="location"
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Mumbai, MH or Austin, TX"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="fundingRequirement" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Target Funding Limit ($)
              </label>
              <input
                id="fundingRequirement"
                type="text"
                value={formData.fundingRequirement}
                onChange={(e) => handleInputChange("fundingRequirement", e.target.value)}
                placeholder="250000"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="targetGoal" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Primary Transformation Goal
              </label>
              <select
                id="targetGoal"
                value={formData.targetGoal}
                onChange={(e) => handleInputChange("targetGoal", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              >
                <option value="Scale operations">Scale operations & logistics</option>
                <option value="Customer acquisitions">Accelerate brand & customer acquisition</option>
                <option value="Product development">Expand product development / R&D</option>
                <option value="Build team">Recruit premium core staff</option>
                <option value="Optimize margins">Refine financial parameters & margins</option>
              </select>
            </div>

            {/* NEW: Competitor Details & Market Scope Sections */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Users className="h-4 w-4 text-indigo-500" />
                प्रतियोगी और बाजार स्कोप विवरण (Competitors & Market Scope)
              </h3>

              <div>
                <label htmlFor="businessOfferings" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  मुख्य उत्पाद या सेवाएँ (Main Products/Services)
                </label>
                <input
                  id="businessOfferings"
                  type="text"
                  value={formData.businessOfferings || ""}
                  onChange={(e) => handleInputChange("businessOfferings", e.target.value)}
                  placeholder="उदा. चाय, कॉफी और स्नैक्स (e.g. Chai, Coffee and Snacks)"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="marketScope" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    बाजार का दायरा (Target Market Scope)
                  </label>
                  <select
                    id="marketScope"
                    value={formData.marketScope || "Local"}
                    onChange={(e) => handleInputChange("marketScope", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  >
                    <option value="Local">स्थानीय / मोहल्ला (Local / Neighbourhood)</option>
                    <option value="City-wide">पूरा शहर (City-wide / Municipal)</option>
                    <option value="Regional">राज्य / क्षेत्र (Regional / State-wide)</option>
                    <option value="National">पूरा देश (National / Country-wide)</option>
                    <option value="Global">वैश्विक / अंतर्राष्ट्रीय (Global / International)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="firstMoverStatus" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    बाजार की स्थिति (First-Mover Innovation)
                  </label>
                  <select
                    id="firstMoverStatus"
                    value={formData.firstMoverStatus || "Moderate Competition"}
                    onChange={(e) => handleInputChange("firstMoverStatus", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  >
                    <option value="First-Mover">हम पहले हैं (First-Mover / Unique Concept)</option>
                    <option value="Moderate Competition">मध्यम कॉम्पिटिशन (Moderate Competition / Room to Disrupt)</option>
                    <option value="Established Market">उच्च कॉम्पिटिशन (Established Market / High Direct Competition)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="knownCompetitors" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  मुख्य प्रतियोगी (Known Competitors / Brands)
                </label>
                <input
                  id="knownCompetitors"
                  type="text"
                  value={formData.knownCompetitors || ""}
                  onChange={(e) => handleInputChange("knownCompetitors", e.target.value)}
                  placeholder="उदा. चाय सुट्टा बार, स्थानीय कैफे (Local Cafes, Chai Sutta Bar)"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="additionalDetails" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Additional Context / Scale Challenges
              </label>
              <textarea
                id="additionalDetails"
                rows={3}
                value={formData.additionalDetails}
                onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                placeholder="Scale operations to European markets and secure Series A funding limits..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all h-20 resize-none leading-relaxed"
              />
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-700 text-xs flex items-start space-x-2">
                <span className="font-bold">Error:</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Computing Model Data...</span>
                </>
              ) : (
                <>
                  <span>Generate AI Analysis</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* History Management block */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center mb-3">
              <History className="h-3.5 w-3.5 mr-2" />
              Prior Diagnostic Sheets ({savedReports.length})
            </h4>

            {savedReports.length === 0 ? (
              <div className="text-center py-5 border border-dashed border-slate-200 rounded-lg">
                <p className="text-[11px] text-slate-400 px-4">
                  Prior diagnostic records appear here. None compiled yet.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {savedReports.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => loadReport(report)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition text-xs flex items-center justify-between ${
                      currentReport?.id === report.id
                        ? "bg-blue-50/50 border-blue-200"
                        : "bg-slate-50/50 hover:bg-slate-50 border-slate-200/80"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="font-bold text-slate-800 text-xs block truncate">
                        {report.input.businessName}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {report.input.businessType} • {report.input.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-200/80 px-1.5 py-0.5 rounded">
                        {report.businessHealthScore}
                      </span>
                      <button
                        onClick={(e) => deleteReport(report.id, e)}
                        className="p-1 hover:bg-red-50 hover:text-red-600 rounded text-slate-400 transition"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Right Column: Dashboard Results / Dynamic Display */}
        <section className="lg:col-span-7 flex flex-col space-y-6">
          <AnimatePresence mode="wait">
            
            {/* Case 1: Live Loading Progress logs */}
            {isLoading && (
              <motion.div
                key="loading-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex-1 bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm"
              >
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse scale-120" />
                  <div className="h-14 w-14 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 animate-bounce">
                    <Cpu className="h-7 w-7" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">
                  Analyzing Business Metrics...
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                  Integrating dynamic revenue ratios, targeted funding scales, regional subsidy rules and material risk matrices.
                </p>

                <div className="w-full max-w-sm bg-slate-50 rounded-lg p-4 border border-slate-150 text-left space-y-2.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 mb-2 flex items-center justify-between">
                    <span>Diagnostic Pipeline</span>
                    <span className="text-blue-600 animate-pulse">Active</span>
                  </div>
                  {loadingSteps.map((stepMessage, idx) => {
                    const isPassed = loadingStep > idx;
                    const isActive = loadingStep === idx;
                    return (
                      <div
                        key={idx}
                        className={`text-xs font-mono flex items-start space-x-2 transition-all ${
                          isPassed ? "text-emerald-700 font-semibold" : isActive ? "text-blue-600 font-bold" : "text-slate-400/80"
                        }`}
                      >
                        <span className="shrink-0">
                          {isPassed ? "✓" : isActive ? "→" : "•"}
                        </span>
                        <span>{stepMessage}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Case 2: Placeholder state */}
            {!isLoading && !currentReport && (
              <motion.div
                key="empty-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between space-y-6"
              >
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-150">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-1.5">
                    Start Strategic Growth Diagnostic Report
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Instantly calculate health indexes, match regional funding criteria, and map out structured 90-day execution milestones. Use predefined corporate models for instantaneous testing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex items-start space-x-3 shadow-xs">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                      <TrendingUp className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Health Score Indicators</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Financial health stability, market position, and operational efficiency analysis.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex items-start space-x-3 shadow-xs">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                      <Coins className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Funding Matches</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Matched debt options, equity vectors, and localized research grants.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Case 3: Display results report */}
            {!isLoading && currentReport && (
              <motion.div
                key="report-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col space-y-6"
              >
                {/* Print-only Non-Editable Version Control Timestamp */}
                <div className="hidden print:block v-control-print">
                  Generated on: {new Date().toISOString().split('T')[0]} (BOARDROOM REPORT VERSION CONTROL)
                </div>
                
                {/* General Summary Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overflow-hidden print:border-none print:shadow-none">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">
                        <span className="py-0.5 px-2 bg-blue-50 border border-blue-100 rounded">
                          {currentReport.input.businessType}
                        </span>
                        {currentReport.input.businessModel && (
                          <>
                            <span>•</span>
                            <span className="py-0.5 px-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded">
                              {currentReport.input.businessModel.split(" (")[0]}
                            </span>
                          </>
                        )}
                        <span>•</span>
                        <span className="flex items-center text-slate-600">
                          <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                          {currentReport.input.location}
                        </span>
                      </div>
                      
                      <h2 className="font-display font-bold text-slate-800 text-xl tracking-tight">
                        {currentReport.input.businessName}
                      </h2>
                      
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center font-semibold">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Diagnosed on {currentReport.timestamp}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden">
                      {/* Language Selection Dynamic Control */}
                      <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg p-1 text-[11px] font-bold text-slate-700">
                        <Languages className="h-3.5 w-3.5 text-blue-500" />
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value as any)}
                          className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-semibold cursor-pointer text-slate-700"
                        >
                          <option value="EN">English</option>
                          <option value="HI">हिन्दी (HI)</option>
                          <option value="HINGLISH">Hinglish (HI-EN)</option>
                          <option value="MR">मराठी (MR)</option>
                          <option value="TA">தமிழ் (TA)</option>
                          <option value="TE">తెలుగు (TE)</option>
                          <option value="BN">বাংলা (BN)</option>
                          <option value="ES">Español (ES)</option>
                          <option value="DE">Deutsch (DE)</option>
                          <option value="FR">Français (FR)</option>
                        </select>
                      </div>

                      {/* Currency Selection Dynamic Control */}
                      <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg p-1 text-[11px] font-bold text-slate-700">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                        <select
                          value={selectedCurrency}
                          onChange={(e) => setSelectedCurrency(e.target.value as any)}
                          className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-semibold cursor-pointer text-slate-700"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="INR">INR (₹)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="JPY">JPY (¥)</option>
                        </select>
                      </div>

                      {/* Copy Action Trigger */}
                      <button
                        onClick={handleCopyReport}
                        className={`py-1.5 px-3 border rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs print:hidden ${
                          reportCopied 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" 
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                        title="Copy Summary Report"
                        id="btn-copy-report"
                      >
                        {reportCopied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600 animate-bounce" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-slate-500 hover:text-slate-700" />
                        )}
                        <span>{reportCopied ? "कॉपी हुआ!" : "कॉपी (Copy)"}</span>
                      </button>

                      {/* Text-To-Speech Narrator Trigger */}
                      <button
                        onClick={handleNarrate}
                        className={`py-1.5 px-3 border rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs print:hidden ${
                          isNarrating
                            ? "bg-indigo-50 border-indigo-200 text-indigo-700 animate-pulse font-bold"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                        title="Audio Narrative Advisor"
                        id="btn-narrate-report"
                      >
                        {isNarrating ? (
                          <VolumeX className="h-3.5 w-3.5 text-indigo-600" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5 text-slate-500" />
                        )}
                        <span>{isNarrating ? "रोकें (Stop)" : "कथावाचक (Narrator)"}</span>
                      </button>

                      {/* Export to PDF Advisor Tool */}
                      <button
                        onClick={() => setShowExportModal(true)}
                        className="py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] rounded-lg border border-red-600 cursor-pointer print:hidden"
                        title="Export High-Fidelity PDF Report"
                        id="btn-export-pdf-header"
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0 text-white animate-pulse" />
                        <span>पीडीएफ (Export PDF)</span>
                      </button>

                      {/* Like Action Feedback */}
                      <button
                        onClick={handleLike}
                        className={`p-1.5 border rounded-lg transition-all shadow-xs print:hidden ${
                          isReportLiked
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 scale-110"
                            : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        }`}
                        title="Like Report"
                        id="btn-like-report"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>

                      {/* Dislike Action Feedback */}
                      <button
                        onClick={handleDislike}
                        className={`p-1.5 border rounded-lg transition-all shadow-xs print:hidden ${
                          isReportDisliked
                            ? "bg-rose-50 border-rose-300 text-rose-700 scale-110"
                            : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        }`}
                        title="Dislike Report"
                        id="btn-dislike-report"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Theme Navigation style for dynamic Tab options */}
                <div className="bg-slate-100 p-1 rounded-lg flex overflow-x-auto print:hidden shrink-0 space-x-1 border border-slate-200">
                  {[
                    { id: "hub", label: t("executiveHub"), icon: Layers },
                    { id: "boardroom", label: t("ceoAdvisory"), icon: Briefcase },
                    { id: "india", label: t("indiaEnterprise"), icon: Map },
                    { id: "simulator", label: t("strategyForecasts"), icon: TrendingUp },
                    { id: "expansion", label: t("globalExpansion"), icon: Globe },
                    { id: "funding", label: t("capitalInvestor"), icon: Coins },
                    { id: "competition", label: t("competitiveEdge"), icon: Award },
                    { id: "risks", label: t("risksCompliance"), icon: ShieldAlert }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-3 rounded-md text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                          activeTab === tab.id
                            ? "bg-white text-blue-600 shadow-xs scale-102"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                        }`}
                      >
                        <TabIcon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub panels with modern custom aesthetic */}
                <div className="flex-1 bg-transparent">

                  {/* TAB 1: EXECUTIVE HUB */}
                  {activeTab === "hub" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Dimension Score Indexes */}
                      {currentReport.opportunityScores && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <Activity className="h-4 w-4 text-blue-600" />
                            Core Opportunity & Potential Score Indexes
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                            {/* Overall Score */}
                            <div className="bg-blue-900 text-white rounded-xl p-4 flex flex-col justify-between md:col-span-2">
                              <div>
                                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Overall Potential Score</span>
                                <div className="text-4xl font-extrabold mt-1">
                                  {currentReport.opportunityScores.overallPotentialScore}
                                  <span className="text-lg font-normal text-blue-300">/100</span>
                                </div>
                              </div>
                              <p className="text-[10px] text-blue-200 mt-2 leading-relaxed">
                                Computed potential based on addressable global market, operational readiness, and funding maturity indicators.
                              </p>
                            </div>

                            {/* Individual Dimensions */}
                            {[
                              { label: "Growth Index", val: currentReport.opportunityScores.growthScore, color: "bg-emerald-500 text-emerald-600 bg-emerald-50 border-emerald-100" },
                              { label: "Funding Readiness", val: currentReport.opportunityScores.fundingReadinessScore, color: "bg-blue-500 text-blue-600 bg-blue-50 border-blue-100" },
                              { label: "Digital Tech Maturity", val: currentReport.opportunityScores.digitalMaturityScore, color: "bg-indigo-500 text-indigo-600 bg-indigo-50 border-indigo-100" },
                              { label: "Global Scalability", val: currentReport.opportunityScores.globalExpansionScore, color: "bg-purple-500 text-purple-600 bg-purple-50 border-purple-100" }
                            ].map((scoreDim) => (
                              <div key={scoreDim.label} className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{scoreDim.label}</span>
                                <div className="mt-1 flex items-baseline justify-between">
                                  <span className="text-2xl font-bold text-slate-800">{scoreDim.val}</span>
                                  <span className="text-[9px] text-slate-400">/100</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                  <div className={`h-full rounded-full ${scoreDim.color.split(" ")[0]}`} style={{ width: `${scoreDim.val}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Executive BOARDROOM Summary */}
                      {currentReport.executiveSummary && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          {/* Boardroom Narrative */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600" />
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                              <FileText className="h-4 w-4 text-blue-600" />
                              Boardroom-Ready Strategic Report
                            </h3>
                            <p className="text-xs text-slate-700 leading-relaxed italic whitespace-pre-line bg-slate-50 p-4 rounded-lg border border-slate-150">
                              "{currentReport.executiveSummary.boardroomReadyStrategicReport}"
                            </p>
                          </div>

                          {/* Investor Pitch Summary */}
                          <div className="bg-slate-900 text-slate-100 rounded-xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-0 right-0 p-3 opacity-15">
                              <Sparkles className="h-10 w-10 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <Zap className="h-4 w-4 text-amber-400" />
                                Investor-Friendly Pitch Summary
                              </h3>
                              <p className="text-xs text-slate-350 leading-relaxed whitespace-pre-line bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                                {currentReport.executiveSummary.investorFriendlyPitchSummary}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* ESG Sustainability Score Card */}
                      {(() => {
                        const esg = currentReport.globalSaaSFeatures?.esgSustainabilityScore || {
                          overallScore: 82,
                          environmentalRating: "Eco-Optimized & Energy Efficient",
                          socialResponsibilityRating: "High-Standard Workforce Care",
                          governanceStandardsRating: "Ethical & Audit-Ready Integrity",
                          sustainabilityInitiatives: [
                            "Transition 80% of server resources to carbon-neutral data centers.",
                            "Provide digital-first operations reducing physical paper footprint by 95%.",
                            "Promote diversity and complete wage transparency policies across staff."
                          ]
                        };

                        return (
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                              {t("esgHeadline")}
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-5 rounded-xl flex flex-col justify-between">
                                <div>
                                  <span className="text-[10px] font-bold text-emerald-250 uppercase tracking-wider">Overall Sustainability Score</span>
                                  <div className="text-4xl font-extrabold mt-1">
                                    {esg.overallScore}
                                    <span className="text-lg font-normal text-emerald-300">/100</span>
                                  </div>
                                </div>
                                <p className="text-[10px] text-emerald-200 mt-2 leading-relaxed">
                                  Evaluated against corporate Environmental, Social, and Governance compliance benchmarks.
                                </p>
                              </div>

                              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t("esgEnv")}</span>
                                    <p className="text-xs font-bold text-slate-700 leading-snug">{esg.environmentalRating}</p>
                                  </div>
                                  <span className="text-[10px] text-emerald-600 font-bold mt-2">Class-A Verified</span>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t("esgSocial")}</span>
                                    <p className="text-xs font-bold text-slate-700 leading-snug">{esg.socialResponsibilityRating}</p>
                                  </div>
                                  <span className="text-[10px] text-teal-600 font-bold mt-2">Active Impact</span>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t("esgGov")}</span>
                                    <p className="text-xs font-bold text-slate-700 leading-snug">{esg.governanceStandardsRating}</p>
                                  </div>
                                  <span className="text-[10px] text-indigo-600 font-bold mt-2">Compliance Compliant</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Strategic Sustainability Initiatives</span>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {esg.sustainabilityInitiatives.map((init, idx) => (
                                  <div key={idx} className="bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/40 text-xs text-slate-600 flex items-start gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{init}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* SWOT Matrix */}
                      {currentReport.swotAnalysis && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                            Corporate SWOT Strategic Analysis
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Strengths */}
                            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 space-y-2">
                              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Strengths
                              </h4>
                              <ul className="space-y-1.5">
                                {currentReport.swotAnalysis.strengths.map((str, i) => (
                                  <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-1">
                                    <span className="text-emerald-600 text-[10px] font-bold select-none">•</span>
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Weaknesses */}
                            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 space-y-2">
                              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-amber-500" />
                                Weaknesses
                              </h4>
                              <ul className="space-y-1.5">
                                {currentReport.swotAnalysis.weaknesses.map((str, i) => (
                                  <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-1">
                                    <span className="text-amber-600 text-[10px] font-bold select-none">•</span>
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Opportunities */}
                            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-2">
                              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                                Opportunities
                              </h4>
                              <ul className="space-y-1.5">
                                {currentReport.swotAnalysis.opportunities.map((str, i) => (
                                  <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-1">
                                    <span className="text-blue-600 text-[10px] font-bold select-none">•</span>
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Threats */}
                            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4 space-y-2">
                              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-rose-500" />
                                Threats
                              </h4>
                              <ul className="space-y-1.5">
                                {currentReport.swotAnalysis.threats.map((str, i) => (
                                  <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex items-start gap-1">
                                    <span className="text-rose-600 text-[10px] font-bold select-none">•</span>
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Legacy Health metrics rows */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Circular Health Meter */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between items-center text-center">
                          <div className="flex justify-between items-center w-full mb-2">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">General Business Health Index</h3>
                            <span className="text-emerald-600 bg-emerald-50 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-emerald-100">
                              {currentReport.businessHealthScore >= 80 ? "Sustained" : "Advisory Priority"}
                            </span>
                          </div>
                          
                          <div className="relative h-28 w-28 flex items-center justify-center my-3">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="56" cy="56" r="48" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                stroke="#2563eb"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={301.6}
                                strokeDashoffset={301.6 - (301.6 * currentReport.businessHealthScore) / 100}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                              />
                            </svg>
                            <span className="absolute text-3xl font-bold text-slate-800">{currentReport.businessHealthScore}%</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm">
                            Aggregate metrics summarizing baseline revenue velocity, market positioning, digital technology integration, and international regulatory readiness score.
                          </p>
                        </div>

                        {/* Operational indicator list */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                            Operational Health Indicators Breakdown
                          </h3>
                          <div className="space-y-4">
                            {[
                              { label: "Financial Health Stability", val: currentReport.healthScoreBreakdown.financialHealth, desc: "Revenue durability & run rate safety" },
                              { label: "Market Position Valuation", val: currentReport.healthScoreBreakdown.marketPosition, desc: "Growth demand matching thresholds" },
                              { label: "Operational Stability Capacity", val: currentReport.healthScoreBreakdown.operationalStability, desc: "Team & materials organization maturity" },
                              { label: "Funding Absorption Margin", val: currentReport.healthScoreBreakdown.fundingReadiness, desc: "Capital absorption efficiency quotient" }
                            ].map((item) => (
                              <div key={item.label} className="space-y-1">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-semibold text-slate-700">{item.label}</span>
                                  <span className="font-bold text-slate-800">{item.val}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-blue-500"
                                    style={{ width: `${item.val}%` }}
                                  />
                                </div>
                                <p className="text-[10px] text-slate-400">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SCORES TRANSPARENCY MODULE */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 mt-5">
                        <div className="flex items-center gap-2">
                          <span className="p-1 px-2.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider">
                            {selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? "स्कोर पारदर्शिता" : "Score Transparency"}
                          </span>
                          <h4 className="text-sm font-bold text-slate-800">
                            {selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? "व्यावसायिक स्वास्थ्य सूचकांक विश्लेषण" : "Business Health Index Components"}
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {[
                            { name: selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? "वित्तीय स्वास्थ्य" : "Financial Health Score", score: currentReport.healthScoreBreakdown.financialHealth, weight: "35%", color: "bg-emerald-500" },
                            { name: selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? "बाजार स्थिति" : "Market Position Score", score: currentReport.healthScoreBreakdown.marketPosition, weight: "25%", color: "bg-blue-500" },
                            { name: selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? "परिचालन स्थिरता" : "Operational Stability Score", score: currentReport.healthScoreBreakdown.operationalStability, weight: "20%", color: "bg-purple-500" },
                            { name: selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? "फंडिंग तत्परता" : "Funding Readiness Score", score: currentReport.healthScoreBreakdown.fundingReadiness, weight: "20%", color: "bg-amber-500" },
                          ].map((s) => (
                            <div key={s.name} className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between shadow-xxs">
                              <div>
                                <p className="text-[11px] text-slate-700 font-bold tracking-tight">{s.name}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  {selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? `भार: ${s.weight}` : `Weight: ${s.weight}`}
                                </p>
                              </div>
                              <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-50">
                                <span className={`h-2 w-2 rounded-full ${s.color}`}></span>
                                <span className="text-base font-black text-slate-800">{s.score}/100</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-xs text-blue-900 space-y-1">
                          <span className="font-bold block text-blue-950">
                            {selectedLanguage === "HI" || selectedLanguage === "HINGLISH" ? "सूचकांक की गणना कैसे की गई? (How was this calculated?)" : "Calculation Methodology & Weighted Formulation:"}
                          </span>
                          <p className="leading-relaxed font-sans text-slate-700">
                            {currentReport.healthScoreBreakdown.scoreCalculationExplanation || currentReport.scoreTransparencyExplanation || (selectedLanguage === "HI" || selectedLanguage === "HINGLISH" 
                              ? "व्यावसायिक स्वास्थ्य सूचकांक का आकलन वित्तीय स्वास्थ्य (35%), बाजार स्थिति (25%), परिचालन स्थिरता (20%) और फंडिंग तत्परता (20%) के भारित औसत (Weighted Average) के रूप में किया गया है।" 
                              : "The Business Health Index is calculated as a weighted average: Financial Health (35%), Market Position (25%), Operational Stability (20%), and Funding Readiness (20%)."
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB: CEO & BOARDROOM ADVISOR PERSPECTIVES */}
                  {activeTab === "boardroom" && (() => {
                    const brief = currentReport.boardroomBrief || {
                      ceoRecommendations: [
                        `Formally transition ${currentReport.input.businessName || "the business"} to a brand-exclusive positioning within the ${currentReport.input.businessType || "services"} industry.`,
                        `Design and institute monthly OKRs focusing purely on high-margin customer cohorts.`,
                        `Establish a formal management dashboard tracking customer lifetime value (LTV) to acquisition cost (CAC) monthly.`
                      ],
                      investorRecommendations: [
                        `Optimize the recurring/subscription component of your pricing models to appeal to valuation multipliers.`,
                        `Document operational processes and playbooks to demonstrate repeatable scalability.`,
                        `Consolidate unit economics showing a path to consistent 45%+ gross operating margins.`
                      ],
                      marketingRecommendations: [
                        `Launch a localized SEO campaign using target search queries relevant to the sector.`,
                        `Develop a partner referral program offering 10% commission or value incentive.`,
                        `Execute 3 high-authority educational case studies or service showcase videos.`
                      ],
                      costReductionOpportunities: [
                        `Review software licenses and consolidate duplicate cloud solutions/SaaS tools.`,
                        `Renegotiate contractor flat-rates or vendor wholesale supply agreements.`,
                        `Audit service delivery or inventory pipelines to reduce leakage or waste by 12-15% immediately.`
                      ],
                      hiringStrategy: [
                        `Prioritize onboarding a high-agency operations manager to offload general administrative overhead.`,
                        `Onboard performance-incentivized sales development reps to scale pipeline dynamically.`,
                        `Establish clear technical/process playbooks for instant onboarding in under 10 business days.`
                      ],
                      expansionStrategy: [
                        `Explore adjacent regions, online vertical channels, or physical service territories.`,
                        `Investigate setup/incorporation criteria for secondary high-potential growth regions.`,
                        `Form strategic partnerships with non-competing firms catering to similar enterprise targets.`
                      ],
                      technologyAdoptionPlan: [
                        `Integrate a robust CRM system to manage prospects, inquiries and client workflows automatically.`,
                        `Deploy low-code workflows (Zapier/Make) to connect forms, alerts, and customer databases.`,
                        `Deploy customized AI voice/text agents to handle 80% of tier-1 support queries.`
                      ],
                      top3PrioritiesNext90Days: [
                        `Re-engage dormant accounts with custom premium product/service bundles.`,
                        `Audit existing cost centers and software licenses to maximize unit operating margins.`,
                        `Harden localized client acquisition channels (SEO, landing page optimizations).`
                      ]
                    };

                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        {/* Interactive Boardroom Header banner */}
                        <div className="bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden shadow-xs">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Briefcase className="h-24 w-24 text-white" />
                          </div>
                          <div className="relative z-10 space-y-2">
                            <div className="inline-flex items-center space-x-1.5 bg-blue-500/20 text-blue-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-blue-500/30">
                              <Sparkles className="h-3 w-3 text-amber-300" />
                              <span>VC & C-Suites Advisory Boardroom</span>
                            </div>
                            <h2 className="text-xl font-extrabold tracking-tight">World-Class Boardroom & Strategic Growth Advisor Briefing</h2>
                            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                              Actively simulating perspectives of a CEO, General Management Consultant, Lead Investor, Marketing Champion, Finance Chief, HR Strategist, Scaling Champion, and CTO. Mapped with direct, practical, and highly data-driven frameworks.
                            </p>
                          </div>
                        </div>

                        {/* Top 3 Priorities for Next 90 Days - Large Elegant Feature */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl border border-amber-200 p-5 shadow-xs">
                          <div className="flex items-center justify-between pb-3 border-b border-amber-200/60 mb-4">
                            <h3 className="text-[11px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-2">
                              <Target className="h-4 w-4 text-amber-600" />
                              Critical Top 3 Strategic Priorities (Next 90 Days)
                            </h3>
                            <span className="text-[10px] font-bold bg-amber-200/60 text-amber-900 px-2.5 py-0.5 rounded-full">Immediate Action Needed</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {brief.top3PrioritiesNext90Days.map((priority, id) => (
                              <div key={id} className="bg-white/95 backdrop-blur-xs border border-amber-100 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-xs">
                                <div className="absolute top-0 right-0 p-3 text-amber-500/20 font-mono text-3xl font-black select-none">
                                  0{id + 1}
                                </div>
                                <div className="space-y-2">
                                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-amber-100 text-amber-800 text-xs font-black">
                                    {id + 1}
                                  </span>
                                  <p className="text-xs font-bold text-slate-800 leading-snug">{priority.split(":")[0] || "Priority Metric"}</p>
                                  <p className="text-[11px] text-slate-600 leading-relaxed">
                                    {priority.split(":")[1] || priority}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bento Grid layout representing the remaining 7 pillars */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {/* Column 1: CEO Strategic Recommendations */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                <Building2 className="h-4 w-4 text-blue-600" />
                                CEO Recommendations
                              </h4>
                              <ul className="space-y-3">
                                {brief.ceoRecommendations.map((rec, id) => (
                                  <li key={id} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Column 2: VC Investor recommendations */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                <Coins className="h-4 w-4 text-emerald-600" />
                                Investor Recommendations
                              </h4>
                              <ul className="space-y-3">
                                {brief.investorRecommendations.map((rec, id) => (
                                  <li key={id} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Column 3: Marketing Recommendations */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                                Marketing Recommendations
                              </h4>
                              <ul className="space-y-3">
                                {brief.marketingRecommendations.map((rec, id) => (
                                  <li key={id} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Column 4: Cost Reductions */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                <Scale className="h-4 w-4 text-orange-600" />
                                Cost Reductions & Margin Securing
                              </h4>
                              <ul className="space-y-3">
                                {brief.costReductionOpportunities.map((rec, id) => (
                                  <li key={id} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Column 5: Hiring Strategy */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                <Award className="h-4 w-4 text-indigo-600" />
                                Talent Booking & Hiring Strategy
                              </h4>
                              <ul className="space-y-3">
                                {brief.hiringStrategy.map((rec, id) => (
                                  <li key={id} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Column 6: Expansion Strategy */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                <Globe className="h-4 w-4 text-sky-600" />
                                Expansion Strategy Mapped
                              </h4>
                              <ul className="space-y-3">
                                {brief.expansionStrategy.map((rec, id) => (
                                  <li key={id} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Column 7: Technology Adoption Plan */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-3">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                <Cpu className="h-4 w-4 text-teal-600" />
                                Enterprise Technology & Digital Core Adoption Plan
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {brief.technologyAdoptionPlan.map((rec, id) => (
                                  <div key={id} className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2">
                                    <span className="font-mono font-bold text-teal-600 text-xs mt-0.5">0{id + 1}.</span>
                                    <span>{rec}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {/* TAB: INDIA BIZ SUITE */}
                  {activeTab === "india" && (() => {
                    const specifics = currentReport.indiaMarketSpecifics || {
                      udyamRegistrationAdvisor: {
                        eligibleCategory: "Micro Enterprise (Estimated)",
                        documentsRequired: ["Aadhaar Card of Promoter", "PAN Card of Organization", "GSTIN (Mandatory for some categories)", "Bank Account details"],
                        processSteps: [
                          "Visit official portal: udyamregistration.gov.in",
                          "Enter Aadhaar Number and OTP validation",
                          "Complete form with PAN, GST details, plant investment values, and employment size",
                          "Generate official, lifetime-valid Udyam Registration Certificate"
                        ],
                        benefitsCustom: [
                          "Priority Sector Lending (PSL) benefits (lower interest rates on bank credit)",
                          "Inclusion in CGTMSE security/collateral-free bank loan coverage",
                          "Protection/legal defense against delayed payments (MSME Samadhaan portal)",
                          "Direct concessions on electricity tariffs and trademark filing fees"
                        ]
                      },
                      gstReadinessChecker: {
                        turnoverThresholdApplicable: "₹40 Lakhs (Goods) / ₹20 Lakhs (Services)",
                        mandatoryRegistrationRequired: true,
                        readinessScore: 85,
                        actionItems: [
                          "Apply for GSTIN on gst.gov.in portal",
                          "Acquire HSN codes for products or SAC codes for service offerings",
                          "Configure point of sale billing software to separate CGST, SGST, IGST tax lines",
                          "File GSTR-1 and GSTR-3B monthly/quarterly to avoid penalties"
                        ],
                        gstRatesApplicableEstimate: "18% GST (Standard Services rate)"
                      },
                      loanEligibilityEstimator: {
                        maxEligibleAmount: "₹2,00,00,000 (₹2 Crores)",
                        suggestedInterestRateRange: "8.55% - 11.25% p.a.",
                        creditScoreRequiredEstimate: "700+",
                        eligibleCollateralFreeUnderCGTMSE: true,
                        recommendedBanksAndNBFCs: ["State Bank of India (SBI)", "HDFC Bank Ltd.", "SIDBI (Small Industries Development Bank of India)", "ICICI Bank"]
                      },
                      franchiseExpansionPlanner: {
                        franchisabilityScore: 78,
                        suggestedModel: "FOFO (Franchise Owned Franchise Operated)",
                        initialSetupCostEstimate: "₹15 Lakhs - ₹25 Lakhs per unit location",
                        franchiseFeeRange: "₹3 Lakhs - ₹5 Lakhs",
                        keyExpansionCities: ["Mumbai", "Bengaluru", "Delhi NCR", "Pune", "Hyderabad"]
                      },
                      districtSubsidyFinder: {
                        stateSubsidySchemeName: "PMEGP (Prime Minister's Employment Generation Programme)",
                        applicableDistricts: ["All Districts (Special subsidy allocation for rural/semi-urban locations)"],
                        subsidyPercentageOrAmount: "15% to 35% Capital Subsidy depending on demographic background",
                        applicationProcedure: "Submit project report online via KVIC portal (kviconline.gov.in) with business plan details."
                      },
                      ruralBusinessOpportunityEngine: {
                        ruralFitScore: 82,
                        recommendedRuralMarketsText: "Target high-density tier-3 towns and rural clusters ('Gram Panchayats') utilizing local dealer agents.",
                        viableSectors: ["Agri-tech solutions", "Micro-retail & distribution hubs", "Localized on-demand services", "Local logistics networks"],
                        ruralLogisticsMitigations: [
                          "Appoint village entrepreneurial partners ('VLEs') to lower final mile acquisition cost",
                          "Partner with regional postal/trucking operators for bulk consolidation"
                        ]
                      }
                    };

                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        {/* India Mode Banner */}
                        <div className="bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden shadow-xs">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Map className="h-40 w-40 text-blue-400 rotate-12" />
                          </div>
                          <div className="relative z-10">
                            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-500/30">
                              Bharat Udyog Suite
                            </span>
                            <h2 className="text-xl sm:text-2xl font-bold mt-2.5">
                              India Mode Specialist Advisor
                            </h2>
                            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                              Statutory alignment, government credit lines, MSME benefits, and regional scale multipliers for your enterprise.
                            </p>
                          </div>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                          {/* Item 1: GST Readiness */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                  GST Compliance
                                </span>
                                <Scale className="h-5 w-5 text-blue-500" />
                              </div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                                GST Readiness Checker
                              </h3>
                              <div className="space-y-3 my-4">
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold">Turnover Threshold</p>
                                  <p className="text-xs font-bold text-slate-700">{specifics.gstReadinessChecker.turnoverThresholdApplicable}</p>
                                </div>
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                  <p className="text-[10px] text-slate-400 uppercase font-bold">Estimated Rate</p>
                                  <p className="text-xs font-bold text-slate-700">{specifics.gstReadinessChecker.gstRatesApplicableEstimate}</p>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                  <span className="text-[10px] text-slate-400 uppercase font-bold">Mandatory Registration</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${specifics.gstReadinessChecker.mandatoryRegistrationRequired ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                    {specifics.gstReadinessChecker.mandatoryRegistrationRequired ? 'REQUIRED' : 'NOT REQUIRED'}
                                  </span>
                                </div>
                              </div>
                              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Statutory Actions Checklists:</p>
                              <ul className="space-y-1.5">
                                {specifics.gstReadinessChecker.actionItems.map((item, index) => (
                                  <li key={index} className="text-xs text-slate-600 flex items-start gap-1.5">
                                    <CheckSquare className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                              <span className="text-xs text-slate-400">Readiness Score</span>
                              <span className="text-sm font-bold text-blue-600">{specifics.gstReadinessChecker.readinessScore}%</span>
                            </div>
                          </div>

                          {/* Item 2: Udyam MSME Registry */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="bg-teal-50 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                  MSME Certification
                                </span>
                                <Building2 className="h-5 w-5 text-teal-500" />
                              </div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                                Udyam Registration Advisor
                              </h3>
                              <p className="text-[11px] text-slate-500 mb-3">
                                Eligible Level: <span className="font-bold text-teal-600">{specifics.udyamRegistrationAdvisor.eligibleCategory}</span>
                              </p>
                              
                              <div className="mb-4">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Udyam Registration Benefits:</p>
                                <ul className="space-y-1.5">
                                  {specifics.udyamRegistrationAdvisor.benefitsCustom.map((benefit, idx) => (
                                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5 bg-teal-50/40 p-2 rounded-lg border border-teal-100/40">
                                      <Zap className="h-3.5 w-3.5 text-teal-600 mt-0.5 shrink-0" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Documents Required:</p>
                                <div className="flex flex-wrap gap-1.5 font-sans">
                                  {specifics.udyamRegistrationAdvisor.documentsRequired.map((doc, idx) => (
                                    <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                      {doc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100">
                              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Registration Steps:</p>
                              <div className="space-y-1">
                                {specifics.udyamRegistrationAdvisor.processSteps.map((step, idx) => (
                                  <div key={idx} className="text-xs text-slate-600 flex gap-1.5 items-start">
                                    <span className="font-mono text-teal-500 font-bold">{idx + 1}.</span>
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Item 3: Government Loan Eligibility */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                  Mudra / CGTMSE
                                </span>
                                <Coins className="h-5 w-5 text-emerald-500" />
                              </div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                                Collateral-Free Loans Estimator
                              </h3>
                              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 my-4 text-center">
                                <p className="text-[10px] uppercase font-bold text-slate-400">Max Eligible Funding Limit</p>
                                <p className="text-xl font-black text-emerald-600 tracking-tight">{specifics.loanEligibilityEstimator.maxEligibleAmount}</p>
                                {specifics.loanEligibilityEstimator.eligibleCollateralFreeUnderCGTMSE && (
                                  <span className="inline-block mt-2 text-[9px] font-black tracking-widest bg-emerald-600 text-white uppercase px-2.5 py-0.5 rounded-full animate-bounce">
                                    ✓ CGTMSE COVER AVAILABLE
                                  </span>
                                )}
                              </div>
                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-xs py-1.5 border-b border-slate-100">
                                  <span className="text-slate-400 font-medium">Interest Rate (Est)</span>
                                  <span className="font-bold text-slate-700">{specifics.loanEligibilityEstimator.suggestedInterestRateRange}</span>
                                </div>
                                <div className="flex justify-between text-xs py-1.5 border-b border-slate-100">
                                  <span className="text-slate-400 font-medium">Required CIBIL Estimator</span>
                                  <span className="font-bold text-slate-700">{specifics.loanEligibilityEstimator.creditScoreRequiredEstimate}</span>
                                </div>
                              </div>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended Banks/Institutional Partners:</p>
                              <div className="space-y-1.5 font-sans">
                                {specifics.loanEligibilityEstimator.recommendedBanksAndNBFCs.map((bank, index) => (
                                  <div key={index} className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center justify-between">
                                    <span className="font-semibold">{bank}</span>
                                    <ArrowRight className="h-3 w-3 text-emerald-500" />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                              <p className="text-[10px] text-slate-400 font-medium">Mudra Scheme cover limit up to ₹10 Lakhs, CGTMSE covers up to ₹5 Crores.</p>
                            </div>
                          </div>

                          {/* Item 4: Franchise Expansion Planner */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                  Scale Model
                                </span>
                                <Award className="h-5 w-5 text-amber-500" />
                              </div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                                Franchise Planner & Scale
                              </h3>
                              <p className="text-[11px] text-slate-500 mb-2">
                                Recommended Model: <span className="font-bold text-amber-600 uppercase">{specifics.franchiseExpansionPlanner.suggestedModel}</span>
                              </p>
                              <div className="space-y-3.5 my-4">
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex justify-between items-center text-xs">
                                  <span className="text-slate-400 font-medium">Capex Per Unit</span>
                                  <span className="font-bold text-slate-700">{specifics.franchiseExpansionPlanner.initialSetupCostEstimate}</span>
                                </div>
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex justify-between items-center text-xs">
                                  <span className="text-slate-400 font-medium">Franchise Fee</span>
                                  <span className="font-bold text-slate-700">{specifics.franchiseExpansionPlanner.franchiseFeeRange}</span>
                                </div>
                              </div>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Indian Expansion Cities:</p>
                              <div className="flex flex-wrap gap-2">
                                {specifics.franchiseExpansionPlanner.keyExpansionCities.map((city, id) => (
                                  <span key={id} className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100 px-2.5 py-1 rounded-lg">
                                    {city}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                              <span className="text-xs text-slate-400">Franchisability Potential</span>
                              <span className="text-sm font-bold text-amber-600">{specifics.franchiseExpansionPlanner.franchisabilityScore}/100</span>
                            </div>
                          </div>

                          {/* Item 5: District-wise subsidies */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                  District Schemes
                                </span>
                                <MapPin className="h-5 w-5 text-indigo-500" />
                              </div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                                District-wise Govt Subsidy Finder
                              </h3>
                              <p className="text-xs font-bold text-indigo-600 mt-2">
                                {specifics.districtSubsidyFinder.stateSubsidySchemeName}
                              </p>
                              <div className="my-3 p-3 bg-indigo-50/40 rounded-lg border border-indigo-100/40 text-xs">
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Incentive Ratio</p>
                                <p className="font-bold text-indigo-950 mt-1">{specifics.districtSubsidyFinder.subsidyPercentageOrAmount}</p>
                              </div>
                              <div className="my-3 text-xs">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Applicable Districts</p>
                                <div className="space-y-1 max-h-16 overflow-y-auto">
                                  {specifics.districtSubsidyFinder.applicableDistricts.map((dist, id) => (
                                    <div key={id} className="text-slate-600 bg-slate-50 rounded px-2 py-1 border border-slate-100 text-[11px] font-medium">
                                      {dist}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100">
                              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Application Procedure:</p>
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {specifics.districtSubsidyFinder.applicationProcedure}
                              </p>
                            </div>
                          </div>

                          {/* Item 6: Rural markets & general business opportunity finder */}
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className="bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                  Grassroots Focus
                                </span>
                                <Globe className="h-5 w-5 text-rose-500" />
                              </div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                                Rural Business Opportunity Engine
                              </h3>
                              <div className="my-3">
                                <p className="text-xs text-slate-600 italic">
                                  "{specifics.ruralBusinessOpportunityEngine.recommendedRuralMarketsText}"
                                </p>
                              </div>
                              <div className="my-3 text-xs">
                                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Viable Indian Rural Sectors:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {specifics.ruralBusinessOpportunityEngine.viableSectors.map((sector, id) => (
                                    <span key={id} className="text-[10px] bg-rose-50 border border-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-lg">
                                      {sector}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1.5">Mitigation for Logistical Bottlenecks:</p>
                              <div className="space-y-1.5">
                                {specifics.ruralBusinessOpportunityEngine.ruralLogisticsMitigations.map((strat, id) => (
                                  <div key={id} className="text-xs text-slate-600 flex items-start gap-1.5">
                                    <span className="font-bold text-rose-500">•</span>
                                    <span>{strat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    );
                  })()}

                  {/* TAB 2: STRATEGY & FORECASTS */}
                  {activeTab === "simulator" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* AI Revenue Growth Simulator */}
                      {currentReport.revenueSimulator && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 gap-2">
                            <div>
                              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <BarChart3 className="h-4 w-4 text-indigo-600" />
                                AI-Simulated Revenue Growth & Projections
                              </h3>
                              <p className="text-[11px] text-slate-400 mt-0.5">Custom computed revenue projection timeline models.</p>
                            </div>
                            <div className="bg-slate-100 px-3.5 py-1 rounded-lg text-xs font-bold text-slate-700 flex items-center shrink-0">
                              Baseline: {currentReport.revenueSimulator.currentMonthlyBaseline || currentReport.input.monthlyRevenue} / month
                            </div>
                          </div>

                          {/* Interactive Vector SVG line chart representing future growth curve */}
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Simulated Multi-Month Revenue Velocity Curve</span>
                            <div className="w-full max-w-lg h-36 relative mt-2">
                              {/* Custom SVG Drawing Line */}
                              <svg viewBox="0 0 400 120" className="w-full h-full">
                                <defs>
                                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                {/* Grid Lines */}
                                <line x1="50" y1="10" x2="350" y2="10" stroke="#e2e8f0" strokeDasharray="3" />
                                <line x1="50" y1="50" x2="350" y2="50" stroke="#e2e8f0" strokeDasharray="3" />
                                <line x1="50" y1="90" x2="350" y2="90" stroke="#e2e8f0" strokeDasharray="3" />

                                {/* Area Fill */}
                                <path d="M 50 110 L 50 90 Q 150 70, 200 45 T 350 15 L 350 110 Z" fill="url(#chartGrad)" />

                                {/* Projection line plot */}
                                <path d="M 50 90 Q 150 70, 200 45 T 350 15" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

                                {/* Data Dots */}
                                <circle cx="50" cy="90" r="4.5" fill="#1e3a8a" stroke="#ffffff" strokeWidth="1.5" />
                                <circle cx="150" cy="70" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                                <circle cx="250" cy="45" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                                <circle cx="350" cy="15" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />

                                {/* Texts */}
                                <text x="50" y="112" fontFamily="sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Baseline</text>
                                <text x="150" y="112" fontFamily="sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">3 Month</text>
                                <text x="250" y="112" fontFamily="sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">6 Month</text>
                                <text x="350" y="112" fontFamily="sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">12 Month</text>
                              </svg>
                            </div>
                          </div>

                          {/* Forecast cards */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {currentReport.revenueSimulator.projections.map((proj, idx) => (
                              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between transition-all hover:border-slate-300">
                                <div>
                                  <div className="flex justify-between items-center mb-1 bg-slate-50 px-2 py-1 rounded">
                                    <span className="text-[10px] font-extrabold text-blue-700 tracking-wider uppercase">{proj.timeline}</span>
                                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-100">
                                      {proj.variancePercentage || "+15%"}
                                    </span>
                                  </div>
                                  <div className="text-xl font-bold text-slate-800 tracking-tight mt-1">
                                    {proj.projectedMonthlyRevenue}
                                    <span className="text-[10px] text-slate-400 font-normal"> /mo</span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">Required Drivers:</p>
                                  <ul className="mt-1 space-y-1">
                                    {proj.strategicGrowthDrivers.map((drv, id) => (
                                      <li key={id} className="text-[11px] text-slate-600 flex items-start gap-1">
                                        <ArrowRight className="h-2.5 w-2.5 text-blue-500 shrink-0 mt-0.5" />
                                        <span>{drv}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Market Trend Scanner */}
                      {currentReport.marketTrendScanner && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                          {/* Current industry trends */}
                          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-2">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                              Current Industry Trends
                            </h4>
                            <ul className="space-y-2">
                              {currentReport.marketTrendScanner.currentIndustryTrends.map((trend, id) => (
                                <li key={id} className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                                  {trend}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Emerging Opportunities */}
                          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-2">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Emerging Market Opportunities
                            </h4>
                            <ul className="space-y-2">
                              {currentReport.marketTrendScanner.emergingOpportunities.map((trend, id) => (
                                <li key={id} className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                                  {trend}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Disruption risks */}
                          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-2">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                              Disruption Risks & Pressures
                            </h4>
                            <ul className="space-y-2">
                              {currentReport.marketTrendScanner.disruptionRisks.map((trend, id) => (
                                <li key={id} className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                                  {trend}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Business Automation systems */}
                      {currentReport.automationAdvisor && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <Cpu className="h-4 w-4 text-indigo-600" />
                            Business Operation Automation Advisor
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {[
                              { title: "Generative AI Tech", list: currentReport.automationAdvisor.aiToolsRecommended, color: "bg-purple-50 text-purple-800 border-purple-100" },
                              { title: "CRM Platforms", list: currentReport.automationAdvisor.crmSystems, color: "bg-blue-50 text-blue-800 border-blue-100" },
                              { title: "ERP & Finances", list: currentReport.automationAdvisor.erpSystems, color: "bg-orange-50 text-orange-800 border-orange-100" },
                              { title: "Marketing Auto", list: currentReport.automationAdvisor.marketingAutomation, color: "bg-emerald-50 text-emerald-800 border-emerald-100" },
                              { title: "Customer Care AI", list: currentReport.automationAdvisor.customerSupportAutomation, color: "bg-sky-50 text-sky-800 border-sky-100" }
                            ].map((aut, idx) => (
                              <div key={idx} className={`rounded-xl p-4.5 border ${aut.color}`}>
                                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-black/5 pb-1">{aut.title}</h4>
                                <ul className="space-y-1.5">
                                  {aut.list.map((tool, i) => (
                                    <li key={i} className="text-[11px] leading-relaxed flex items-start gap-1">
                                      <span className="font-bold shrink-0">•</span>
                                      <span>{tool}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 90-Day Tactical Execution Roadmap */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            90-Day Tactical Execution Roadmap
                          </h3>
                        </div>
                        
                        <div className="p-5 space-y-5">
                          {["month1", "month2", "month3"].map((monthKey, idx) => {
                            const tasks: TaskItem[] = (currentReport.actionPlan90Days as any)[monthKey] || [];
                            return (
                              <div key={monthKey} className="space-y-3 pb-3 border-b last:border-none last:pb-0 border-slate-100">
                                <h4 className="text-xs font-extrabold text-blue-600 tracking-wider uppercase">
                                  Month {idx + 1}: {idx === 0 ? "Diagnostic & Baseline Stability" : idx === 1 ? "Expansion & Tool Setup" : "Optimization & Scaling Launch"}
                                </h4>
                                <div className="space-y-3.5 pl-1">
                                  {tasks.map((taskItem, taskIdx) => (
                                    <div key={taskIdx} className="flex gap-3">
                                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center font-bold">
                                        0{taskIdx + 1}
                                      </div>
                                      <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                          <h5 className="text-xs font-bold text-slate-800">{taskItem.task}</h5>
                                          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">{taskItem.timeframe}</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                                          <strong className="text-slate-600 font-semibold">Objective:</strong> {taskItem.objective}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: GLOBAL EXPANSION */}
                  {activeTab === "expansion" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Global Market Expansion Advisor */}
                      {currentReport.globalMarketExpansion && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                          <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Globe className="h-4 w-4 text-blue-600" />
                              Global Market Expansion Advisor (Top 5 Matches)
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">Top regional recommendations matched with their business context and category.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {currentReport.globalMarketExpansion.slice(0, 5).map((expansion, idx) => (
                              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative overflow-hidden flex flex-col justify-between transition-all hover:border-slate-300">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1.5">
                                      <span className="text-xs font-bold text-slate-700">{idx + 1}. {expansion.country}</span>
                                    </div>
                                    <span className={`text-[9px] font-bold tracking-wider uppercase py-0.5 px-1.5 rounded ${
                                      expansion.competitionLevel.toLowerCase().includes("low") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                      expansion.competitionLevel.toLowerCase().includes("med") ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                      "bg-rose-50 text-rose-700 border border-rose-100"
                                    }`}>
                                      Comp: {expansion.competitionLevel}
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight block">Market Demand</span>
                                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">{expansion.marketDemand}</p>
                                    </div>
                                    <div>
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight block">Entry Barriers</span>
                                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">{expansion.entryBarriers}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-slate-100">
                                  <span className="text-[9px] font-extrabold text-indigo-700 uppercase tracking-wider block">Localization Advice:</span>
                                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 font-sans whitespace-pre-line">{expansion.localizationTips}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Country Expansion Matrix Table */}
                      {(() => {
                        const matrix = currentReport.globalSaaSFeatures?.countryExpansionMatrix || [
                          { country: "United States (US)", entrySpeedRating: "Fast", complianceConfidenceScore: 92, marketFeasibilityScore: 88, strategicPriorityScore: 95 },
                          { country: "India (IN)", entrySpeedRating: "Moderate", complianceConfidenceScore: 85, marketFeasibilityScore: 90, strategicPriorityScore: 92 },
                          { country: "Germany (DE)", entrySpeedRating: "Slow", complianceConfidenceScore: 78, marketFeasibilityScore: 82, strategicPriorityScore: 80 },
                          { country: "United Kingdom (UK)", entrySpeedRating: "Fast", complianceConfidenceScore: 89, marketFeasibilityScore: 85, strategicPriorityScore: 85 },
                          { country: "Japan (JP)", entrySpeedRating: "Slow", complianceConfidenceScore: 80, marketFeasibilityScore: 78, strategicPriorityScore: 75 }
                        ];

                        return (
                          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                              {t("countryMatrix")}
                            </h3>
                            <p className="text-[11px] text-slate-400 mb-4">Enterprise readiness comparison across target cross-border markets evaluating entry, risk profiling and scalability weights.</p>
                            
                            <div className="overflow-x-auto rounded-lg border border-slate-100">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="p-3 text-[10px] font-bold text-slate-400 uppercase">Country / Territory</th>
                                    <th className="p-3 text-[10px] font-bold text-slate-400 uppercase text-center">Entry Speed</th>
                                    <th className="p-3 text-[10px] font-bold text-slate-400 uppercase text-center">Compliance Confidence</th>
                                    <th className="p-3 text-[10px] font-bold text-slate-400 uppercase text-center">Market Feasibility</th>
                                    <th className="p-3 text-[10px] font-bold text-slate-400 uppercase text-center">Strategic Priority Score</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                  {matrix.map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-50/50">
                                      <td className="p-3 font-semibold text-slate-700">{row.country}</td>
                                      <td className="p-3 text-center">
                                        <span className={`py-0.5 px-2 rounded-full text-[10px] font-bold ${
                                          row.entrySpeedRating.toLowerCase() === "fast" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                          row.entrySpeedRating.toLowerCase() === "moderate" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                          "bg-red-50 text-red-750 border border-red-100"
                                        }`}>
                                          {row.entrySpeedRating}
                                        </span>
                                      </td>
                                      <td className="p-3 text-center">
                                        <div className="flex items-center justify-center space-x-1.5">
                                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${row.complianceConfidenceScore}%` }} />
                                          </div>
                                          <span className="font-mono text-[10px] font-bold text-slate-600">{row.complianceConfidenceScore}%</span>
                                        </div>
                                      </td>
                                      <td className="p-3 text-center">
                                        <div className="flex items-center justify-center space-x-1.5">
                                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${row.marketFeasibilityScore}%` }} />
                                          </div>
                                          <span className="font-mono text-[10px] font-bold text-slate-600">{row.marketFeasibilityScore}%</span>
                                        </div>
                                      </td>
                                      <td className="p-3 text-center">
                                        <div className="flex items-center justify-center space-x-1.5">
                                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${row.strategicPriorityScore}%` }} />
                                          </div>
                                          <span className="font-mono text-[10px] font-bold text-slate-700">{row.strategicPriorityScore}/100</span>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Global Compliance Assistant */}
                      {currentReport.globalCompliance && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <Scale className="h-4 w-4 text-blue-600" />
                            Global Trade Compliance & Regulations Assistant
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {currentReport.globalCompliance.map((comp, idx) => (
                              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-3">
                                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                                  Region: {comp.regionOrScope}
                                </h4>
                                <div className="space-y-2">
                                  <div>
                                    <strong className="text-[10px] text-slate-400 uppercase font-bold tracking-tight block">Taxation & Customs Guidance</strong>
                                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">{comp.taxationGuidance}</p>
                                  </div>
                                  <div>
                                    <strong className="text-[10px] text-slate-400 uppercase font-bold tracking-tight block">Data Privacy Laws (GDPR / CCPA / DPDP)</strong>
                                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">{comp.dataPrivacyGuidance}</p>
                                  </div>
                                  <div>
                                    <strong className="text-[10px] text-slate-400 uppercase font-bold tracking-tight block">Licensing & Operations Permits</strong>
                                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">{comp.licensingGuidance}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 4: CAPITAL & INVESTOR HUB */}
                  {activeTab === "funding" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Investor Readiness Rating and Preparation Checklist */}
                      {currentReport.investorReadiness && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            
                            {/* Score Card Dashboard */}
                            <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Investor Readiness Quotient</span>
                                <div className="flex items-baseline mt-2">
                                  <span className="text-5xl font-extrabold text-blue-400">{currentReport.investorReadiness.score}</span>
                                  <span className="text-lg text-slate-400 ml-1">/100</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${currentReport.investorReadiness.score}%` }} />
                                </div>
                              </div>
                              <div className="space-y-2 mt-4 text-[11px] leading-relaxed border-t border-slate-800 pt-3">
                                <div><strong className="text-slate-400">Scalability Strategy:</strong> {currentReport.investorReadiness.scalabilityEvaluation}</div>
                                <div><strong className="text-slate-400">Profitability Margin:</strong> {currentReport.investorReadiness.profitabilityEvaluation}</div>
                                <div><strong className="text-slate-400">Team Strength Index:</strong> {currentReport.investorReadiness.teamStrengthEvaluation}</div>
                                <div><strong className="text-slate-400">Addressable Market:</strong> {currentReport.investorReadiness.marketSizeEvaluation}</div>
                              </div>
                            </div>
                                     {/* Actionable Prep Checklist (Interactive) */}
                            <div className="lg:col-span-2 bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Actionable Preparation Checklist</h4>
                                <p className="text-[11px] text-slate-400 mb-3">Check off elements before scheduling investor calls or drafting loan terms.</p>
                                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                                  {currentReport.investorReadiness.improvementsActionableChecklist.map((item, idx) => {
                                    const isChecked = !!checkedImprovements[item];
                                    return (
                                      <div
                                        key={idx}
                                        onClick={() => setCheckedImprovements({ ...checkedImprovements, [item]: !isChecked })}
                                        className="bg-white p-3 border border-slate-250 hover:border-slate-350 rounded-lg cursor-pointer flex items-start space-x-2.5 transition-all select-none"
                                      >
                                        <div className="shrink-0 mt-0.5">
                                          {isChecked ? (
                                            <CheckSquare className="h-4.5 w-4.5 text-indigo-600" />
                                          ) : (
                                            <Square className="h-4.5 w-4.5 text-slate-300" />
                                          )}
                                        </div>
                                        <span className={`text-xs text-slate-700 font-medium ${isChecked ? "line-through text-slate-400" : ""}`}>{item}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 mt-2.5 flex justify-between items-center">
                                <span>Checked progress: {Object.values(checkedImprovements).filter(Boolean).length} / {currentReport.investorReadiness.improvementsActionableChecklist.length}</span>
                                <span className="text-indigo-650 font-bold uppercase shrink-0">Track Readiness</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* Global Matched Funding Channels */}
                      {currentReport.globalFundingIntelligence && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                            Matched Channels Analyzer (Global Standards)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {currentReport.globalFundingIntelligence.map((fund, idx) => (
                              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs flex flex-col justify-between transition-all hover:border-slate-300">
                                <div>
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-extrabold text-slate-800 text-xs">
                                      {fund.category}
                                    </h4>
                                    <span className={`text-[9px] font-bold tracking-wider uppercase py-0.5 px-2 rounded border ${
                                      fund.appropriatenessValue.toLowerCase().includes("high") ? "bg-emerald-50 border-emerald-100 text-emerald-700 font-bold" :
                                      fund.appropriatenessValue.toLowerCase().includes("med") ? "bg-amber-50 border-amber-150 text-amber-700 font-bold" :
                                      "bg-slate-50 border-slate-150 text-slate-600"
                                    }`}>
                                      Fit: {fund.appropriatenessValue}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 leading-relaxed mb-1 pb-1">
                                    <strong>Usage Applicability:</strong> {fund.applicability}
                                  </p>
                                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                    <strong>Analytical advice:</strong> {fund.reasoning}
                                  </p>
                                </div>
                                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Matched Funding Range</span>
                                  <span className="text-xs font-extrabold text-slate-700">{fund.estimatedMatchAmount}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* India Government Scheme Intelligence */}
                      {currentReport.indiaGovSchemes && (
                        <div className="bg-slate-900 rounded-xl p-5 text-white shadow-sm space-y-4">
                          <h3 className="font-bold text-sm flex items-center gap-2 opacity-90 border-b border-slate-800 pb-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            India Government Scheme Intelligence Portal (MSME / Mudra / CGTMSE)
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentReport.indiaGovSchemes.map((scheme, idx) => (
                              <div key={idx} className="bg-slate-950/65 border border-slate-800 p-4 rounded-xl space-y-2 flex flex-col justify-between">
                                <div>
                                  <p className="text-xs font-bold text-emerald-400">{scheme.name}</p>
                                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1">{scheme.description}</p>
                                </div>
                                <div className="mt-2 pt-2 border-t border-slate-900 flex flex-col space-y-1 text-[10px]">
                                  <div><span className="text-slate-400 font-medium">Eligibility Criteria:</span> <p className="text-slate-200 text-[10px] mt-0.5 leading-relaxed">{scheme.eligibility}</p></div>
                                  <div className="mt-1"><span className="text-emerald-400 font-semibold font-bold">Matched Benefits:</span> <p className="text-emerald-300 text-[10px] mt-0.5 leading-relaxed">{scheme.benefits}</p></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Legacy matching funding suggestions fallback if exists */}
                      {!currentReport.globalFundingIntelligence && currentReport.fundingSuggestions && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                            Additional Matched Capital Mechanisms
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentReport.fundingSuggestions.map((fund, idx) => (
                              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-800 text-xs">
                                      {fund.type}
                                    </h4>
                                    <span className={`text-[9px] font-bold tracking-wider uppercase py-0.5 px-2 rounded border ${
                                      fund.appropriateness.toLowerCase().includes("high") ? "bg-emerald-50 border-emerald-100 text-emerald-700" :
                                      fund.appropriateness.toLowerCase().includes("med") ? "bg-amber-50 border-amber-150 text-amber-700" :
                                      "bg-slate-50 border-slate-150 text-slate-600"
                                    }`}>
                                      {fund.appropriateness}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                                    {fund.reasoning}
                                  </p>
                                </div>
                                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Estimated Amount</span>
                                  <span className="text-xs font-bold text-slate-700">{fund.estimatedAmount}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 5: COMPETITIVE ENTERPRISE EDGE (Premium Bilingual Competitor Analysis Model) */}
                  {activeTab === "competition" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* AI Competitor Analysis Engine */}
                      {currentReport.competitorAnalysis && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
                          {/* Title and Short Description */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                            <div>
                              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Building2 className="h-4 w-4 text-indigo-600 animate-pulse" />
                                AI Competitor Analysis Engine (प्रतिस्पर्धा और बाजार विश्लेषण)
                              </h3>
                              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                                आपके क्षेत्र, उद्योग और भूगोल के आधार पर प्रतिस्पर्धियों का सटीक विश्लेषण और सत्यापन लिंक्स।
                              </p>
                            </div>
                            {currentReport.input.marketScope && (
                              <div className="flex items-center space-x-1.5 self-start md:self-auto uppercase tracking-wider text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full">
                                <Globe className="h-3.5 w-3.5" />
                                <span>स्कोप: {currentReport.input.marketScope === "Local" ? "स्थानीय (Local)" : currentReport.input.marketScope === "City-wide" ? "पूरा शहर (City)" : currentReport.input.marketScope === "Regional" ? "क्षेत्रीय (Regional)" : currentReport.input.marketScope === "National" ? "राष्ट्रीय (National)" : "वैश्विक (Global)"}</span>
                              </div>
                            )}
                          </div>

                          {/* 1. Market Saturation & Posture indicators */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Saturation Gauge */}
                            <div className="border border-slate-155 rounded-xl p-4 bg-slate-50/50 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-sans">
                                  <Activity className="h-4 w-4 text-amber-500 animate-pulse" />
                                  मार्केट कॉम्पिटिशन दबाव (Market Saturation Level)
                                </span>
                                <span className="text-xs font-bold text-slate-800 font-mono">
                                  {currentReport.competitorAnalysis.marketSaturationScore ?? 45}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    (currentReport.competitorAnalysis.marketSaturationScore ?? 45) > 70
                                      ? "bg-rose-500"
                                      : (currentReport.competitorAnalysis.marketSaturationScore ?? 45) > 35
                                      ? "bg-amber-500"
                                      : "bg-emerald-500"
                                  }`}
                                  style={{ width: `${currentReport.competitorAnalysis.marketSaturationScore ?? 45}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-emerald-600">ब्लू ओशन (कम)</span>
                                <span className="text-amber-600 font-semibold">मध्यम</span>
                                <span className="text-rose-600">काफी भीड़ (उच्च)</span>
                              </div>
                            </div>

                            {/* Innovation / Mover status */}
                            <div className="border border-slate-155 rounded-xl p-4 bg-indigo-50/30 flex flex-col justify-between">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider block font-sans">First-Mover Advantage Posture</span>
                                  <h4 className="text-xs font-bold text-slate-800 font-sans">
                                    {currentReport.input.firstMoverStatus === "First-Mover" ? "अनूठा विचार (First-Mover / Unique Concept)" : currentReport.input.firstMoverStatus === "Established Market" ? "स्थापित बाजार (Established / High Competition)" : "मध्यम श्रेणी (Moderate / Room to Disrupt)"}
                                  </h4>
                                </div>
                                <span className={`text-[9px] uppercase font-bold px-2.5 py-1 rounded-full border ${currentReport.input.firstMoverStatus === "First-Mover" ? "bg-emerald-100 border-emerald-300 text-emerald-800" : currentReport.input.firstMoverStatus === "Established Market" ? "bg-rose-100 border-rose-200 text-rose-800" : "bg-blue-100 border-blue-200 text-blue-800"}`}>
                                  {currentReport.input.firstMoverStatus === "First-Mover" ? "HIGH MOVER EDGE" : currentReport.input.firstMoverStatus === "Established Market" ? "HIGH SATURATION" : "OPPORTUNITY GAP"}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 italic leading-snug mt-2">
                                {currentReport.input.firstMoverStatus === "First-Mover" 
                                  ? "Note: आप पहले मूवर दिख रहे हैं, बाजार में जागरूकता बढ़ाना प्रमुख चुनौती होगी।" 
                                  : "Note: अन्य खिलाड़ियों की कमजोरी का फायदा उठाकर बाजार में हिस्सेदारी बनाई जा सकती है।"}
                              </p>
                            </div>
                          </div>

                          {/* 2. Deep Insights: How players operate & Feasibility */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Feasibility Notes */}
                            <div className="border border-slate-200 rounded-xl p-4.5 bg-white space-y-2">
                              <h4 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                                <Sparkles className="h-4 w-4 text-blue-500" />
                                रणनीतिक व्यवहार्यता और स्कोप (Growth Scope Analysis)
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                {currentReport.competitorAnalysis.firstMoverFeasibilityNotes || "यह विश्लेषण दर्शाता है कि इस उद्योग में स्थानीय प्रतिस्पर्धा अधिक हो सकती है, लेकिन ग्राहक सेवा या विशिष्ट पैकेजिंग के माध्यम से खुद को अलग करने का काफी स्कोप मौजूद है।"}
                              </p>
                            </div>

                            {/* How players perform */}
                            <div className="border border-slate-200 rounded-xl p-4.5 bg-white space-y-2">
                              <h4 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                                <Briefcase className="h-4 w-4 text-emerald-500" />
                                ऑपरेटर कार्यप्रणाली (How Competitors Operate)
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed font-normal font-sans">
                                {currentReport.competitorAnalysis.howPlayersArePerforming || "अधिकांश स्थापित प्रतियोगी पारंपरिक मार्केटिंग और सीधे स्थानीय रेफ़रल पर निर्भर हैं। उनकी डिजिटल उपस्थिति और ऑनलाइन बुकिंग प्रणालियाँ कमजोर हैं, जो आपके लिए प्रवेश द्वार हो सकती हैं।"}
                              </p>
                            </div>
                          </div>

                          {/* 3. Table of Competitors */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">
                              Likely Competitor Analysis (संभावित प्रतिस्पर्धियों का विवरण)
                            </h4>
                            <div className="overflow-x-auto border border-slate-150 rounded-xl">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600">
                                    <th className="p-3 font-bold flex-1">Competitors / Archetype (नाम/श्रेणी)</th>
                                    <th className="p-3 font-bold">Pricing Strategy (मूल्य निर्धारण)</th>
                                    <th className="p-3 font-bold">Market Positioning (पोजीशनिंग)</th>
                                    <th className="p-3 font-bold">Acquisition Method (ग्राहक प्राप्ति)</th>
                                    <th className="p-3 font-bold col-span-1">Digital presence (डिजिटल उपस्थिति)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentReport.competitorAnalysis.competitors.map((comp, idx) => (
                                    <tr key={idx} className="border-b border-slate-100 last:border-none hover:bg-slate-50/40">
                                      <td className="p-3 font-bold text-slate-800">{comp.name}</td>
                                      <td className="p-3 text-slate-600 font-normal">{comp.pricingStrategy}</td>
                                      <td className="p-3 text-slate-600 font-normal">{comp.marketPositioning}</td>
                                      <td className="p-3 text-slate-600 font-normal">{comp.customerAcquisitionMethod}</td>
                                      <td className="p-3">
                                        <span className="bg-slate-100 text-slate-800 font-semibold text-[10px] px-2.5 py-0.5 rounded border border-slate-200 whitespace-nowrap">
                                          {comp.digitalPresenceRating}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* 4. Strategic USP & Tactics */}
                          <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                              <Sparkles className="h-4.5 w-4.5 text-amber-400" />
                              Competitive Advantage & USP Tactics (लीड लेने और जीतने के तरीके)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {currentReport.competitorAnalysis.competitiveAdvantageTactics.map((tactic, i) => (
                                <div key={i} className="flex gap-2.5 items-start">
                                  <div className="flex-shrink-0 w-5 h-5 rounded-md bg-slate-800 border border-slate-700 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                                    {i + 1}
                                  </div>
                                  <p className="text-xs text-slate-200 leading-relaxed font-normal">{tactic}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 5. External Reference Verification Links */}
                          {currentReport.competitorAnalysis.industryBenchmarksLinks && currentReport.competitorAnalysis.industryBenchmarksLinks.length > 0 && (
                            <div className="space-y-2.5 pt-2">
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1 flex items-center gap-1">
                                <Globe className="h-4 w-4 text-indigo-500" />
                                Verification Resource Registry (सत्यापन संदर्भ और जांच करने के लिंक)
                              </h4>
                              <p className="text-[10px] text-slate-400 -mt-2 pl-1 leading-normal">
                                आप अपने क्षेत्र के वास्तविक लाइसेंस, कंपनियों एवं बेंचमार्क्स की जांच के लिए इन आधिकारिक एवं सहायक टूल्स का उपयोग कर सकते हैं:
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {currentReport.competitorAnalysis.industryBenchmarksLinks.map((link, idx) => (
                                  <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    rel="noopener noreferrer"
                                    className="block border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-white p-3 rounded-lg transition-all group hover:shadow-xs cursor-pointer text-left"
                                  >
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className="font-bold text-xs text-indigo-900 group-hover:text-indigo-600 line-clamp-1">{link.title}</span>
                                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 flex-shrink-0" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{link.description}</p>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Growth Opportunities */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Enterprise Strategic Growth Opportunities (ग्रोथ व विस्तार योजनाएं)
                        </h4>
                        <div className="space-y-4">
                          {currentReport.growthOpportunities.map((opp, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs relative overflow-hidden transition-all hover:border-slate-300">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                <h4 className="font-bold text-slate-800 text-sm flex items-center">
                                  <span className="h-5 w-5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center justify-center mr-2">
                                    {idx + 1}
                                  </span>
                                  {opp.title}
                                </h4>
                                
                                <div className="flex items-center space-x-2 shrink-0">
                                  <span className={`text-[9px] uppercase tracking-wider font-extrabold py-0.5 px-2 rounded-full border ${getImpactBadge(opp.impact)}`}>
                                    Impact: {opp.impact}
                                  </span>
                                  <span className={`text-[9px] uppercase tracking-wider font-extrabold py-0.5 px-2 rounded-full border ${getDifficultyBadge(opp.difficulty)}`}>
                                    Difficulty: {opp.difficulty}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {opp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 6: RISKS & COMPLIANCE */}
                  {activeTab === "risks" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      {currentReport.riskAssessment.map((risk, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
                          <div className="flex items-center justify-between p-2 rounded mb-3 bg-slate-50 border border-slate-150">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5">
                                {risk.category}
                              </span>
                              <span className="text-xs font-bold text-slate-800">{risk.riskFactor}</span>
                            </div>
                            <span className={`text-[9px] font-black uppercase py-0.5 px-2 rounded-full border shrink-0 ${getSeverityBadge(risk.severity)}`}>
                              {risk.severity}
                            </span>
                          </div>
                          
                          <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg text-xs flex items-start space-x-2">
                            <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-800 text-xs block mb-0.5">Tactical Mitigation Protocol</span>
                              <p className="text-slate-650 leading-relaxed">{risk.mitigationStrategy}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </section>

      </main>

      {/* HIGH-FIDELITY HINDI PDF EXPORT MODAL */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto print:hidden" id="pdf-export-modal">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExportModal(false)}
              className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-slate-200"
              >
                {/* Header bar branding */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-5.5 text-white relative">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-1"
                    id="close-modal-top"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                      <FileText className="h-6 w-6 text-indigo-100" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">PDF रिपोर्ट निर्यात गाइड</h3>
                      <p className="text-xs text-indigo-100/90 font-medium">Hindi-Optimized High-Fidelity Paper & PDF Export</p>
                    </div>
                  </div>
                </div>

                {/* Modal Body with Guides */}
                <div className="px-6 py-6 space-y-5 bg-slate-50/50 animate-fadeIn" id="export-guide-body">
                  
                  {/* COOPERATIVE WARNING CHASSIS FOR BROWSER IFRAME SANDBOX LIMITS */}
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-4.5 text-xs text-rose-800 space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
                    <div className="flex items-center space-x-2 font-bold text-rose-900">
                      <ShieldAlert className="h-4.5 w-4.5 text-red-650 shrink-0" />
                      <span>आईफ़्रेम सुरक्षा सीमा चेतावनी (Browser Sandbox Warning)</span>
                    </div>
                    <p className="leading-relaxed font-sans font-medium text-slate-800">
                      <strong>समस्या (Why it fails):</strong> आप वर्तमान में इस ऐप को एक सुरक्षित फ्रेम (Iframe Sandbox) में उपयोग कर रहे हैं। ब्राउज़र सुरक्षा नीतियों के कारण सीधे 'कन्फर्म करें' दबाने पर प्रिंट डायलॉग अक्सर ऑटो-ब्लॉक हो जाता है और <strong>फ़ाइल एक्सपोर्ट नहीं होती</strong>।
                    </p>
                    <p className="leading-relaxed text-[11px] text-slate-700 font-sans">
                      <strong>समाधान (Immediate Fix):</strong> सबसे विश्वसनीय और तेज़ तरीका है कि आप नीचे दिए गए लाल बटन का उपयोग करके <strong>"ऑफ़लाइन HTML रिपोर्ट"</strong> डाउनलोड करें। इसे डाउनलोड करने के बाद उस फाइल को डबल-क्लिक करके ब्राउज़र में खोलें, जहाँ पर <code>window.print()</code> बिना किसी प्रतिबंध के 100% काम करेगा!
                    </p>
                  </div>

                  {/* PREMIER DOWNLOAD BLOCK */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 text-center space-y-3.5 shadow-xs">
                    <div>
                      <h4 className="text-sm font-bold text-indigo-950 font-display">🌟 अनुशंसित समाधान (Recommended Solution)</h4>
                      <p className="text-[11px] text-indigo-800 mt-1">हाई-फिडेलिटी देवनागरी और ऑफलाइन शेयरिंग के लिए पूर्ण रिपोर्ट फ़ाइल डाउनलोड करें।</p>
                    </div>

                    <button
                      onClick={() => {
                        handleDownloadHTMLReport();
                        // Also show a small visual toast feedback if needed, but the native download is immediate
                      }}
                      className="w-full py-3 px-5 bg-red-600 hover:bg-red-700 text-white hover:scale-[1.01] active:scale-[0.99] font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2.5 border border-red-600 cursor-pointer"
                      id="download-offline-report-btn"
                    >
                      <FileText className="h-4.5 w-4.5 text-white animate-pulse" />
                      <span>ऑफ़लाइन HTML रिपोर्ट डाउनलोड करें (100% working)</span>
                    </button>
                    <p className="text-[10px] text-slate-500 italic">This file preserves all dynamic content, styling, formatting and embeds print utilities perfectly.</p>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-4 pt-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">सीधे प्रिंट करने के निर्देश (Direct Print Guide - Fallback):</span>

                    {/* Step 1 */}
                    <div className="flex items-start space-x-3 text-xs">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">कन्फर्म बटन दबाएं</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                          नीचे दिए गए नीले बटन <strong>"सीधे प्रिंट का प्रयास करें"</strong> पर क्लिक करें। यदि ब्राउज़र प्रिंटर ब्लॉक नहीं करता, तो प्रिंट डायलॉग प्रदर्शित होगा।
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start space-x-3 text-xs">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">गंतव्य में 'Save as PDF' चुनें</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                          गंतव्य (Destination) की सूची में से <strong>"Save as PDF" (पीडीएफ के रूप में सहेजें)</strong> का चयन करें।
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start space-x-3 text-xs">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-600">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">पृष्ठभूमि ग्राफिक्स (Background Graphics) चालू करें</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-semibold text-rose-700 font-sans">
                          'More Settings' खोलकर 'Background Graphics' विकल्प पर टिक लगाना न भूलें, ताकि रिपोर्ट के सारे सुंदर रंग और तालिकाएँ संरक्षित रहें।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Do not show again checkbox */}
                  <div className="pt-2 border-t border-slate-150 flex items-center space-x-2">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={skipExportGuide}
                      onClick={() => {
                        const val = !skipExportGuide;
                        setSkipExportGuide(val);
                        try {
                          localStorage.setItem("skip_hindi_pdf_guide", val ? "true" : "false");
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className={`h-4.5 w-4.5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                        skipExportGuide ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-300 text-transparent"
                      }`}
                      id="skip-guide-checkbox"
                    >
                      <svg className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <label htmlFor="skip-guide-checkbox" className="text-xs text-slate-600 select-none cursor-pointer">
                      भविष्य में मार्गदर्शिका न दिखाएं, सीधे प्रिंट खोलें (Do not show this guide again)
                    </label>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="bg-slate-100/80 px-6 py-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    id="cancel-export-btn"
                  >
                    रद्द करें (Cancel)
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowExportModal(false);
                      setTimeout(() => {
                        window.print();
                      }, 250);
                    }}
                    className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
                    id="confirm-export-btn"
                  >
                    <Printer className="h-4 w-4" />
                    <span>सीधे प्रिंट का प्रयास करें (Try Direct Print)</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
