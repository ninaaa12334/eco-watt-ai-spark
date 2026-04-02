import SectionWrapper from "./SectionWrapper";
import { Clock, Moon, Sun, AlertTriangle, CheckCircle } from "lucide-react";

const logs = [
  { time: "22:00", expected: "Night", actual: "Night", ok: true },
  { time: "22:15", expected: "Night", actual: "Day", ok: false },
  { time: "22:30", expected: "Night", actual: "Night", ok: true },
  { time: "06:00", expected: "Day", actual: "Day", ok: true },
  { time: "06:15", expected: "Day", actual: "Night", ok: false },
];

const DayNightVerifier = () => (
  <SectionWrapper id="day-night-verifier">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Tariff Check</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Day/Night Verifier</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Check your meter at a specific time and record whether it switched to the correct tariff. AI detects recurring issues like late tariff switches.
      </p>
    </div>

    <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <h3 className="font-display font-semibold text-foreground">Tariff Switch Log</h3>
      </div>

      <div className="space-y-3">
        {logs.map((l, i) => (
          <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${l.ok ? "border-eco-success/30 bg-eco-success/5" : "border-destructive/30 bg-destructive/5"}`}>
            <div className="flex items-center gap-3">
              {l.ok ? <CheckCircle className="w-4 h-4 text-eco-success" /> : <AlertTriangle className="w-4 h-4 text-destructive" />}
              <span className="text-sm font-mono font-semibold text-foreground">{l.time}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs">
                <span className="text-muted-foreground">Expected: </span>
                <span className="font-medium text-foreground">{l.expected}</span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Actual: </span>
                <span className={`font-medium ${l.ok ? "text-eco-success" : "text-destructive"}`}>{l.actual}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 rounded-xl border border-eco-warning/30 bg-eco-warning/5">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-eco-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">AI Analysis: Recurring late tariff switch detected</p>
            <p className="text-xs text-muted-foreground mt-1">Night tariff appears to activate 15–30 minutes late on some days. This may result in higher charges.</p>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default DayNightVerifier;
