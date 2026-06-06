import api from "@/lib/api";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Share2, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Clock, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel, Progress, StatusBadge, CircularProgress } from "@/components/ui-kit";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Session results · Mockbit" },
      { name: "description", content: "AI feedback and scoring for your mock interview." },
    ],
  }),
  component: Results,
});


const strengths = ["Communication", "Structured thinking", "Strong use of metrics"];
const improvements = ["Conciseness", "Technical depth", "Reduce filler words"];

function Results() {
  
  const [result, setResult] = useState({
  focus_score: 84,
  confidence_score: 79,
  communication_score: 88,
  overall_feedback: "",
});

const scores = [
  {
    label: "Communication",
    value: result.communication_score,
  },
  {
    label: "Confidence",
    value: result.confidence_score,
  },
  {
    label: "Focus",
    value: result.focus_score,
  },
];

const overall = Math.round(
  (result.focus_score +
    result.confidence_score +
    result.communication_score) / 3
);

const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
  async function loadResults() {
    try {
	const sessionId =
	localStorage.getItem("session_id");

	const res = await api.get(
	`/evaluate/${sessionId}`
	);


      setResult(res.data);

      console.log(
        "Evaluation:",
        JSON.stringify(res.data, null, 2)
      );
    } catch (error) {
      console.error("Evaluate error:", error);
    }
  }

  loadResults();
}, []);

  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimatedScore(Math.round(overall * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Session report</h1>
            <p className="text-xs text-muted-foreground">
              Frontend Engineer · Senior · 42 min · 8 questions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3.5 py-2 text-sm text-muted-foreground transition hover:bg-white/10 hover:text-foreground">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-chart-2 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:brightness-110">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="relative overflow-hidden p-7 lg:col-span-1 animate-fade-in-up">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
          <StatusBadge tone="success">
            <Sparkles className="h-3 w-3" /> Strong session
          </StatusBadge>
          <div className="relative mt-5 flex flex-col items-center">
            <CircularProgress value={animatedScore} size={180} stroke={12}>
              <div className="text-center">
                <div className="text-5xl font-semibold tracking-tight text-gradient tabular-nums">{animatedScore}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">/100</div>
              </div>
            </CircularProgress>
	    <p className="text-sm text-emerald-400 mt-2">
		🏆 Top 15% Performance
	    </p>
	    <p className="mt-4 text-center text-sm text-muted-foreground">
		 {result.overall_feedback}
	    </p>
          </div>
          <div className="relative mt-6 space-y-3">
            {scores.map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium tabular-nums">{s.value}</span>
                </div>
                <Progress value={s.value} />
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-6 lg:col-span-2">
          <Panel className="p-6 animate-fade-in-up">
            <h3 className="text-sm font-semibold">Performance Summary</h3>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <div className="text-xs font-medium uppercase tracking-wide text-emerald-300/90">Strengths</div>
                </div>
                <ul className="space-y-2 text-sm">
                  {strengths.map((s) => (
                    <li key={s} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-300" />
                  <div className="text-xs font-medium uppercase tracking-wide text-amber-300/90">Areas to Improve</div>
                </div>
                <ul className="space-y-2 text-sm">
                  {improvements.map((s) => (
                    <li key={s} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>

          <Panel className="relative overflow-hidden p-6 animate-fade-in-up">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-chart-2/20 blur-3xl" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Recommended next practice session</div>
                <div className="mt-1 text-lg font-semibold">System Design Fundamentals</div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> 30 minutes
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5" /> Intermediate
                  </span>
                </div>
              </div>
              <Link
                to="/interview"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110"
              >
                Start session <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
