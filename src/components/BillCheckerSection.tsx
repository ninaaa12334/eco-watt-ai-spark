import SectionWrapper from "./SectionWrapper";
import { FileSearch, Upload, Sun, Moon, AlertTriangle, CheckCircle } from "lucide-react";

const results = [
  { icon: CheckCircle, text: "Day tariff charges look normal", status: "ok" },
  { icon: AlertTriangle, text: "Suspicious deviation: unusually high usage during expensive tariff periods", status: "warning" },
  { icon: CheckCircle, text: "Night tariff consumption within expected range", status: "ok" },
  { icon: AlertTriangle, text: "Total bill is 12% above expected for this household profile", status: "warning" },
];

const BillCheckerSection = () => (
  <SectionWrapper id="bill-checker" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Verification</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Bill Checker</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Upload your electricity bill as a photo or PDF. AI reads it, separates day vs night tariff, consumption vs cost, and tells you if anything looks abnormal.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Upload Your Bill</h3>
        </div>
        <div className="border-2 border-dashed border-primary/30 rounded-xl p-10 text-center bg-primary/5">
          <FileSearch className="w-10 h-10 text-primary mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">Drop your bill here or click to upload</p>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG — AI OCR reads it automatically</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="p-4 rounded-xl bg-eco-warning/10">
            <Sun className="w-5 h-5 text-eco-warning mb-2" />
            <div className="text-xs text-muted-foreground">Day Tariff</div>
            <div className="text-lg font-bold font-display text-foreground">€42.60</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/10">
            <Moon className="w-5 h-5 text-secondary mb-2" />
            <div className="text-xs text-muted-foreground">Night Tariff</div>
            <div className="text-lg font-bold font-display text-foreground">€18.30</div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">AI Bill Analysis</h3>
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${r.status === "warning" ? "border-eco-warning/30 bg-eco-warning/5" : "border-eco-success/30 bg-eco-success/5"}`}>
              <r.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${r.status === "warning" ? "text-eco-warning" : "text-eco-success"}`} />
              <p className="text-sm text-foreground">{r.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-sm font-medium text-foreground">Verdict: <span className="text-eco-warning font-semibold">Review Recommended</span></p>
          <p className="text-xs text-muted-foreground mt-1">Some patterns suggest higher-than-expected charges during peak tariff periods.</p>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default BillCheckerSection;
