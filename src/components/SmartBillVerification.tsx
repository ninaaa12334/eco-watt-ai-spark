import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Upload, BarChart3, Moon, FileCheck, FileText, Bell } from "lucide-react";

const featureIcons = [Upload, BarChart3, Moon, FileCheck, FileText, Bell];

const SmartBillVerification = () => {
  const { lang, t } = useLanguage();
  const s = t.smartBill;

  return (
    <SectionWrapper id="smart-bill-verification" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{s.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{s.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{s.desc[lang]}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {s.features.map((f, i) => {
          const Icon = featureIcons[i];
          return (
            <div key={i} className="feature-card group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title[lang]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc[lang]}</p>
            </div>
          );
        })}
      </div>
      <div className="max-w-3xl mx-auto glass-card p-6 rounded-2xl">
        <h3 className="font-display font-semibold text-foreground mb-4">{s.exampleTitle[lang]}</h3>
        <div className="space-y-2">
          {s.outputs.map((o, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{i + 1}</span>
              <p className="text-sm text-foreground">"{o[lang]}"</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SmartBillVerification;
