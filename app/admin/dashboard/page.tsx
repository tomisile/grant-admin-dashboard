"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DashboardCard } from "@/components/dashboard-card"
import { mockAnalytics } from "@/lib/mock-data"
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react"

export default function DashboardPage() {
  const colors = ["#FB651E", "#4B5563", "#E8E8E8", "#FF8C42"]

  return (
    <div className="p-4 md:p-8 md:pt-8 pt-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Grant Program Dashboard</h1>
        <p className="text-muted-foreground mt-2">Calabar, Cross River State • Last Update: June 15, 2027</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Beneficiaries"
          value={mockAnalytics.totalBeneficiaries}
          subtitle="Active participants in program"
          icon={<Users className="w-8 h-8" />}
        />
        <DashboardCard
          title="Funds Released"
          value={`₦${(mockAnalytics.totalFundsReleased / 1000000).toFixed(1)}M`}
          subtitle={`of ₦${(mockAnalytics.totalFundsAllocated / 1000000).toFixed(0)}M allocated`}
          icon={<DollarSign className="w-8 h-8" />}
        />
        <DashboardCard
          title="Avg Progress Rate"
          value={`${mockAnalytics.avgProgressRate}%`}
          subtitle="Across all beneficiaries"
          icon={<Zap className="w-8 h-8" />}
        />
        <DashboardCard
          title="Active Tranches"
          value={mockAnalytics.activeFunding}
          subtitle="Currently disbursing grants"
          icon={<TrendingUp className="w-8 h-8" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Fund Release Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6 text-foreground">Fund Release Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalytics.fundReleaseTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
                formatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ fill: "var(--accent)", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6 text-foreground">Beneficiary Demographics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockAnalytics.demographics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ label, value }) => `${label} (${value})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockAnalytics.demographics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} beneficiaries`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Venture Types Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6 text-foreground">Beneficiaries by Venture Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.ventureTypes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" />
              <YAxis dataKey="type" type="category" width={140} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="percentage" fill="var(--accent)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LGA Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6 text-foreground">Distribution by LGA (Calabar)</h2>
          <div className="space-y-4">
            {mockAnalytics.lgas.map((lga) => (
              <div key={lga.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{lga.name}</span>
                  <span className="text-sm font-bold text-foreground">{lga.count}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-full rounded-full"
                    style={{ width: `${(lga.count / mockAnalytics.totalBeneficiaries) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Health */}
      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-lg font-bold mb-8 text-foreground">Grant Distribution Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-3">Total Allocated</p>
            <p className="text-3xl font-bold text-foreground">₦{(mockAnalytics.totalFundsAllocated / 1000000).toFixed(0)}M</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-3">Total Released</p>
            <p className="text-3xl font-bold text-accent">₦{(mockAnalytics.totalFundsReleased / 1000000).toFixed(0)}M</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-3">Compliance Rate</p>
            <p className="text-3xl font-bold text-foreground">{mockAnalytics.complianceRate}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
