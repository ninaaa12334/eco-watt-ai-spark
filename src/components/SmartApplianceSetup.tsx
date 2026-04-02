import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Camera, PenLine, Tv, Wind, Smartphone, CheckCircle } from "lucide-react";

const detectionIcons = [Tv, Wind, Smartphone];

const SmartApplianceSetup = () => {
  const { lang, t } = useLanguage();
  const a = t.applianceSetup;

  return (
    <SectionWrapper id="appliance-setup" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{a.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{a.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{a.desc[lang]}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10">
              <PenLine className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{a.manualTitle[lang]}</h3>
          </div>
          <div className="space-y-3">
            {a.manualItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-4 h-4 text-eco-success flex-shrink-0" />
                <span className="text-sm text-foreground">{item[lang]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-secondary/10">
              <Camera className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{a.photoTitle[lang]}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5">{a.photoDesc[lang]}</p>
          <div className="space-y-3">
            {a.detections.map((d, i) => {
              const Icon = detectionIcons[i];
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{d[lang]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SmartApplianceSetup;
