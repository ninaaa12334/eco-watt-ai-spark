import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { ClipboardList, Brain, BarChart3, Zap } from "lucide-react";

const icons = [ClipboardList, Brain, BarChart3, Zap];

const HowItWorksSection = () => {
  const { lang, t } = useLanguage();
  const h = t.howItWorks;

  return (
    <SectionWrapper id="how-it-works">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{h.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{h.title[lang]}</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-6 relative">
        <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
        {h.steps.map((s, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="relative text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-primary/10 relative z-10">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary/50 font-display">{`0${i + 1}`}</span>
              <h3 className="font-display font-semibold text-foreground mt-1 mb-2">{s.title[lang]}</h3>
              <p className="text-sm text-muted-foreground">{s.desc[lang]}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default HowItWorksSection;
