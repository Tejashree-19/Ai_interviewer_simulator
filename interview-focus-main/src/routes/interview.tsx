import { useNavigate } from "@tanstack/react-router";
import api from "@/lib/api";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mic,
  Video,
  VideoOff,
  MicOff,
  PhoneOff,
  Sparkles,
  ChevronRight,
  Brain,
  Pause,
  Volume2,
  Send,
  Paperclip,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel, StatusBadge, Progress } from "@/components/ui-kit";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Live interview · Mockbit" },
      { name: "description", content: "Live AI mock interview session." },
    ],
  }),
  component: InterviewRoom,
});

const initialTranscript: {
  who: string;
  text: string;
  time?: string;
}[] = [];

function InterviewRoom() {
  const [currentQuestion, setCurrentQuestion] = useState(
	"Tell me about yourself."
	);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState(initialTranscript);
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
    const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

    const chunksRef =
    useRef<Blob[]>([]);

  const [isThinking, setIsThinking] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);

  const transcriptRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  transcriptRef.current?.scrollTo({
    top: transcriptRef.current.scrollHeight,
    behavior: "smooth",
  });
}, [messages]);

useEffect(() => {
console.log(
  JSON.stringify(messages, null, 2)
);
}, [messages]);

  useEffect(() => {
  const q = localStorage.getItem("current_question");

  if (q) {
    setCurrentQuestion(q);

    setMessages([
      {
        who: "ai",
        text: q,
        time: "00:00",
      },
    ]);
  }
}, []); 

function startSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript =
      event.results[0][0].transcript;

    setAnswer((prev) =>
      prev ? prev + " " + transcript : transcript
    );
  };

  recognition.start();
}
  
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function go() {
      if (!cam) {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
        return;
      }
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = s;
        if (videoRef.current) videoRef.current.srcObject = s;
          const recorder = new MediaRecorder(s);
	  
	  recorder.onstop = async () => {
		await uploadRecording();
	  };
	  recorder.ondataavailable = (e) => {
	  chunksRef.current.push(e.data);
	};

	  mediaRecorderRef.current = recorder;

	  recorder.start();

        } catch {
        /* permission denied — show placeholder */
      }
    }
    go();
    return () => {
      cancelled = true;
    };
  }, [cam]);

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  async function uploadRecording() {
  try {
    if (chunksRef.current.length === 0) return;

    const blob = new Blob(
      chunksRef.current,
      { type: "video/webm" }
    );

    const formData = new FormData();

    formData.append(
      "file",
      blob,
      "interview.webm"
    );

    await fetch(
      "https://ai-interviewer-simulator-ot7c.onrender.com/upload-video",
      {
        method: "POST",
        body: formData,
      }
    );
  } catch (err) {
    console.error(err);
  }
}

  async function handleSend() {
  if (!answer.trim()) return;

  const userAnswer = answer.trim();

  setMessages((m) => [
    ...m,
    {
      who: "you",
      text: userAnswer,

time: `${mm}:${ss}`,
    },
  ]);

  setAnswer("");
  setThinking(true);

  try {
    const sessionId = Number(
      localStorage.getItem("session_id")
    );

    console.log("Sending answer...");
    console.log("session_id =", sessionId);

    const res = await api.post("/answer", {
      session_id: sessionId,
      answer: userAnswer,
    });

    console.log("Answer response:", res.data);

localStorage.setItem(
  "interview_history",
  JSON.stringify([
    ...(JSON.parse(
      localStorage.getItem("interview_history") || "[]"
    )),
    {
      question: currentQuestion,
      answer: userAnswer,
      nextQuestion: res.data.next_question,
    },
  ])
);

const nextCount = questionCount + 1;

console.log("questionCount =", questionCount);
console.log("nextCount =", nextCount);

setQuestionCount(nextCount);

console.log("questionCount =", questionCount);
console.log("nextCount =", nextCount);

if (nextCount >= 8) {
  console.log("INTERVIEW COMPLETE");
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
  }

  await uploadRecording();

  console.log(
     "session_id before results:",
     localStorage.getItem("session_id")
  );

  navigate({ to: "/results" });

  return;

}

setQuestionCount(nextCount);

setMessages((m) => {
  const last = m[m.length - 1];

  if (
    last &&
    last.who === "ai" &&
    last.text === res.data.next_question
  ) {
    return m;
  }

  return [
    ...m,
    {
      who: "ai",
      text: res.data.next_question,
      time: `${mm}:${ss}`,
    },
  ];
});

setCurrentQuestion(res.data.next_question);

} catch (error) {
  console.error("Answer API error:", error);
} finally {
  setThinking(false);
}
}
return(
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <StatusBadge tone="live">
            <span className="animate-soft-pulse">Live</span>
          </StatusBadge>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Frontend Engineer · Senior</h1>
            <p className="text-xs text-muted-foreground">
              Question 2 of 8 · Behavioral round
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-sm font-medium tabular-nums">
            {mm}:{ss}
          </div>
          <Link
            to="/results"
            className="inline-flex items-center gap-2 rounded-full bg-destructive/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-destructive"
          >
            <PhoneOff className="h-4 w-4" /> End
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Left: webcam + question + answer */}
        <div className="space-y-6">
          <Panel className="overflow-hidden">
            <div className="relative aspect-video w-full bg-black">
              {cam ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-muted-foreground">
                  <div className="text-center">
                    <VideoOff className="mx-auto h-8 w-8" />
                    <div className="mt-2 text-xs">Camera off</div>
                  </div>
                </div>
              )}

              {/* HUD */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <StatusBadge tone="live">
                  <span className="animate-soft-pulse">REC</span>
                </StatusBadge>
                <StatusBadge tone="success">Composure 92%</StatusBadge>
              </div>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2 py-2 backdrop-blur">
                <ControlBtn active={mic} onClick={() => setMic((v) => !v)} label="Mic">
                  {mic ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </ControlBtn>
                <ControlBtn active={cam} onClick={() => setCam((v) => !v)} label="Camera">
                  {cam ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </ControlBtn>
                <ControlBtn label="Pause">
                  <Pause className="h-4 w-4" />
                </ControlBtn>
                <Link
                  to="/results"
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-destructive text-white transition hover:brightness-110"
                  aria-label="End"
                >
                  <PhoneOff className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 ring-1 ring-inset ring-primary/30">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    AI interviewer
                  </span>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
		<p className="mt-1 text-lg font-medium leading-relaxed">
		{currentQuestion}
		</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-muted-foreground ring-1 ring-inset ring-white/10">
                    Behavioral
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-muted-foreground ring-1 ring-inset ring-white/10">
                    STAR framework
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-muted-foreground ring-1 ring-inset ring-white/10">
                    ~3 min
                  </span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Answer input - primary action */}
          <Panel className="p-4 ring-1 ring-primary/20">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-medium text-muted-foreground">Your answer</div>
              <div className="text-[10px] text-muted-foreground tabular-nums">
                {answer.length} chars
              </div>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSend();
              }}
              rows={4}
              placeholder="Type your answer or use your microphone..."
              className="w-full resize-none rounded-lg border border-border/40 bg-background/40 px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
		<button
			onClick={startSpeechRecognition}
			  className="grid h-9 w-9 ..."
			>
			 <Mic className="h-4 w-4" />
		</button>
                <button
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-white/5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                  aria-label="Attach"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">
                  ⌘ + Enter to send
                </span>
              </div>
              <button
                onClick={handleSend}
                disabled={!answer.trim() || thinking}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" /> Send answer
              </button>
            </div>
	    {thinking && (
		<div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
		<div className="flex items-center gap-2 text-sm text-violet-300">
	        <Brain className="h-4 w-4" />
		AI is analyzing your answer...
		</div>

		<div className="mt-3 flex gap-2">
		<div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"></div>
		<div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce delay-100"></div>
		<div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce delay-200"></div>
		</div>
		</div>
		)}
          </Panel>
        </div>

        {/* Right: transcript + insights */}
        <div className="space-y-6">
          <Panel className="flex h-[420px] flex-col">
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
              <div className="text-sm font-semibold">Live transcript</div>
              <span className="text-[11px] text-muted-foreground">Auto-saving</span>
            </div>
	    <div
		  ref={transcriptRef}
		  className="flex-1 space-y-5 overflow-y-auto px-5 py-5"
	     >
              {messages.map((m, i) => (
                <div key={i} className="animate-fade-in-up">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider ${
                        m.who === "ai" ? "text-primary" : "text-chart-2"
                      }`}
                    >
                      {m.who === "ai" ? "AI" : "You"}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 tabular-nums">{m.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{m.text}</p>
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Listening…
              </div>
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold">Realtime coaching</div>
            </div>
            <Metric label="Clarity" value={84} />
            <Metric label="Pacing" value={68} hint="A touch fast — slow down on key points" />
            <Metric label="Filler words" value={92} />
            <Metric label="Confidence" value={77} />

            <button className="mt-4 inline-flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2.5 text-sm transition hover:bg-white/10">
              Get a hint
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

function ControlBtn({
  children,
  onClick,
  active = true,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-full transition ${
        active
          ? "bg-white/10 text-foreground hover:bg-white/15"
          : "bg-destructive/80 text-white hover:bg-destructive"
      }`}
    >
      {children}
    </button>
  );
}

function Metric({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}</span>
      </div>
      <Progress value={value} />
      {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}
