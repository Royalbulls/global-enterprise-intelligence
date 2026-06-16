# Business Growth Advisor

An AI-powered full-stack Business Growth Advisor web application built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS v4** on the frontend, and **Node.js + Express** with the modern `@google/genai` SDK on the backend.

## 🚀 Key Features

1. **Strategic Parameter Inputs**:
   - Company profiles (Name, Industry sector, Location, Material state, age parameters, and Funding targets).
   - Specialized interactive presets (Bakery, Tech SaaS, Fashion Boutique) for rapid diagnostic testing.

2. **Custom Multi-Dimensional Diagnostics**:
   - **Business Health Index**: An overall score breakdown comparing financial, market position, operational maturity, and investment readiness metrics.
   - **Custom Growth Opportunities**: Specialized local and sector tactics mapped cleanly against difficulty and expected market impact.
   - **Matched Capital Vehicles**: Highly tuned financing mechanisms (Bootstrapping, debt, working capital, line of credit, grant suggestions) matching company revenue tiers.
   - **Localized Subsidies**: Program recommendations and local grant channels automatically derived from business location parameters.
   - **Structured Security Risk Matrices**: Evaluation of strategic, operational, compliance, and material failure points with concrete mitigation protocols.
   - **90-Day Milestones Plan**: Staggered monthly timelines split into sequential tasks, timelines, and goal metrics.

3. **Session Logging**:
   - Stores diagnostics history in the client's localized `localStorage` block to let users load or clear prior diagnostic sheets instantly.
   
4. **Print Layout Support**:
   - Polished CSS print styles formatting results for physical review with banking partners or stakeholders.

---

## 🛠️ Technology Stack & Organization

- **Frontend Framework**: React 19 (TypeScript)
- **CSS System**: Tailwind CSS v4 featuring the custom "Inter" and "Space Grotesk" typefaces.
- **Backend Service**: Node.js + Express (serving React bundles under production compilation).
- **AI Core**: Google Gemini model `gemini-3.5-flash` integrated server-side with structured JSON schema parameters.

### 📂 File Structure

```text
├── metadata.json           # Application manifest (permissions & metadata names)
├── server.ts               # Custom Express server entrypoint (Vite middleware setup)
├── package.json            # Development and production build scripts
├── src/
│   ├── App.tsx             # Interactive premium growth diagnostics dashboard
│   ├── main.tsx            # React client mount entrypoint
│   ├── index.css           # Global typography definitions
│   └── types.ts            # Enterprise TypeScript structured definitions
└── tsconfig.json           # TS Compiler configuration specs
```

---

## ⚙️ Setup and Configuration

### 1. Secrets Configuration
Define the `GEMINI_API_KEY` in the secrets manager:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### 2. Operational Development Launch
Run the integrated Vite + Custom Express endpoint in developer mode:
```bash
npm run dev
```
The server will bind on port `3000` internally, supporting hot refresh.

### 3. Production Build Compilation
To bundle the frontend resources and compile the Node container server into a unified server bundle:
```bash
npm run build
npm start
```
This produces optimized production bundles at `/dist`.

---

## 💡 Accessibility Standards Built-in
- High-contrast visual indices (exceeding WCAG AAA contrast ratio guidelines).
- Screen-reader accessible forms with label bindings.
- Distinct non-color tags for important indicators (e.g., text descriptors on top of color-coded risk alerts).
