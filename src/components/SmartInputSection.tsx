import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Tv, Thermometer, Plug, Moon, DollarSign, Home, Users, Upload, Camera } from "lucide-react";

const inputIcons = [Tv, Thermometer, Plug, Moon, DollarSign, Home, Users];
const placeholders = ["2", "6", "4", "Po / Yes", "85", "90", "4"];

const SmartInputSection = () => {
  const { lang, t } = useLanguage();
  const s = t.smartInput;

  return (
    <SectionWrapper id="smart-input">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{s.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{s.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{s.desc[lang]}</p>
      </div>

      <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {s.inputs.map((inp, i) => {
            const Icon = inputIcons[i];
            return (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card">
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">{inp.label[lang]}</div>
                  <div className="text-sm font-medium text-foreground">{placeholders[i]}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-5 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 cursor-pointer hover:border-primary/50 transition-colors">
            <Upload className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-semibold text-foreground">{s.uploadBill[lang]}</div>
              <div className="text-xs text-muted-foreground">{s.uploadBillDesc[lang]}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-5 rounded-xl border-2 border-dashed border-secondary/30 bg-secondary/5 cursor-pointer hover:border-secondary/50 transition-colors">
            <Camera className="w-5 h-5 text-secondary" />
            <div>
              <div className="text-sm font-semibold text-foreground">{s.uploadPhoto[lang]}</div>
              <div className="text-xs text-muted-foreground">{s.uploadPhotoDesc[lang]}</div>
            </div>
          </div>
        </div>

        <button className="btn-primary-eco w-full mt-6">{s.analyzeBtn[lang]}</button>
      </div>
    </SectionWrapper>
  );
};

export default SmartInputSection;
