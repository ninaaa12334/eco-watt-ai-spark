import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { FileSearch, Upload, Sun, Moon, AlertTriangle, CheckCircle } from "lucide-react";

const BillCheckerSection = () => {
  const { lang, t } = useLanguage();
  const b = t.billChecker;

  return (
    <SectionWrapper id="bill-checker" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{b.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{b.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{b.desc[lang]}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{b.uploadTitle[lang]}</h3>
          </div>
          <div className="border-2 border-dashed border-primary/30 rounded-xl p-10 text-center bg-primary/5">
            <FileSearch className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">{b.dropText[lang]}</p>
            <p className="text-xs text-muted-foreground">{b.dropDesc[lang]}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="p-4 rounded-xl bg-eco-warning/10">
              <Sun className="w-5 h-5 text-eco-warning mb-2" />
              <div className="text-xs text-muted-foreground">{b.dayTariff[lang]}</div>
              <div className="text-lg font-bold font-display text-foreground">€42.60</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/10">
              <Moon className="w-5 h-5 text-secondary mb-2" />
              <div className="text-xs text-muted-foreground">{b.nightTariff[lang]}</div>
              <div className="text-lg font-bold font-display text-foreground">€18.30</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">{b.aiAnalysis[lang]}</h3>
          <div className="space-y-3">
            {b.results.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${r.status === "warning" ? "border-eco-warning/30 bg-eco-warning/5" : "border-eco-success/30 bg-eco-success/5"}`}>
                {r.status === "warning" ? <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-eco-warning" /> : <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-eco-success" />}
                <p className="text-sm text-foreground">{r.text[lang]}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl border border-primary/20 bg-primary/5">
            <p className="text-sm font-medium text-foreground">{b.verdict[lang]}: <span className="text-eco-warning font-semibold">{b.reviewRecommended[lang]}</span></p>
            <p className="text-xs text-muted-foreground mt-1">{b.verdictDesc[lang]}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BillCheckerSection;
