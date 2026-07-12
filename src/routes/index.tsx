import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  ChevronRight,
  Download,
  Filter,
  HelpCircle,
  LayoutDashboard,
  LineChart as LineIcon,
  Moon,
  Plug,
  RefreshCw,
  Search,
  Settings,
  Slash,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  Wallet,
  FileBarChart,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

/* ---------------- Data ---------------- */

const trafficData = [
  { d: "Jun 06", visitors: 4200, sessions: 2800 },
  { d: "Jun 08", visitors: 5100, sessions: 3200 },
  { d: "Jun 10", visitors: 4700, sessions: 3050 },
  { d: "Jun 12", visitors: 6200, sessions: 4100 },
  { d: "Jun 14", visitors: 5800, sessions: 3800 },
  { d: "Jun 16", visitors: 7300, sessions: 4900 },
  { d: "Jun 18", visitors: 6900, sessions: 4600 },
  { d: "Jun 20", visitors: 8100, sessions: 5400 },
  { d: "Jun 22", visitors: 7700, sessions: 5100 },
  { d: "Jun 24", visitors: 9200, sessions: 6100 },
  { d: "Jun 26", visitors: 8600, sessions: 5700 },
  { d: "Jun 28", visitors: 10400, sessions: 6900 },
  { d: "Jun 30", visitors: 9800, sessions: 6500 },
  { d: "Jul 02", visitors: 11200, sessions: 7400 },
  { d: "Jul 04", visitors: 12100, sessions: 8000 },
];

const spark = (points: number[]) => points.map((v, i) => ({ i, v }));

const kpis = [
  {
    label: "Revenue",
    value: "$128,490",
    delta: "+12.4%",
    trend: "up" as const,
    compare: "vs. $114,320 last period",
    icon: Wallet,
    data: spark([32, 40, 36, 48, 44, 58, 52, 66, 62, 78, 74, 88]),
    color: "var(--color-emerald)",
  },
  {
    label: "Visitors",
    value: "82.3K",
    delta: "+18.0%",
    trend: "up" as const,
    compare: "vs. 69.7K last period",
    icon: Users,
    data: spark([20, 28, 26, 34, 30, 42, 40, 50, 48, 60, 58, 72]),
    color: "var(--color-cyan)",
  },
  {
    label: "Conversion",
    value: "4.91%",
    delta: "+2.3%",
    trend: "up" as const,
    compare: "vs. 4.80% last period",
    icon: TrendingUp,
    data: spark([28, 30, 32, 30, 34, 33, 36, 35, 38, 37, 40, 42]),
    color: "var(--color-blue)",
  },
  {
    label: "Bounce Rate",
    value: "32%",
    delta: "−5.0%",
    trend: "down" as const,
    compare: "vs. 37% last period",
    icon: LineIcon,
    data: spark([60, 58, 62, 55, 52, 54, 50, 48, 46, 44, 42, 40]),
    color: "var(--color-rose)",
  },
];

const donutData = [
  { name: "Organic", value: 42, color: "#22D3EE" },
  { name: "Paid", value: 26, color: "#3B82F6" },
  { name: "Referral", value: 18, color: "#22C55E" },
  { name: "Social", value: 14, color: "#F59E0B" },
];

const sessions = [
  { user: "Amelia Carter", email: "amelia@northwind.io", country: "United States", flag: "🇺🇸", device: "Desktop", duration: "8m 42s", source: "Organic", status: "Converted", revenue: "$1,240" },
  { user: "Kenji Watanabe", email: "kenji@sonarlabs.jp", country: "Japan", flag: "🇯🇵", device: "Mobile", duration: "3m 12s", source: "Paid", status: "Active", revenue: "$320" },
  { user: "Sofía Ramírez", email: "sofia@lumen.mx", country: "Mexico", flag: "🇲🇽", device: "Desktop", duration: "12m 03s", source: "Referral", status: "Converted", revenue: "$2,180" },
  { user: "Liam O'Sullivan", email: "liam@driftmail.ie", country: "Ireland", flag: "🇮🇪", device: "Tablet", duration: "1m 48s", source: "Social", status: "Bounced", revenue: "$0" },
  { user: "Priya Nair", email: "priya@axiomhq.in", country: "India", flag: "🇮🇳", device: "Mobile", duration: "6m 27s", source: "Organic", status: "Converted", revenue: "$860" },
  { user: "Noah Andersen", email: "noah@fjord.no", country: "Norway", flag: "🇳🇴", device: "Desktop", duration: "4m 55s", source: "Paid", status: "Active", revenue: "$540" },
  { user: "Chloé Bernard", email: "chloe@atelier.fr", country: "France", flag: "🇫🇷", device: "Desktop", duration: "9m 18s", source: "Referral", status: "Converted", revenue: "$1,720" },
  { user: "Marcus Adebayo", email: "marcus@vertexlab.ng", country: "Nigeria", flag: "🇳🇬", device: "Mobile", duration: "2m 34s", source: "Social", status: "Bounced", revenue: "$0" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: LineIcon, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: Wallet, label: "Revenue" },
  { icon: FileBarChart, label: "Reports" },
  { icon: Plug, label: "Integrations" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
];

const ranges = ["Today", "7 Days", "30 Days", "90 Days"];

/* ---------------- Component ---------------- */

function DashboardPage() {
  const [range, setRange] = useState("30 Days");
  const [isDark, setIsDark] = useState(true);
  const totalDonut = useMemo(() => donutData.reduce((a, b) => a + b.value, 0), []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden md:flex h-screen w-[72px] shrink-0 flex-col items-center gap-1 border-r border-border bg-background py-5 z-40">
          <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)]">
            <Sparkles className="h-5 w-5 text-[#05141A]" strokeWidth={2.5} />
          </div>
          <nav className="flex flex-col items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  title={item.label}
                  className={`group relative grid h-10 w-10 place-items-center rounded-xl border transition-all ${item.active
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 nav-glow"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-elevated hover:text-foreground"
                    }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top Nav */}
          <header className="sticky top-0 z-30 flex h-[72px] items-center gap-2 sm:gap-4 border-b border-border bg-background/80 px-4 sm:px-6 backdrop-blur-xl">
            <nav className="hidden sm:flex min-w-0 items-center gap-2 text-sm">
              <span className="text-muted-foreground">Acme Inc.</span>
              <Slash className="h-3.5 w-3.5 text-border-strong" />
              <span className="text-muted-foreground">Workspaces</span>
              <ChevronRight className="h-3.5 w-3.5 text-border-strong" />
              <span className="font-medium text-foreground">Overview</span>
            </nav>

            <div className="flex-1 sm:flex-none sm:ml-4 flex h-9 w-full sm:w-[240px] md:min-w-[340px] items-center gap-2 rounded-lg border border-border bg-elevated px-3 text-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search metrics, users, reports…"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="mr-1 hidden text-xs text-muted-foreground lg:inline">
                Monday, July 6, 2026
              </span>

              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 live-dot" />
                Live
              </div>

              <button className="hidden sm:grid h-9 w-9 place-items-center rounded-lg border border-border bg-elevated text-muted-foreground hover:text-foreground">
                <RefreshCw className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsDark(!isDark)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-elevated text-muted-foreground hover:text-foreground"
              >
                {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
              <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-elevated text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>

              <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-elevated px-2 pr-2.5 text-sm">
                <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-[11px] font-semibold text-white">
                  W
                </div>
                <span className="hidden text-foreground lg:inline">Kusuma</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-6 sm:py-8">
            {/* Title row */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Overview
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time performance across all products · updated 2s ago
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-elevated px-3 text-sm text-foreground hover:bg-muted">
                  <Filter className="h-4 w-4 text-muted-foreground" /> Filters
                </button>
                <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-elevated px-3 text-sm text-foreground hover:bg-muted">
                  <Download className="h-4 w-4 text-muted-foreground" /> Export
                </button>
                <button className="flex h-9 items-center gap-2 rounded-lg bg-cyan-400 px-3 text-sm font-medium text-cyan-950 hover:bg-cyan-300">
                  <Sparkles className="h-4 w-4" /> New report
                </button>
              </div>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-12 gap-6">
              {kpis.map((k) => {
                const positive = k.trend === "up";
                const Icon = k.icon;
                return (
                  <div
                    key={k.label}
                    className="glass-card col-span-12 rounded-2xl p-5 transition-transform hover:-translate-y-0.5 sm:col-span-6 xl:col-span-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-elevated">
                          <Icon className="h-4 w-4" style={{ color: k.color }} />
                        </div>
                        {k.label}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${positive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                          }`}
                      >
                        {positive ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {k.delta}
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-[28px] font-semibold leading-none tracking-tight text-foreground">
                          {k.value}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">{k.compare}</div>
                      </div>
                      <div className="h-12 w-[110px] shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={k.data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                            <defs>
                              <linearGradient id={`sp-${k.label}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={k.color} stopOpacity={0.45} />
                                <stop offset="100%" stopColor={k.color} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="v"
                              stroke={k.color}
                              strokeWidth={1.75}
                              fill={`url(#sp-${k.label})`}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart + Donut */}
            <div className="mt-6 grid grid-cols-12 gap-6">
              <section className="glass-card col-span-12 rounded-2xl p-6 xl:col-span-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Traffic Overview</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Last 30 Days · Visitors vs Sessions</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-3 rounded-full bg-cyan-400" />
                        Visitors
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-3 rounded-full bg-blue-500/70" />
                        Sessions
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-elevated p-0.5">
                      {ranges.map((r) => (
                        <button
                          key={r}
                          onClick={() => setRange(r)}
                          className={`rounded-md px-2.5 py-1 text-xs transition-colors ${range === r
                            ? "bg-elevated text-foreground shadow-inner"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
                      <defs>
                        <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="sesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#1F232B" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="d"
                        stroke="#4B5563"
                        tick={{ fill: "#94A3B8", fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#4B5563"
                        tick={{ fill: "#94A3B8", fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                      />
                      <Tooltip
                        cursor={{ stroke: "#22D3EE", strokeOpacity: 0.25, strokeWidth: 1 }}
                        contentStyle={{
                          background: "#0F1218",
                          border: "1px solid #262A32",
                          borderRadius: 10,
                          fontSize: 12,
                          color: "#F8FAFC",
                          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.6)",
                        }}
                        labelStyle={{ color: "#94A3B8", marginBottom: 4 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke="#3B82F6"
                        strokeWidth={1.5}
                        fill="url(#sesGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stroke="#22D3EE"
                        strokeWidth={2}
                        fill="url(#visGrad)"
                        activeDot={{ r: 4, stroke: "#22D3EE", strokeWidth: 2, fill: "#0B0C10" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="glass-card col-span-12 rounded-2xl p-6 xl:col-span-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Revenue Breakdown</h2>
                    <p className="mt-1 text-xs text-muted-foreground">By acquisition channel</p>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    Details →
                  </button>
                </div>

                <div className="relative mx-auto mt-2 h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        innerRadius={62}
                        outerRadius={88}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {donutData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "#0F1218",
                          border: "1px solid #262A32",
                          borderRadius: 10,
                          fontSize: 12,
                          color: "#F8FAFC",
                        }}
                        formatter={(v: number) => `${v}%`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Total</div>
                    <div className="text-xl font-semibold text-foreground">$128,490</div>
                    <div className="text-[11px] text-emerald-400">+12.4%</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {donutData.map((d) => (
                    <div
                      key={d.name}
                      className="flex items-center justify-between rounded-lg border border-transparent px-2 py-1.5 text-sm hover:border-border hover:bg-elevated"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-foreground">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          ${Math.round((d.value / totalDonut) * 128490).toLocaleString()}
                        </span>
                        <span className="w-9 text-right text-foreground">{d.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Table */}
            <section className="glass-card mt-6 rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
                <div>
                  <h2 className="text-base font-semibold text-foreground">Recent Sessions</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Live user activity across your workspace
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-9 min-w-[140px] sm:min-w-[240px] items-center gap-2 rounded-lg border border-border bg-elevated px-3 text-sm">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search sessions…"
                      className="w-full bg-transparent placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-elevated px-3 text-sm hover:bg-muted">
                    <Filter className="h-4 w-4 text-muted-foreground" /> Filter
                  </button>
                  <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-elevated px-3 text-sm hover:bg-muted">
                    <Download className="h-4 w-4 text-muted-foreground" /> Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-elevated text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-medium">User</th>
                      <th className="px-5 py-3 font-medium">Country</th>
                      <th className="px-5 py-3 font-medium">Device</th>
                      <th className="px-5 py-3 font-medium">Duration</th>
                      <th className="px-5 py-3 font-medium">Source</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 text-right font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s, i) => (
                      <tr
                        key={s.email}
                        className={`border-t border-border transition-colors hover:bg-muted/50 ${i % 2 === 1 ? "bg-elevated/30" : ""
                          }`}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan-400/80 to-blue-500/80 text-[11px] font-semibold text-[#05141A]">
                              {s.user
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate font-medium text-foreground">{s.user}</div>
                              <div className="truncate text-xs text-muted-foreground">{s.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2 text-foreground">
                            <span className="text-base leading-none">{s.flag}</span>
                            <span>{s.country}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{s.device}</td>
                        <td className="px-5 py-3 tabular-nums text-foreground">{s.duration}</td>
                        <td className="px-5 py-3">
                          <SourceBadge source={s.source} />
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="px-5 py-3 text-right font-medium tabular-nums text-foreground">
                          {s.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border px-5 py-3 text-xs text-muted-foreground">
                <span>Showing 1–8 of 2,483 sessions</span>
                <div className="flex items-center gap-1">
                  <button className="rounded-md border border-border bg-elevated px-2.5 py-1 hover:text-foreground">
                    Previous
                  </button>
                  {["1", "2", "3", "…", "311"].map((p) => (
                    <button
                      key={p}
                      className={`rounded-md px-2.5 py-1 ${p === "1"
                        ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "border border-transparent hover:border-border hover:text-foreground"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="rounded-md border border-border bg-elevated px-2.5 py-1 hover:text-foreground">
                    Next
                  </button>
                </div>
              </div>
            </section>

            <footer className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
              <span>© 2026 WJ Kusuma Analytics · v4.12.0</span>
              <span>All systems operational</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Converted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Active: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    Bounced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, string> = {
    Organic: "bg-elevated text-cyan-500 dark:text-cyan-300 border-cyan-400/20",
    Paid: "bg-elevated text-blue-600 dark:text-blue-400 border-blue-500/20",
    Referral: "bg-elevated text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Social: "bg-elevated text-amber-600 dark:text-amber-400 border-amber-500/20",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${map[source]}`}>
      {source}
    </span>
  );
}
