import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Thermometer, Tv, Plug, Lightbulb, HelpCircle, DollarSign, Moon, Gauge } from "lucide-react";

const icons = [Thermometer, Tv, Plug, Lightbulb, HelpCircle, DollarSign, Moon, Gauge];

const ProblemSection = () => {
  const { lang, t } = useLanguage();
  const p = t.problem;

  return (
    <SectionWrapper id="problem">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-destructive">{p.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{p.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{p.desc[lang]}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {p.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="feature-card flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-destructive/10">
                <Icon className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title[lang]}</h3>
                <p className="text-sm text-muted-foreground">{item.desc[lang]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default ProblemSection;
