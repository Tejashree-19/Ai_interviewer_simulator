import api from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Play,
  Mic,
  Video,
  Brain,
  Sparkles,
  Clock,
  TrendingUp,
  Briefcase,
  Code2,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, Stat, Progress, StatusBadge, CircularProgress } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mockbit — AI-powered mock interviews" },
      {
        name: "description",
        content:
          "Practice technical, behavioral, and system design interviews with realtime AI feedback, voice analysis, and webcam coaching.",
      },
    ],
  }),
  component: Dashboard,
});

const tracks = [
  {
    title: "Frontend Engineer",
    company: "Senior · React",
    duration: "45 min",
    questions: 8,
    icon: Code2,
    accent: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    title: "Product Manager",
    company: "Behavioral · STAR",
    duration: "30 min",
    questions: 6,
    icon: Briefcase,
    accent: "from-sky-500/30 to-cyan-500/20",
  },
  {
    title: "System Design",
    company: "Staff level · Distributed",
    duration: "60 min",
    questions: 4,
    icon: Brain,
    accent: "from-emerald-500/30 to-teal-500/20",
  },
];

const recent = [];

function Dashboard() {
  const readiness = 87;
  const navigate = useNavigate();

  async function startInterview() {
    try {
	console.log("Button clicked");

	console.log("Sending request...");
	const res = await api.post("/session");
	console.log("Response received:", res.data);
	
	console.log("API Response:", res.data);

	localStorage.setItem(
		"session_id",
		String(res.data.session_id)
	);

	localStorage.setItem(
		"current_question",
		res.data.question
	 );
	 console.log("Navigating...");

	 navigate({ to: "/interview" });
	} catch (error) {
	console.error("Session error:", error);
	}
}

  return (
    <AppShell>
      {/* Top bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs text-muted-foreground">Welcome to Mockbit</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Interview Dashboard
          </h1>
        </div>
	<button
	 onClick={startInterview}
	 className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110"
	>
          <Play className="h-4 w-4" />
          Start new interview
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
	</button>
      </div>

      {/* Hero */}
      <Panel className="relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-chart-2/20 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <StatusBadge tone="success">
              <Sparkles className="h-3 w-3" /> New · Realtime voice coach
            </StatusBadge>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="text-gradient">Interview like it's the real thing.</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
             Prepare for real interviews with AI-powered mock sessions, live coaching, speech analysis, focus tracking, and personalized feedback.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/interview"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:brightness-110 hover:shadow-primary/60"
              >
                <Mic className="h-4 w-4" /> Start Interview
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="text-sm text-muted-foreground transition hover:text-foreground">
                Browse question bank →
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Video, label: "Webcam coach", v: "Composure 92%" },
                { icon: Mic, label: "Voice analysis", v: "Pace 138 wpm" },
                { icon: Brain, label: "AI scoring", v: "STAR · 4/5" },
                { icon: MessageSquare, label: "Live transcript", v: "Auto-saved" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border border-border/60 bg-background/40 p-3 backdrop-blur"
                >
                  <c.icon className="h-3.5 w-3.5 text-primary" />
                  <div className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="text-xs font-medium">{c.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* Readiness + Stats */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_2fr]">
        <Panel className="relative overflow-hidden p-6 glow-primary">
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex items-center gap-5">
            <CircularProgress value={readiness} size={120} stroke={9}>
              <div className="text-center">
                <div className="text-2xl font-semibold tracking-tight">{readiness}%</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Ready</div>
              </div>
            </CircularProgress>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Interview Readiness</div>
              <div className="mt-1 text-base font-semibold">Ready for Software Engineering Interviews</div>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                <TrendingUp className="h-3 w-3" /> +9 pts this week
              </div>
            </div>
          </div>
        </Panel>

	<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
	<Stat label="Total Interviews" value="0" hint="No sessions yet" />
	<Stat label="Readiness Score" value="--" />
	<Stat label="Last Score" value="--" hint="Complete an interview" />
	<Stat label="Improvement" value="--" hint="Awaiting data" />
	</div>
      </div>

      {/* Two columns */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel className="p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Choose a track</h3>
              <p className="text-xs text-muted-foreground">
                Curated by ex-FAANG interviewers. Tailored to your resume.
              </p>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground">
              View all →
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {tracks.map((t) => (
              <Link
                key={t.title}
                to="/interview"
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-background/40 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${t.accent} blur-2xl transition group-hover:scale-110`}
                />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
                      <t.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm font-semibold">{t.title}</div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{t.company}</div>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {t.duration}
                    </span>
                    <span>{t.questions} questions</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">Recent sessions</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
	{recent.length === 0 ? (
	 <div className="rounded-xl border border-border/50 p-4 text-sm text-muted-foreground">
	 No interview sessions completed yet.
	 </div>
	) : (
            <ul className="space-y-4">
            {recent.map((r) => (
              <li key={r.role} className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.role}</div>
                  <div className="text-[11px] text-muted-foreground">{r.date}</div>
                  <Progress value={r.score} className="mt-2" />
                </div>
                <div className="text-sm font-semibold tabular-nums">{r.score}</div>
              </li>
            ))}
          </ul>
	)}
        </Panel>
      </div>
    </AppShell>
  );
}
