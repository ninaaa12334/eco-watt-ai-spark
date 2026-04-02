import SectionWrapper from "./SectionWrapper";
import { FileCheck, Upload, BarChart3, Moon, FileText, Bell } from "lucide-react";

const features = [
  { icon: Upload, title: "Upload Bills", desc: "Upload your electricity bill as a photo or PDF for instant AI analysis." },
  { icon: BarChart3, title: "Detect Unusual Patterns", desc: "AI identifies suspicious deviations in consumption and cost." },
  { icon: Moon, title: "Verify Day vs Night Tariff", desc: "Check whether your meter switches tariffs correctly." },
  { icon: FileCheck, title: "Compare Past Months", desc: "Compare current usage with historical data to spot trends." },
  { icon: FileText, title: "Generate Complaints", desc: "Automatically create formal, evidence-based complaint documents." },
  { icon: Bell, title: "Receive Anomaly Alerts", desc: "Get notified when bills exceed your normal threshold." },
];

const outputs = [
  "This bill looks normal based on your previous 4 months",
  "Possible anomaly: high daytime usage during expensive tariff periods",
  "Night tariff appears to be activating later than expected",
  "This month's usage is 18% above your normal pattern",
  "Complaint draft generated with supporting analysis",
];

const SmartBillVerification = () => (
  <SectionWrapper id="smart-bill-verification" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Bill Intelligence</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Smart Bill Verification</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        A complete suite of AI-powered tools to upload, analyze, verify, compare, and act on your electricity bills.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
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

    <div className="max-w-3xl mx-auto glass-card p-6 rounded-2xl">
      <h3 className="font-display font-semibold text-foreground mb-4">Example AI Outputs</h3>
      <div className="space-y-2">
        {outputs.map((o, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{i + 1}</span>
            <p className="text-sm text-foreground">"{o}"</p>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default SmartBillVerification;
