import SectionWrapper from "./SectionWrapper";
import {
  Search, BarChart3, DollarSign, Award, ListChecks, Wifi,
  ClipboardList, Camera, FileSearch, Moon, TrendingUp, MapPin, FileText, Bell
} from "lucide-react";

const features = [
  { icon: Search, title: "Personalized Waste Detection", desc: "AI estimates where your specific household wastes the most electricity." },
  { icon: BarChart3, title: "Appliance Usage Insights", desc: "Understand which appliances consume the most and when." },
  { icon: DollarSign, title: "Savings Estimation", desc: "See how much money and energy you could save each month." },
  { icon: Award, title: "Energy Score", desc: "A dynamic score rating your household's energy efficiency." },
  { icon: ListChecks, title: "Prioritized Action Plan", desc: "Recommendations ranked by impact and ease of implementation." },
  { icon: Wifi, title: "No Hardware Required", desc: "Works with information you already have — no sensors needed." },
  { icon: ClipboardList, title: "Easy Household Setup", desc: "Simple onboarding to create your energy profile in minutes." },
  { icon: Camera, title: "AI Appliance Recognition", desc: "Snap a photo and the AI identifies your device automatically." },
  { icon: FileSearch, title: "Bill Checker", desc: "Upload your bill and AI verifies charges and tariff accuracy." },
  { icon: Moon, title: "Day/Night Verifier", desc: "Detect whether your meter switches tariffs at the correct times." },
  { icon: TrendingUp, title: "Consumption Analyzer", desc: "Analyze months of bills for unexpected consumption changes." },
  { icon: MapPin, title: "Community Map", desc: "Report and visualize meter issues across neighborhoods." },
  { icon: FileText, title: "Auto Complaint Generator", desc: "Generate formal, evidence-based complaints automatically." },
  { icon: Bell, title: "Bill Anomaly Alerts", desc: "Get alerted when your bill exceeds normal thresholds." },
];

const FeaturesSection = () => (
  <SectionWrapper id="features" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Everything You Need</h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {features.map((f, i) => (
        <div key={i} className="feature-card group">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
            <f.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default FeaturesSection;
