import React, { useState, useEffect } from "react";
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
  Map
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
    additionalDetails: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentReport, setCurrentReport] = useState<AdviceReport | null>(null);
  const [savedReports, setSavedReports] = useState<AdviceReport[]>([]);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [checkedImprovements, setCheckedImprovements] = useState<Record<string, boolean>>({});
  
  // Custom Global SaaS States
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "INR" | "EUR" | "GBP" | "JPY">("USD");
  const [selectedLanguage, setSelectedLanguage] = useState<"EN" | "HI" | "HINGLISH" | "MR" | "TA" | "TE" | "BN" | "ES" | "DE" | "FR">("EN");

  // Multi-Language translation matrix
  const TRANSLATIONS: Record<string, Record<string, string>> = {
    EN: {
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
        additionalDetails: preset.additionalDetails || ""
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
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to generate report.");
      }

      const newReport: AdviceReport = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleString(),
        input: { ...formData }
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

  const handlePrint = () => {
    window.print();
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
            Business Analysis
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("opportunities")} 
            className={`transition-colors pb-1 ${activeTab === "opportunities" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-950"}`}
          >
            Growth Opportunities
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("funding")} 
            className={`transition-colors pb-1 ${activeTab === "funding" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-950"}`}
          >
            Recommended Funding
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab("risks")} 
            className={`transition-colors pb-1 ${activeTab === "risks" ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-slate-950"}`}
          >
            Risk Assessment
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full py-1 px-3 flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            AI v2.4 Active
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

                      <button
                        onClick={handlePrint}
                        className="py-1.5 px-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs"
                      >
                        <Printer className="h-3.5 w-3.5 text-slate-500" />
                        <span>Print Sheet</span>
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
                                          <div className="w-16 bg-slate-150 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${row.strategicPriorityScore}%` }} />
                                          </div>
                                          <span className="font-mono text-[10px] font-bold text-blue-700">{row.strategicPriorityScore}/100</span>
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
                                            <CheckSquare className="h-4.5 w-4.5 text-blue-600" />
                                          ) : (
                                            <Square className="h-4.5 w-4.5 text-slate-300" />
                                          )}
                                        </div>
                                        <span className={`text-xs text-slate-750 font-medium ${isChecked ? "line-through text-slate-405" : ""}`}>{item}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 mt-2.5 flex justify-between items-center">
                                <span>Checked progress: {Object.values(checkedImprovements).filter(Boolean).length} / {currentReport.investorReadiness.improvementsActionableChecklist.length}</span>
                                <span className="text-blue-600 font-bold uppercase shrink-0">Track Readiness</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* AI Business Valuation Estimate Card */}
                      {(() => {
                        const val = currentReport.globalSaaSFeatures?.aiBusinessValuationEstimate || {
                          estimatedValuationRange: "$1.2M - $1.8M",
                          multiplierType: "SaaS ARR Multiplier",
                          multiplierAppliedValue: "4.5x - 6.0x ARR run rate",
                          valuationDrivers: [
                            "85% Gross Profit margins indicating low asset liability or server storage overheads",
                            "Contractual or recurring user model driving predictable next-twelve-months revenue projections",
                            "Capital-efficient historical customer acquisition cost (CAC)"
                          ],
                          optimizationStrategies: [
                            "Demonstrate lower net revenue churn by setting multi-quarter pre-paid subscription tiers",
                            "Diversify system channels to mitigate specific supplier or single client concentrations",
                            "Consolidate operational playbooks to show investor repeatable customer onboarding flows"
                          ]
                        };

                        return (
                          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-lg space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
                                <Award className="h-4 w-4 text-amber-400" />
                                {t("valuationHeadline")}
                              </h3>
                              <span className="py-0.5 px-2.5 bg-indigo-500/30 text-indigo-300 text-[10px] font-bold rounded-full border border-indigo-500/20 uppercase tracking-wider">
                                Sector Matched Multiple
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                              {/* Left side: Range and Multiple */}
                              <div className="bg-white/5 border border-white/10 p-4.5 rounded-xl flex flex-col justify-between">
                                <div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Strategic Enterprise Value</span>
                                  <span className="text-3xl font-black text-amber-300 block mt-1.5 font-display tracking-tight">
                                    {formatCurrencyValue(val.estimatedValuationRange)}
                                  </span>
                                </div>
                                <div className="space-y-1.5 mt-4 pt-3 border-t border-white/5 text-xs text-slate-300">
                                  <div><strong className="text-slate-400">Multiplier Class:</strong> {val.multiplierType}</div>
                                  <div><strong className="text-slate-400">Applied Vector:</strong> {val.multiplierAppliedValue}</div>
                                </div>
                              </div>

                              {/* Mid side: Key Valuation Drivers */}
                              <div className="bg-white/5 border border-white/10 p-4.5 rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Valuation Multiplier Drivers</span>
                                <ul className="space-y-2">
                                  {val.valuationDrivers.map((driver, idx) => (
                                    <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5 opacity-90">
                                      <span className="text-emerald-400 text-xs mt-0.5 font-bold shrink-0">•</span>
                                      <span>{driver}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Right side: Optimization Strategies */}
                              <div className="bg-white/5 border border-white/10 p-4.5 rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Valuation Optimization Strategies</span>
                                <ul className="space-y-2">
                                  {val.optimizationStrategies.map((strat, idx) => (
                                    <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5 opacity-90">
                                      <Zap className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                                      <span>{strat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

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
                                  <p className="text-[11px] text-slate-505 leading-relaxed mb-1 pb-1">
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
                          <h3 className="font-bold text-sm flex items-center gap-2 opacity-90 border-b border-slate-805 pb-2">
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
                                  <div><span className="text-slate-400">Eligibility Criteria:</span> <p className="text-slate-202 text-[10px] mt-0.5 leading-relaxed">{scheme.eligibility}</p></div>
                                  <div className="mt-1"><span className="text-emerald-400 font-semibold">Matched Benefits:</span> <p className="text-emerald-250 text-[10px] mt-0.5 leading-relaxed">{scheme.benefits}</p></div>
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

                  {/* TAB 5: COMPETITIVE ENTERPRISE EDGE */}
                  {activeTab === "competition" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* AI Competitor Analysis Engine */}
                      {currentReport.competitorAnalysis && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                          <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Building2 className="h-4 w-4 text-emerald-600" />
                              AI Competitor Analysis Engine
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">Likely sector competitors and strategic capture methods based on geographic parameters.</p>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/75">
                                  <th className="p-3 font-bold text-slate-600">Likely Competitor Archetype</th>
                                  <th className="p-3 font-bold text-slate-600">Pricing & Package Strategy</th>
                                  <th className="p-3 font-bold text-slate-600">Market Positioning</th>
                                  <th className="p-3 font-bold text-slate-600">Customer Acquisition Method</th>
                                  <th className="p-3 font-bold text-slate-600">Digital Presence Rating</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentReport.competitorAnalysis.competitors.map((comp, idx) => (
                                  <tr key={idx} className="border-b border-slate-100 last:border-none hover:bg-slate-50/40">
                                    <td className="p-3 font-bold text-slate-800">{comp.name}</td>
                                    <td className="p-3 text-slate-600 font-medium">{comp.pricingStrategy}</td>
                                    <td className="p-3 text-slate-600 font-medium">{comp.marketPositioning}</td>
                                    <td className="p-3 text-slate-505">{comp.customerAcquisitionMethod}</td>
                                    <td className="p-3">
                                      <span className="bg-slate-100 text-slate-800 font-semibold text-[10px] px-2 py-0.5 rounded border border-slate-200">
                                        {comp.digitalPresenceRating}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="bg-indigo-900 text-white rounded-xl p-5 space-y-3">
                            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-indigo-800 pb-1.5">
                              <Sparkles className="h-4.5 w-4.5 text-amber-400" />
                              Competitive Advantage & USP Tactics
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {currentReport.competitorAnalysis.competitiveAdvantageTactics.map((tactic, i) => (
                                <div key={i} className="flex gap-2.5 items-start">
                                  <div className="flex-shrink-0 w-5 h-5 rounded-md bg-indigo-850/60 border border-indigo-700 text-amber-300 font-bold flex items-center justify-center text-[10px]">
                                    {i + 1}
                                  </div>
                                  <p className="text-xs text-indigo-150 leading-relaxed font-medium">{tactic}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Growth Opportunities */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                          Enterprise Strategic Expansion Opportunities
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
                                    Effort: {opp.difficulty}
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
    </div>
  );
}
