import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, UserCheck, Eye, Lock, Camera, FileCheck } from "lucide-react";

const icons = [Shield, UserCheck, Lock, Camera, Eye, FileCheck];

const ResponsibleAISection = () => {
  const { lang, t } = useLanguage();
  const r = t.responsibleAI;

  return (
    <SectionWrapper id="responsible-ai">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{r.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{r.title[lang]}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {r.items.map((p, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="feature-card text-center">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 mx-auto mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-2">{p.title[lang]}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc[lang]}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default ResponsibleAISection;
