export type Language = "sq" | "en";

export const translations = {
  // Navbar
  nav: {
    problem: { sq: "Problemi", en: "Problem" },
    solution: { sq: "Zgjidhja", en: "Solution" },
    features: { sq: "Veçoritë", en: "Features" },
    demo: { sq: "Demo", en: "Demo" },
    billChecker: { sq: "Kontrollo Faturën", en: "Bill Checker" },
    impact: { sq: "Ndikimi", en: "Impact" },
    tryDemo: { sq: "Provo Demo", en: "Try Demo" },
    signUp: { sq: "Regjistrohu", en: "Sign Up" },
    tariffs: { sq: "Tarifat", en: "Tariffs" },
    contact: { sq: "Kontakti", en: "Contact" },
  },

  // Hero
  hero: {
    badge: { sq: "Inteligjencë Energjetike me AI", en: "AI-Powered Energy Intelligence" },
    tagline1: { sq: "Shtëpi më të zgjuara,", en: "Smarter homes," },
    tagline2: { sq: "fatura më të ulëta,", en: "lower bills," },
    tagline3: { sq: "pa pajisje të shtrenjta.", en: "no expensive hardware." },
    description: {
      sq: "EcoWatt AI Web ndihmon familjet të kuptojnë ku po harxhohet energjia elektrike duke analizuar pajisjet, zakonet dhe faturat — pastaj i kthen këto në rekomandime personale kursimi dhe verifikim faturash.",
      en: "EcoWatt AI Web helps households understand where electricity is being wasted by analyzing appliances, habits, and bills — then turning that into personalized savings recommendations and bill verification insights.",
    },
    tryDemo: { sq: "Provo Demo", en: "Try Demo" },
    howItWorks: { sq: "Si Funksionon", en: "See How It Works" },
    stat1: { sq: "Më pak humbje energjie", en: "Less wasted electricity" },
    stat2: { sq: "Kursim mesatar mujor", en: "Avg. monthly savings" },
    stat3: { sq: "Saktësi verifikimi fature", en: "Bill accuracy check" },
    dashTitle: { sq: "Paneli i Analizës AI", en: "AI Analysis Dashboard" },
    live: { sq: "Live", en: "Live" },
    wasteFound: { sq: "Humbje e Gjetur", en: "Waste Found" },
    potentialSavings: { sq: "Kursime Potenciale", en: "Potential Savings" },
    energyScore: { sq: "Pikët e Energjisë", en: "Energy Score" },
    uploadBill: { sq: "Ngarko Foto Faturën", en: "Upload Bill Photo" },
    scanAppliances: { sq: "Skano Pajisjet", en: "Scan Appliances" },
    billVerification: { sq: "Verifikim Fature", en: "Bill Verification" },
    aiInsight: {
      sq: "Fatura juaj tregon 18% më shumë përdorim ditën sesa pritej. Mundësi problemi me tarifën.",
      en: "Your bill shows 18% higher daytime usage than expected. Possible tariff issue detected.",
    },
  },

  // Problem
  problem: {
    label: { sq: "Problemi", en: "The Problem" },
    title: { sq: "Problemi", en: "The Problem" },
    desc: {
      sq: "Shumë familje kanë fatura të larta të energjisë elektrike por nuk dinë cilat pajisje ose zakone shkaktojnë më shumë humbje. Verifikimi i faturave dhe sjelljes së tarifave është pothuajse i pamundur pa mjete të shtrenjta.",
      en: "Many households have high electricity bills but don't know which appliances or habits cause the most waste. Verifying bills and tariff behavior is nearly impossible without expensive tools.",
    },
    items: [
      { title: { sq: "Përdorim i tepërt i AC/ngrohjes", en: "AC & heating overuse" }, desc: { sq: "Ngrohja ose ftohja funksionon më gjatë se duhet pa e kuptuar humbjen", en: "Running heating or cooling longer than needed without realizing the waste" } },
      { title: { sq: "Pajisje në standby", en: "Devices on standby" }, desc: { sq: "TV-të dhe konzolat harxhojnë energji gjatë gjithë kohës në modalitetin standby", en: "TVs and consoles drawing power around the clock in standby mode" } },
      { title: { sq: "Karikues të lënë në prizë", en: "Chargers left plugged in" }, desc: { sq: "Karikuesit e telefonit dhe laptopit vazhdojnë të harxhojnë energji edhe pas mbushjes", en: "Phone and laptop chargers keep drawing power even after full charge" } },
      { title: { sq: "Zakone jo-efikase", en: "Inefficient habits" }, desc: { sq: "Dritat e lëna ndezur, pajisjet që funksionojnë pa nevojë gjatë ditës", en: "Lights left on, appliances running unnecessarily throughout the day" } },
      { title: { sq: "Pa qartësi fature", en: "No bill clarity" }, desc: { sq: "Shumica nuk mund të tregojnë çka po e rrit faturën e energjisë", en: "Most people can't tell what's actually driving their electricity bill up" } },
      { title: { sq: "Fatura të dyshimta", en: "Suspected abnormal bills" }, desc: { sq: "Përdoruesit mund të dyshojnë probleme me faturën por nuk kanë mënyrë ta verifikojnë", en: "Users may suspect billing issues but have no way to verify them" } },
      { title: { sq: "Probleme me ndërrimin e tarifës", en: "Tariff switching issues" }, desc: { sq: "Tarifat ditë/natë mund të mos ndërrohen saktë, duke shkaktuar tarifa më të larta", en: "Day/night tariffs may not switch correctly, leading to higher charges" } },
      { title: { sq: "Kosto e pajisjeve", en: "Hardware costs" }, desc: { sq: "Prizat inteligjente dhe sensorët janë të shtrenjtë, duke e bërë monitorimin jorealist për shumë familje", en: "Smart plugs and sensors are expensive, making monitoring unrealistic for many" } },
    ],
  },

  // Solution
  solution: {
    label: { sq: "Zgjidhja", en: "The Solution" },
    title: { sq: "Zgjidhja", en: "The Solution" },
    desc: {
      sq: "EcoWatt AI Web është një platformë e fuqizuar nga AI për analizimin e humbjeve të energjisë elektrike dhe verifikimin e faturave. Përdoruesit futin informacione bazë, dhe AI vlerëson burimet e humbjeve, detekton anomali, verifikon tarifat, dhe ofron një plan veprimi.",
      en: "EcoWatt AI Web is an AI-powered electricity waste analyzer and bill verification platform. Users enter basic household info, and the AI estimates waste sources, detects bill anomalies, verifies tariffs, and delivers a personalized action plan.",
    },
    items: [
      { title: { sq: "Analizues Humbjesh me AI", en: "AI Waste Analyzer" }, desc: { sq: "Fusni detajet e amvisërisë dhe AI vlerëson ku po harxhohet më shumë energjia.", en: "Enter your household details and the AI estimates where electricity is most likely being wasted." } },
      { title: { sq: "Verifikim Fature", en: "Bill Verification" }, desc: { sq: "Ngarkoni faturat dhe AI detekton anomali, verifikon tarifat dhe sinjalizon tarifa të dyshimta.", en: "Upload your bills and the AI detects anomalies, verifies tariff patterns, and flags suspicious charges." } },
      { title: { sq: "Plan Veprimi Personal", en: "Personalized Action Plan" }, desc: { sq: "Merrni rekomandime të renditura sipas ndikimit, vlerësime kursimi dhe mjete ankese — pa pajisje.", en: "Get ranked recommendations, savings estimates, and complaint tools — all without hardware." } },
    ],
  },

  // How It Works
  howItWorks: {
    label: { sq: "Procesi", en: "Process" },
    title: { sq: "Si Funksionon", en: "How It Works" },
    steps: [
      { title: { sq: "Të Dhënat", en: "User Input" }, desc: { sq: "Lista e pajisjeve, zakonet ditore, sjellja standby, fatura mujore, madhësia e shtëpisë, ngarkimi i faturave dhe fotove.", en: "Appliance list, daily habits, standby behavior, monthly bill, home size, bill uploads, and device photos." } },
      { title: { sq: "Analiza AI", en: "AI Analysis" }, desc: { sq: "Vlerëson modelet e konsumit, burimet e mundshme të humbjeve, sjelljen e dyshimtë të faturave dhe anomalitë tarifore.", en: "Estimates consumption patterns, likely waste sources, suspicious bill behavior, and tariff anomalies." } },
      { title: { sq: "Njohuri & Kursime", en: "Insights & Savings" }, desc: { sq: "Identifikon zonat më të mëdha të humbjeve dhe vlerëson kursimet e mundshme në para dhe energji.", en: "Identifies biggest waste areas and estimates possible money and energy savings." } },
      { title: { sq: "Plani i Veprimit", en: "Action Plan" }, desc: { sq: "Rekomandime personale të renditura sipas ndikimit, plus mjete verifikimi faturash dhe ankesash.", en: "Personalized recommendations ranked by impact, plus bill verification and complaint tools." } },
    ],
  },

  // Smart Appliance Setup
  applianceSetup: {
    label: { sq: "Fillimi", en: "Onboarding" },
    title: { sq: "Konfigurimi i Pajisjeve", en: "Smart Appliance Setup" },
    desc: {
      sq: "Pas regjistrimit, krijoni profilin energjetik të amvisërisë. Shtoni pajisje manualisht ose fotografoni dhe lini AI-n t'i identifikojë.",
      en: "After signing up, create your household energy profile. Add appliances manually or snap a photo and let AI identify them for you.",
    },
    manualTitle: { sq: "Shtimi Manual i Pajisjeve", en: "Manual Device Entry" },
    manualItems: [
      { sq: "Lloji i pajisjes (TV, AC, frigorifer, ngrohës…)", en: "Device type (TV, AC, fridge, heater…)" },
      { sq: "Marka & modeli", en: "Brand & model" },
      { sq: "Sasia & përdorimi ditor i vlerësuar", en: "Quantity & estimated daily usage" },
      { sq: "Sjellja në standby", en: "Standby behavior" },
      { sq: "Dhoma / vendndodhja", en: "Room / location" },
    ],
    photoTitle: { sq: "Shtim me Foto", en: "Photo-Based Device Input" },
    photoDesc: {
      sq: "Fotografoni ose ngarkoni imazhin e pajisjes. AI identifikon llojin, markën dhe kategorinë — ju konfirmoni ose ndryshoni para se të ruani.",
      en: "Take a photo or upload an image of your appliance. AI identifies the device type, brand, and category — you confirm or edit before saving.",
    },
    detections: [
      { sq: "Samsung TV u detektua nga imazhi i ngarkuar", en: "Samsung TV detected from uploaded image" },
      { sq: "AC split u njoh — u shtua te pajisjet ftohëse", en: "Split AC unit recognized — added to cooling devices" },
      { sq: "Karikues telefoni u identifikua si pajisje ditore me fuqi të ulët", en: "Phone charger identified as low-power daily-use device" },
    ],
  },

  // Smart Input
  smartInput: {
    label: { sq: "Të Dhënat", en: "Input" },
    title: { sq: "Na Tregoni Për Shtëpinë Tuaj", en: "Tell Us About Your Home" },
    desc: {
      sq: "Përgjigjuni disa pyetjeve të thjeshta dhe ngarkoni faturën ose fotot e pajisjeve — AI bën pjesën tjetër.",
      en: "Answer a few simple questions and upload your bill or device photos — the AI handles the rest.",
    },
    inputs: [
      { label: { sq: "Numri i TV-ve", en: "Number of TVs" } },
      { label: { sq: "Orë AC/ngrohje në ditë", en: "AC or heating use per day" } },
      { label: { sq: "Numri i karikuesve", en: "Number of chargers" } },
      { label: { sq: "A qëndrojnë pajisjet në standby natën?", en: "Do devices stay on standby overnight?" } },
      { label: { sq: "Fatura mujore e energjisë (€)", en: "Monthly electricity bill (€)" } },
      { label: { sq: "Madhësia e shtëpisë (m²)", en: "Home size (m²)" } },
      { label: { sq: "Anëtarë të amvisërisë", en: "Household members" } },
    ],
    uploadBill: { sq: "Ngarko Faturën", en: "Upload Bill" },
    uploadBillDesc: { sq: "PDF ose foto e faturës tuaj të energjisë", en: "PDF or photo of your electricity bill" },
    uploadPhoto: { sq: "Ngarko Foto Pajisje", en: "Upload Device Photo" },
    uploadPhotoDesc: { sq: "AI identifikon pajisjen tuaj", en: "AI identifies your appliance" },
    analyzeBtn: { sq: "Analizo Shtëpinë Time", en: "Analyze My Home" },
  },

  // Demo / Results
  demo: {
    label: { sq: "Rezultatet AI", en: "AI Results" },
    title: { sq: "Paneli i Analizës AI", en: "Your AI Analysis Dashboard" },
    desc: {
      sq: "Ja çka zbulon AI rreth përdorimit të energjisë në amvisërinë tuaj — njohuri personale, detektim humbjesh dhe kursime vepruese.",
      en: "Here's what the AI discovers about your household's energy usage — personalized insights, waste detection, and actionable savings.",
    },
    biggestWaste: { sq: "Humbja Më e Madhe", en: "Biggest Waste" },
    ac: { sq: "Kondicioneri", en: "Air Conditioning" },
    kwhReduction: { sq: "Ulje kWh e Vlerësuar", en: "Est. kWh Reduction" },
    savings: { sq: "Kursime të Vlerësuara", en: "Est. Savings" },
    energyScore: { sq: "Pikët e Energjisë", en: "Energy Score" },
    co2: { sq: "CO₂ e Reduktuar", en: "CO₂ Reducible" },
    wasteDetected: { sq: "Humbje e Detektuar", en: "Waste Detected" },
    aiRecommendations: { sq: "Rekomandimet AI", en: "AI Recommendations" },
    topWaste: { sq: "Burimet Kryesore të Humbjeve", en: "Top Waste Sources" },
    weeklyTrend: { sq: "Trendi Javor i Përdorimit", en: "Weekly Usage Trend" },
    recommendations: [
      { text: { sq: "Kondicioneri ka gjasa të jetë drejtuesi kryesor i energjisë tuaj.", en: "Air conditioning is likely your largest electricity driver." }, impact: { sq: "I lartë", en: "High" } },
      { text: { sq: "Dy TV duket se qëndrojnë në standby gjatë natës.", en: "Two TVs appear to remain on standby overnight." }, impact: { sq: "Mesatar", en: "Medium" } },
      { text: { sq: "Karikuesit e lënë në prizë çdo ditë mund të kontribuojnë në përdorim standby.", en: "Chargers left plugged in daily may contribute to avoidable standby use." }, impact: { sq: "I ulët", en: "Low" } },
      { text: { sq: "Ulja e përdorimit të AC me 1 orë në ditë mund të kursejë €6–€9 në muaj.", en: "Reducing AC use by 1 hour per day could save an estimated €6–€9 per month." }, impact: { sq: "I lartë", en: "High" } },
    ],
    wasteLabels: [
      { sq: "Kondicioneri", en: "Air conditioning" },
      { sq: "Pajisjet standby", en: "Standby devices" },
      { sq: "Ndriçimi", en: "Lighting" },
      { sq: "Ngrohësi i ujit", en: "Water heater" },
      { sq: "Të tjera", en: "Other" },
    ],
    impactLabel: { sq: "ndikim", en: "impact" },
    days: {
      sq: ["H", "Ma", "Më", "E", "P", "Sh", "D"],
      en: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },

  // Bill Checker
  billChecker: {
    label: { sq: "Verifikim", en: "Verification" },
    title: { sq: "Kontrollues Fature", en: "Bill Checker" },
    desc: {
      sq: "Ngarkoni faturën e energjisë si foto ose PDF. AI e lexon, ndan tarifën ditë kundrejt natës, konsumin kundrejt kostos, dhe ju tregon nëse diçka duket jonormale.",
      en: "Upload your electricity bill as a photo or PDF. AI reads it, separates day vs night tariff, consumption vs cost, and tells you if anything looks abnormal.",
    },
    uploadTitle: { sq: "Ngarkoni Faturën Tuaj", en: "Upload Your Bill" },
    dropText: { sq: "Vendoseni faturën këtu ose klikoni për ngarkim", en: "Drop your bill here or click to upload" },
    dropDesc: { sq: "PDF, JPG, PNG — AI OCR e lexon automatikisht", en: "PDF, JPG, PNG — AI OCR reads it automatically" },
    dayTariff: { sq: "Tarifa Ditës", en: "Day Tariff" },
    nightTariff: { sq: "Tarifa Natës", en: "Night Tariff" },
    aiAnalysis: { sq: "Analiza AI e Faturës", en: "AI Bill Analysis" },
    verdict: { sq: "Vendimi", en: "Verdict" },
    reviewRecommended: { sq: "Rishikimi Rekomandohet", en: "Review Recommended" },
    verdictDesc: {
      sq: "Disa modele sugjerojnë tarifa më të larta se sa pritej gjatë periudhave të tarifës së lartë.",
      en: "Some patterns suggest higher-than-expected charges during peak tariff periods.",
    },
    results: [
      { text: { sq: "Tarifat ditore duken normale", en: "Day tariff charges look normal" }, status: "ok" },
      { text: { sq: "Devijim i dyshimtë: përdorim shumë i lartë gjatë periudhave me tarifë të shtrenjtë", en: "Suspicious deviation: unusually high usage during expensive tariff periods" }, status: "warning" },
      { text: { sq: "Konsumi i tarifës natën brenda pritshmërive", en: "Night tariff consumption within expected range" }, status: "ok" },
      { text: { sq: "Fatura totale është 12% mbi pritshmëritë për këtë profil amvisërie", en: "Total bill is 12% above expected for this household profile" }, status: "warning" },
    ],
  },

  // Day/Night Verifier
  dayNight: {
    label: { sq: "Kontrolli Tarifor", en: "Tariff Check" },
    title: { sq: "Verifikuesi Ditë/Natë", en: "Day/Night Verifier" },
    desc: {
      sq: "Kontrolloni njehsorin në një kohë specifike dhe regjistroni nëse u ndërrua në tarifën e duhur. AI detekton probleme të përsëritura si ndërrimi i vonuar i tarifës.",
      en: "Check your meter at a specific time and record whether it switched to the correct tariff. AI detects recurring issues like late tariff switches.",
    },
    logTitle: { sq: "Regjistri i Ndërrimit të Tarifës", en: "Tariff Switch Log" },
    expected: { sq: "Pritej", en: "Expected" },
    actual: { sq: "Aktuale", en: "Actual" },
    day: { sq: "Ditë", en: "Day" },
    night: { sq: "Natë", en: "Night" },
    aiAnalysis: { sq: "Analiza AI: Ndërrim i vonuar i tarifës i përsëritur detektuar", en: "AI Analysis: Recurring late tariff switch detected" },
    aiDesc: {
      sq: "Tarifa e natës duket se aktivizohet 15–30 minuta vonë disa ditë. Kjo mund të rezultojë në tarifa më të larta.",
      en: "Night tariff appears to activate 15–30 minutes late on some days. This may result in higher charges.",
    },
  },

  // Consumption Analyzer
  consumption: {
    label: { sq: "Trendet", en: "Trends" },
    title: { sq: "Analizuesi i Modeleve të Konsumit", en: "Consumption Pattern Analyzer" },
    desc: {
      sq: "Duke përdorur 3–6 muaj fatura, AI detekton ndryshime të papritura dhe raportet jonormale ditë/natë krahasuar me amvisëri të ngjashme.",
      en: "Using 3–6 months of bills, the AI detects unexpected changes and unusual day/night usage ratios compared to similar households.",
    },
    chartTitle: { sq: "Pasqyra e Konsumit 6-Mujor", en: "6-Month Consumption Overview" },
    alert1: {
      sq: "Dhjetori tregon rritje jonormale 21% në konsum krahasuar me muajin paraardhës.",
      en: "December shows an abnormal 21% increase in consumption compared to the previous month.",
    },
    alert2: {
      sq: "Përdorimi i marsit është 35% mbi mesataren tuaj 6-mujore. Raporti ditë/natë është i pazakonshëm për këtë lloj amvisërie.",
      en: "March usage is 35% above your 6-month average. The day/night ratio is unusual for this household type.",
    },
    comparison: {
      sq: "AI krahason modelet tuaja me përdorimin tipik për amvisëri me madhësi të ngjashme në rajonin tuaj.",
      en: "AI compares your patterns against typical usage for similar-sized households in your region.",
    },
  },

  // Community Map
  community: {
    label: { sq: "Komuniteti", en: "Community" },
    title: { sq: "Harta e Komunitetit", en: "Community Map" },
    desc: {
      sq: "Përdoruesit mund të raportojnë probleme të dyshuara me njehsorin. Kur shumë përdorues në të njëjtin zonë raportojnë çështje, mund të tregojë problem sistemik — duke krijuar dëshmi publike.",
      en: "Users can report suspected meter problems. When many users in the same area report issues, it may point to a broader systemic problem — creating public evidence and awareness.",
    },
    heatmap: { sq: "Harta e Ankesave", en: "Report Heatmap" },
    simulated: { sq: "Dendësia e simuluar e ankesave në lagje", en: "Simulated neighborhood complaint density" },
    areaReports: { sq: "Raportet e Zonës", en: "Area Reports" },
    reportsSubmitted: { sq: "raporte të dorëzuara", en: "reports submitted" },
    reportBtn: { sq: "Raporto Problemin Tim me Njehsor", en: "Report My Meter Issue" },
    areas: [
      { area: { sq: "Lagja 4 — Rruga e Plepit", en: "District 4 — Elm Street" }, status: { sq: "Shqetësim i lartë", en: "High concern" } },
      { area: { sq: "Lagja 7 — Bulevardi Diellit", en: "District 7 — Oak Avenue" }, status: { sq: "Mesatar", en: "Moderate" } },
      { area: { sq: "Lagja 2 — Rruga e Lumit", en: "District 2 — River Road" }, status: { sq: "Nën rishikim", en: "Under review" } },
      { area: { sq: "Lagja 9 — Rruga e Parkut", en: "District 9 — Park Lane" }, status: { sq: "I ulët", en: "Low" } },
    ],
  },

  // Auto Complaint
  complaint: {
    label: { sq: "Veprim", en: "Action" },
    title: { sq: "Gjenerues Automatik Ankesash", en: "Auto Complaint Generator" },
    desc: {
      sq: "Bazuar në analizën e faturës dhe anomalitë e detektuara, sistemi gjeneron një ankesë formale, të bazuar në fakte, gati për t'u dërguar te furnizuesi i energjisë.",
      en: "Based on bill analysis and detected anomalies, the system generates a formal, evidence-based complaint ready to send to your electricity provider.",
    },
    draftTitle: { sq: "Drafti i Ankesës së Gjeneruar", en: "Generated Complaint Draft" },
    subject: { sq: "Subjekti", en: "Subject" },
    subjectText: { sq: "Ankesë Formale — Anomali të Dyshimta në Faturimin e Energjisë", en: "Formal Complaint — Suspicious Electricity Billing Anomalies" },
    greeting: { sq: "I/E nderuar Shërbimi i Klientëve,", en: "Dear Customer Service," },
    body: {
      sq: "Po ju shkruaj për të raportuar modele të dyshimta të identifikuara në faturat e mia të fundit të energjisë. Analiza e të dhënave të konsumit tim nga tetori 2025 deri në mars 2026 zbulon anomalitë e mëposhtme:",
      en: "I am writing to report suspicious patterns identified in my recent electricity bills. Analysis of my consumption data from October 2025 to March 2026 reveals the following anomalies:",
    },
    bullets: [
      { sq: "Dhjetor 2025: rritje e papritur 21% në konsum pa ndryshim në sjelljen e amvisërisë", en: "December 2025: 21% unexpected increase in consumption with no change in household behavior" },
      { sq: "Mars 2026: Përdorimi 35% mbi mesataren 6-mujore", en: "March 2026: Usage 35% above the 6-month average" },
      { sq: "Ndërrimi i tarifës natën i detektuar me vonesë 15–30 minuta në disa raste", en: "Night tariff switch detected as delayed by 15–30 minutes on multiple occasions" },
      { sq: "Konsumi ditor i faturuar me tarifa kulmore gjatë orareve të pritura si jokulmore", en: "Daytime consumption charged at peak rates during expected off-peak hours" },
    ],
    closing: {
      sq: "Kërkoj rishikim të njehsorit dhe regjistrave të faturimit. Analiza mbështetëse e të dhënave është bashkangjitur.",
      en: "I request a review of my meter and billing records. Supporting data analysis is attached.",
    },
    sendBtn: { sq: "Dërgo te Furnizuesi", en: "Send to Provider" },
    downloadBtn: { sq: "Shkarko PDF", en: "Download PDF" },
    includesNote: {
      sq: "Ankesa përfshin data specifike, modele dhe analizë mbështetëse",
      en: "Complaint includes specific dates, patterns, and supporting analysis",
    },
  },

  // Bill Anomaly Alerts
  anomaly: {
    label: { sq: "Alarmet", en: "Alerts" },
    title: { sq: "Alarmet e Anomalive të Faturës", en: "Bill Anomaly Alerts" },
    desc: {
      sq: "Vendosni mesataren e pritur të faturës. Sistemi ju alarmon kur përdorimi tejkalon pragun normal që të reagoni shpejt.",
      en: "Set your expected bill average. The system alerts you when usage exceeds normal thresholds so you can react quickly instead of discovering issues months later.",
    },
    threshold: { sq: "Pragu i Alarmit", en: "Alert Threshold" },
    current: { sq: "Aktuale", en: "Current" },
    alerts: [
      { text: { sq: "Përdorimi i këtij muaji është 18% mbi modelin tuaj normal", en: "This month's usage is 18% above your normal pattern" }, type: "warning", date: { sq: "Mars 2026", en: "March 2026" } },
      { text: { sq: "Anomali e mundshme: përdorim i lartë ditor gjatë periudhave me tarifë të shtrenjtë", en: "Possible anomaly: high daytime usage during expensive tariff periods" }, type: "warning", date: { sq: "Mars 2026", en: "March 2026" } },
      { text: { sq: "Fatura e shkurtit duket normale bazuar në 4 muajt e mëparshëm", en: "February bill looks normal based on your previous 4 months" }, type: "ok", date: { sq: "Shkurt 2026", en: "February 2026" } },
      { text: { sq: "Konsumi i janarit brenda pritshmërive", en: "January consumption within expected range" }, type: "ok", date: { sq: "Janar 2026", en: "January 2026" } },
    ],
  },

  // Smart Bill Verification
  smartBill: {
    label: { sq: "Inteligjenca e Faturës", en: "Bill Intelligence" },
    title: { sq: "Verifikim Inteligjent i Faturës", en: "Smart Bill Verification" },
    desc: {
      sq: "Një tërësi e plotë mjetesh të fuqizuara nga AI për ngarkimin, analizimin, verifikimin, krahasimin dhe veprimin mbi faturat tuaja.",
      en: "A complete suite of AI-powered tools to upload, analyze, verify, compare, and act on your electricity bills.",
    },
    features: [
      { title: { sq: "Ngarko Faturat", en: "Upload Bills" }, desc: { sq: "Ngarkoni faturën e energjisë si foto ose PDF për analizë të menjëhershme AI.", en: "Upload your electricity bill as a photo or PDF for instant AI analysis." } },
      { title: { sq: "Detekto Modele", en: "Detect Unusual Patterns" }, desc: { sq: "AI identifikon devijime të dyshimta në konsum dhe kosto.", en: "AI identifies suspicious deviations in consumption and cost." } },
      { title: { sq: "Verifiko Tarifën Ditë/Natë", en: "Verify Day vs Night Tariff" }, desc: { sq: "Kontrolloni nëse njehsori ndërron tarifat saktë.", en: "Check whether your meter switches tariffs correctly." } },
      { title: { sq: "Krahaso Muajt", en: "Compare Past Months" }, desc: { sq: "Krahasoni përdorimin aktual me të dhënat historike për të dalluar trendet.", en: "Compare current usage with historical data to spot trends." } },
      { title: { sq: "Gjenero Ankesa", en: "Generate Complaints" }, desc: { sq: "Krijoni automatikisht dokumente formale ankesash të bazuara në fakte.", en: "Automatically create formal, evidence-based complaint documents." } },
      { title: { sq: "Merr Alarme Anomalish", en: "Receive Anomaly Alerts" }, desc: { sq: "Njoftohuni kur faturat tejkalojnë pragun tuaj normal.", en: "Get notified when bills exceed your normal threshold." } },
    ],
    exampleTitle: { sq: "Shembuj të Rezultateve AI", en: "Example AI Outputs" },
    outputs: [
      { sq: "Kjo faturë duket normale bazuar në 4 muajt e mëparshëm", en: "This bill looks normal based on your previous 4 months" },
      { sq: "Anomali e mundshme: përdorim i lartë ditor gjatë periudhave me tarifë të shtrenjtë", en: "Possible anomaly: high daytime usage during expensive tariff periods" },
      { sq: "Tarifa e natës duket se aktivizohet më vonë se sa pritej", en: "Night tariff appears to be activating later than expected" },
      { sq: "Përdorimi i këtij muaji është 18% mbi modelin tuaj normal", en: "This month's usage is 18% above your normal pattern" },
      { sq: "Drafti i ankesës u gjenerua me analizë mbështetëse", en: "Complaint draft generated with supporting analysis" },
    ],
  },

  // Features
  features: {
    label: { sq: "Veçoritë", en: "Features" },
    title: { sq: "Gjithçka që Ju Nevojitet", en: "Everything You Need" },
    items: [
      { title: { sq: "Detektim Personal Humbjesh", en: "Personalized Waste Detection" }, desc: { sq: "AI vlerëson ku amvisëria juaj humbet më shumë energji.", en: "AI estimates where your specific household wastes the most electricity." } },
      { title: { sq: "Njohuri Përdorimi Pajisjesh", en: "Appliance Usage Insights" }, desc: { sq: "Kuptoni cilat pajisje konsumojnë më shumë dhe kur.", en: "Understand which appliances consume the most and when." } },
      { title: { sq: "Vlerësim Kursimesh", en: "Savings Estimation" }, desc: { sq: "Shikoni sa para dhe energji mund të kurseni çdo muaj.", en: "See how much money and energy you could save each month." } },
      { title: { sq: "Pikët e Energjisë", en: "Energy Score" }, desc: { sq: "Rezultat dinamik që vlerëson efikasitetin energjetik.", en: "A dynamic score rating your household's energy efficiency." } },
      { title: { sq: "Plan Veprimi i Prioritizuar", en: "Prioritized Action Plan" }, desc: { sq: "Rekomandime të renditura sipas ndikimit dhe lehtësisë.", en: "Recommendations ranked by impact and ease of implementation." } },
      { title: { sq: "Pa Nevojë për Pajisje", en: "No Hardware Required" }, desc: { sq: "Funksionon me informacionet që tashmë i keni.", en: "Works with information you already have — no sensors needed." } },
      { title: { sq: "Konfigurim i Lehtë", en: "Easy Household Setup" }, desc: { sq: "Fillim i thjeshtë për krijimin e profilit energjetik.", en: "Simple onboarding to create your energy profile in minutes." } },
      { title: { sq: "Njohje Pajisjesh me AI", en: "AI Appliance Recognition" }, desc: { sq: "Fotografoni dhe AI identifikon pajisjen automatikisht.", en: "Snap a photo and the AI identifies your device automatically." } },
      { title: { sq: "Kontrollues Fature", en: "Bill Checker" }, desc: { sq: "Ngarkoni faturën dhe AI verifikon tarifat.", en: "Upload your bill and AI verifies charges and tariff accuracy." } },
      { title: { sq: "Verifikues Ditë/Natë", en: "Day/Night Verifier" }, desc: { sq: "Detektoni nëse njehsori ndërron tarifat në kohën e duhur.", en: "Detect whether your meter switches tariffs at the correct times." } },
      { title: { sq: "Analizues Konsumi", en: "Consumption Analyzer" }, desc: { sq: "Analizoni muaj faturash për ndryshime të papritura.", en: "Analyze months of bills for unexpected consumption changes." } },
      { title: { sq: "Harta e Komunitetit", en: "Community Map" }, desc: { sq: "Raportoni dhe vizualizoni probleme me njehsor në lagje.", en: "Report and visualize meter issues across neighborhoods." } },
      { title: { sq: "Gjenerues Ankesash", en: "Auto Complaint Generator" }, desc: { sq: "Gjeneroni ankesa formale automatikisht.", en: "Generate formal, evidence-based complaints automatically." } },
      { title: { sq: "Alarme Anomalish", en: "Bill Anomaly Alerts" }, desc: { sq: "Njoftohuni kur fatura tejkalon pragun normal.", en: "Get alerted when your bill exceeds normal thresholds." } },
    ],
  },

  // Impact
  impact: {
    label: { sq: "Ndikimi", en: "Impact" },
    title: { sq: "Si Krijon Vlerë EcoWatt AI Web", en: "How EcoWatt AI Web Creates Value" },
    metrics: [
      { suffix: " kWh", label: { sq: "Kursime të vlerësuara këtë muaj", en: "Estimated savings this month" } },
      { prefix: "€", suffix: "", label: { sq: "Para të kursuara", en: "Money saved" } },
      { suffix: "%", label: { sq: "Ulje e humbjeve të energjisë", en: "Lower electricity waste" } },
      { suffix: " kg", label: { sq: "CO₂ e shmangur", en: "CO₂ avoided" } },
    ],
  },

  // Why It Matters
  whyItMatters: {
    label: { sq: "Vlera", en: "Value" },
    title: { sq: "Pse Ka Rëndësi", en: "Why It Matters" },
    items: [
      { title: { sq: "Fatura më të ulëta", en: "Lower electricity bills" }, desc: { sq: "Identifikoni dhe eliminoni humbjet e fshehura për ulje kostosh.", en: "Identify and eliminate hidden waste to reduce monthly costs." } },
      { title: { sq: "Ulje e përdorimit të panevojshëm", en: "Reduce unnecessary energy use" }, desc: { sq: "Hiqni konsumin që nuk shërben asnjë qëllim.", en: "Cut consumption that serves no purpose in your daily life." } },
      { title: { sq: "Qëndrueshmëri e arritshme", en: "Accessible sustainability" }, desc: { sq: "Bëjeni jetesën e qëndrueshme praktike për çdo amvisëri.", en: "Make sustainable living practical for every household." } },
      { title: { sq: "Zakone më të mira energjetike", en: "Better energy habits" }, desc: { sq: "Ndërtoni vetëdije për zakonet ditore që nxisin konsumin.", en: "Build awareness of daily habits that drive consumption." } },
      { title: { sq: "Pa pajisje të shtrenjta", en: "No expensive hardware" }, desc: { sq: "Alternativë me kosto të ulët ndaj sistemeve me sensorë.", en: "A low-cost alternative to sensor-based smart home systems." } },
      { title: { sq: "Besim në faturë", en: "Bill confidence" }, desc: { sq: "Jepni përdoruesve më shumë besim rreth faturave dhe sjelljes së njehsorit.", en: "Give users more confidence about their bills and meter behavior." } },
    ],
  },

  // SDG
  sdg: {
    label: { sq: "SDG 7", en: "SDG 7" },
    title: { sq: "Ndërtuar për SDG 7", en: "Built for SDG 7" },
    desc: {
      sq: "EcoWatt AI Web mbështet SDG 7: Energji e Përballueshme dhe e Pastër duke ndihmuar amvisëritë të përmirësojnë efikasitetin energjetik, ulin humbjet e shmangshme të energjisë elektrike, dhe kuptojnë më mirë konsumin — pa pajisje të shtrenjta.",
      en: "EcoWatt AI Web supports SDG 7: Affordable and Clean Energy by helping households improve energy efficiency, reduce avoidable electricity waste, and better understand electricity consumption — without expensive hardware.",
    },
    items: [
      { sq: "Përmirëso efikasitetin energjetik", en: "Improve energy efficiency" },
      { sq: "Ul humbjet e energjisë", en: "Reduce electricity waste" },
      { sq: "Kupto konsumin", en: "Understand consumption" },
    ],
  },

  // Responsible AI
  responsibleAI: {
    label: { sq: "Etika", en: "Ethics" },
    title: { sq: "AI e Përgjegjshme", en: "Responsible AI" },
    items: [
      { title: { sq: "Vlerësime, Jo Përsosmëri", en: "Estimates, Not Perfection" }, desc: { sq: "Sistemi ofron vlerësime dhe rekomandime, jo monitorim perfekt në kohë reale.", en: "The system provides estimates and recommendations, not perfect real-time monitoring." } },
      { title: { sq: "Kontrolli i Përdoruesit", en: "User Control" }, desc: { sq: "Përdoruesit mbajnë kontrollin e të gjitha vendimeve.", en: "Users stay in control of all decisions and actions." } },
      { title: { sq: "Trajtim i Kujdesshëm i të Dhënave", en: "Careful Data Handling" }, desc: { sq: "Të dhënat trajtohen me kujdes me mbledhje minimale.", en: "Data entered is handled carefully with minimal collection." } },
      { title: { sq: "Njohje me Përpjekje të Mirë", en: "Best-Effort Recognition" }, desc: { sq: "Njohja e fotos ofron identifikim me përpjekjen më të mirë — përdoruesit mund të rishikojnë.", en: "Photo recognition provides best-effort identification — users can review and correct." } },
      { title: { sq: "AI Transparente", en: "Transparent AI" }, desc: { sq: "AI është dizajnuar të jetë praktike, transparente dhe e arritshme.", en: "The AI is designed to be practical, transparent, and accessible." } },
      { title: { sq: "Mbështetëse, Jo Zyrtare", en: "Supportive, Not Official" }, desc: { sq: "Analiza e faturës mbështet përdoruesit por nuk zëvendëson verifikimin zyrtar.", en: "Bill analysis supports users but does not replace official verification." } },
    ],
  },

  // Future
  future: {
    label: { sq: "Rruga Përpara", en: "Roadmap" },
    title: { sq: "Çka Vjen Më Pas", en: "What Comes Next" },
    items: [
      { title: { sq: "Integrim me Njehsorë", en: "Smart Meter Integration" }, desc: { sq: "Integrim opsional me njehsorë inteligjentë për saktësi më të lartë.", en: "Optional integration with smart meters for enhanced accuracy." } },
      { title: { sq: "Analizë Faturash në Shkallë", en: "Bill Analysis at Scale" }, desc: { sq: "Analizë ngarkimi faturash për njohuri në shkallë të gjerë.", en: "Utility bill upload analysis for large-scale insights." } },
      { title: { sq: "Aplikacion Mobil", en: "Mobile App" }, desc: { sq: "Aplikacion i plotë mobil për menaxhim energjie kudo.", en: "Full mobile app for on-the-go energy management." } },
      { title: { sq: "Krahasime Lokale", en: "Local Comparisons" }, desc: { sq: "Krahasoni kursimet me amvisëri të ngjashme lokalisht.", en: "Compare energy savings with similar households locally." } },
      { title: { sq: "Programe Komunitare", en: "Community Programs" }, desc: { sq: "Sfida vetëdijesimi energjetik në shkolla dhe lagje.", en: "School and neighborhood energy awareness challenges." } },
      { title: { sq: "Integrim me Shtëpi Inteligjente", en: "Smart Home Integration" }, desc: { sq: "Integrim i ardhshëm me pajisje shtëpie inteligjente.", en: "Future integration with smart home devices for automation." } },
      { title: { sq: "Panele Qyteti", en: "City Dashboards" }, desc: { sq: "Raportim në nivel qyteti dhe panele efikasiteti energjetik.", en: "City-level reporting and energy efficiency dashboards." } },
    ],
  },

  // Footer
  footer: {
    sdg: { sq: "Mbështet SDG 7: Energji e Përballueshme dhe e Pastër", en: "Supporting SDG 7: Affordable and Clean Energy" },
    hackathon: { sq: "Ndërtuar për një hackathon AI fokusuar në qëndrueshmëri", en: "Built for a sustainability-focused AI hackathon" },
  },

  // KEDS Contact & Tariff
  keds: {
    label: { sq: "Furnizuesi", en: "Provider" },
    contactTitle: { sq: "Kontakti i Furnizuesit", en: "Provider Contact" },
    contactDesc: {
      sq: "Për çdo pyetje rreth faturave ose njehsorit tuaj, kontaktoni KEDS/KESCO drejtpërdrejt.",
      en: "For any questions about your bills or meter, contact KEDS/KESCO directly.",
    },
    phone: { sq: "Telefoni (pa pagesë, 24/7)", en: "Phone (toll free, 24/7)" },
    email: { sq: "Email", en: "Email" },
    office: { sq: "Zyra", en: "Office" },
    officeAddress: {
      sq: "Bulevardi Bill Clinton, Prishtinë 10000",
      en: "Bill Clinton Boulevard, Prishtina 10000",
    },
    tariffTitle: { sq: "Tarifat e Energjisë Elektrike 2026", en: "Electricity Tariffs 2026" },
    tariffDesc: {
      sq: "Çmimet e faturës për amvisëri nuk i vendos KEDS, por aprovohen nga ERO/ZRRE dhe zbatohen nga KESCO për furnizimin universal. Për vitin 2026, tarifat mbeten të njëjta si nga 1 maj 2025.",
      en: "Household electricity prices are not set by KEDS but approved by ERO/ZRRE and applied by KESCO for universal supply. For 2026, tariffs remain the same as from May 1, 2025.",
    },
    fixedFee: { sq: "Tarifa fikse mujore", en: "Monthly fixed fee" },
    dualMeter: { sq: "Njehsor Ditë/Natë (0.4 kV, 2 tarifa)", en: "Day/Night Meter (0.4 kV, 2-rate)" },
    singleMeter: { sq: "Njehsor me Një Tarifë (0.4 kV, 1 tarifë)", en: "Single-Rate Meter (0.4 kV, 1-rate)" },
    block1: { sq: "0–800 kWh (blloku i parë)", en: "0–800 kWh (first block)" },
    block2: { sq: "Mbi 800 kWh (blloku i dytë)", en: "Over 800 kWh (second block)" },
    day: { sq: "Ditë", en: "Day" },
    night: { sq: "Natë", en: "Night" },
    peakHours: { sq: "Orari i Tarifës së Lartë", en: "Peak Tariff Hours" },
    winter: { sq: "1 tetor – 31 mars: 07:00–22:00", en: "Oct 1 – Mar 31: 07:00–22:00" },
    summer: { sq: "1 prill – 30 shtator: 08:00–23:00", en: "Apr 1 – Sep 30: 08:00–23:00" },
    offPeak: { sq: "Koha tjetër llogaritet si tarifë e ulët.", en: "Other hours are calculated as off-peak tariff." },
  },

  // Sign Up page
  signUp: {
    title: { sq: "Krijo Llogarinë", en: "Create Account" },
    subtitle: {
      sq: "Filloni të analizoni energjinë e shtëpisë tuaj sot.",
      en: "Start analyzing your home energy today.",
    },
    firstName: { sq: "Emri", en: "First Name" },
    lastName: { sq: "Mbiemri", en: "Last Name" },
    email: { sq: "Email", en: "Email" },
    password: { sq: "Fjalëkalimi", en: "Password" },
    confirmPassword: { sq: "Konfirmo Fjalëkalimin", en: "Confirm Password" },
    city: { sq: "Qyteti", en: "City" },
    householdSize: { sq: "Anëtarë të amvisërisë", en: "Household members" },
    meterType: { sq: "Lloji i njehsorit", en: "Meter type" },
    meterDual: { sq: "Ditë/Natë (2 tarifa)", en: "Day/Night (2-rate)" },
    meterSingle: { sq: "Një tarifë", en: "Single-rate" },
    submitBtn: { sq: "Regjistrohu", en: "Sign Up" },
    alreadyAccount: { sq: "Keni tashmë llogari?", en: "Already have an account?" },
    logIn: { sq: "Kyçu", en: "Log in" },
    terms: {
      sq: "Duke u regjistruar, ju pranoni kushtet e shërbimit.",
      en: "By signing up, you agree to our terms of service.",
    },
  },

  // Language switcher
  langSwitch: {
    sq: "Shqip",
    en: "English",
  },
} as const;

export type TranslationKey = keyof typeof translations;
