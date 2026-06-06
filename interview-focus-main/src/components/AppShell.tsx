import { Link } from "@tanstack/react-router";
import { Sparkles, LayoutDashboard, Mic, BarChart3, Settings, HelpCircle } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/interview", label: "Interview", icon: Mic },
  { to: "/results", label: "Results", icon: BarChart3 },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-border/60 bg-sidebar/60 px-4 py-5 backdrop-blur-xl lg:flex">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-md shadow-primary/30">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold tracking-tight">Mockbit</div>
              <div className="text-[10px] text-muted-foreground">AI Interview Coach</div>
            </div>
          </Link>

          <nav className="mt-8 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent/30 hover:text-foreground data-[status=active]:bg-accent/70 data-[status=active]:text-foreground data-[status=active]:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_4px_20px_-8px_oklch(0.72_0.18_295/0.5)]"
              >
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-primary opacity-0 transition group-data-[status=active]:opacity-100" />
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-0.5">
            <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent/30 hover:text-foreground">
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent/30 hover:text-foreground">
              <HelpCircle className="h-4 w-4" /> Help & docs
            </button>

            <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-2">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-chart-2 to-primary text-[10px] font-semibold text-primary-foreground">
                MB
              </div>
              <div className="min-w-0 leading-tight">
                <div className="truncate text-xs font-medium">Guest User</div>
                <div className="text-[10px] text-muted-foreground">Interview Candidate</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="px-5 py-6 sm:px-8 sm:py-8 animate-fade-in-up">{children}</div>
        </main>
      </div>
    </div>
  );
}
