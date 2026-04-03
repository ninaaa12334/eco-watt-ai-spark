import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useTariffChecks, useAddTariffCheck } from "@/hooks/useEnergy";
import { Clock, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const fallbackLogs = [
  { time: "22:00", expectedKey: "night" as const, actualKey: "night" as const, ok: true },
  { time: "22:15", expectedKey: "night" as const, actualKey: "day" as const, ok: false },
  { time: "22:30", expectedKey: "night" as const, actualKey: "night" as const, ok: true },
  { time: "06:00", expectedKey: "day" as const, actualKey: "day" as const, ok: true },
  { time: "06:15", expectedKey: "day" as const, actualKey: "night" as const, ok: false },
];

const DayNightVerifier = () => {
  const { lang, t } = useLanguage();
  const d = t.dayNight;
  const { user } = useAuth();
  const { data: checks } = useTariffChecks();
  const addCheck = useAddTariffCheck();
  const [newTime, setNewTime] = useState("");
  const [newActual, setNewActual] = useState<"day" | "night">("night");

  const logs = checks && checks.length > 0
    ? checks.map((c) => ({
        time: c.check_time.slice(0, 5),
        expectedKey: c.expected_tariff as "day" | "night",
        actualKey: c.actual_tariff as "day" | "night",
        ok: c.is_correct,
      }))
    : fallbackLogs;

  const incorrectCount = logs.filter((l) => !l.ok).length;

  const handleAddCheck = () => {
    if (!newTime || !user) return;
    const hour = parseInt(newTime.split(":")[0]);
    const now = new Date();
    const month = now.getMonth();
    const isWinter = month >= 9 || month <= 2;
    const dayStart = isWinter ? 7 : 8;
    const dayEnd = isWinter ? 22 : 23;
    const expected = hour >= dayStart && hour < dayEnd ? "day" : "night";
    const isCorrect = expected === newActual;

    addCheck.mutate(
      { check_time: newTime + ":00", expected_tariff: expected, actual_tariff: newActual, is_correct: isCorrect },
      {
        onSuccess: () => {
          toast.success(lang === "sq" ? "Kontrolli u shtua" : "Check added");
          setNewTime("");
        },
      }
    );
  };

  return (
    <SectionWrapper id="day-night-verifier">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{d.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{d.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{d.desc[lang]}</p>
      </div>

      <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h3 className="font-display font-semibold text-foreground">{d.logTitle[lang]}</h3>
        </div>

        {user && (
          <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-muted/50">
            <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="px-3 py-2 rounded-lg border border-border/50 bg-card text-sm text-foreground" />
            <select value={newActual} onChange={(e) => setNewActual(e.target.value as "day" | "night")} className="px-3 py-2 rounded-lg border border-border/50 bg-card text-sm text-foreground">
              <option value="day">{d.day[lang]}</option>
              <option value="night">{d.night[lang]}</option>
            </select>
            <button onClick={handleAddCheck} disabled={addCheck.isPending} className="btn-primary-eco text-sm py-2 px-4">
              {addCheck.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (lang === "sq" ? "Shto" : "Add")}
            </button>
          </div>
        )}

        <div className="space-y-3">
          {logs.map((l, i) => (
            <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${l.ok ? "border-eco-success/30 bg-eco-success/5" : "border-destructive/30 bg-destructive/5"}`}>
              <div className="flex items-center gap-3">
                {l.ok ? <CheckCircle className="w-4 h-4 text-eco-success" /> : <AlertTriangle className="w-4 h-4 text-destructive" />}
                <span className="text-sm font-mono font-semibold text-foreground">{l.time}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs">
                  <span className="text-muted-foreground">{d.expected[lang]}: </span>
                  <span className="font-medium text-foreground">{d[l.expectedKey][lang]}</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">{d.actual[lang]}: </span>
                  <span className={`font-medium ${l.ok ? "text-eco-success" : "text-destructive"}`}>{d[l.actualKey][lang]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-xl border border-eco-warning/30 bg-eco-warning/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-eco-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {incorrectCount > 0
                  ? (lang === "sq" ? `${incorrectCount} kontrolle me problem u gjetën` : `${incorrectCount} checks with issues found`)
                  : d.aiAnalysis[lang]}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{d.aiDesc[lang]}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DayNightVerifier;
