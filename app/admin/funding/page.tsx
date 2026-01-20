"use client"

import { Suspense, useState } from "react"
import { mockFundingData } from "@/lib/mock-data"
import { Search, CheckCircle, Pause, AlertCircle } from "lucide-react"

function FundingContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = mockFundingData.filter(
    (f) =>
      f.beneficiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.businessName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Staged Funding Oversight</h1>
        <p className="text-muted-foreground mt-2">Manage fund tranches, milestones, and releases</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm font-medium text-muted-foreground">Total Allocated</p>
          <p className="text-3xl font-bold text-foreground mt-2">₦45M</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm font-medium text-muted-foreground">Total Released</p>
          <p className="text-3xl font-bold text-accent mt-2">₦22.5M</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm font-medium text-muted-foreground">Pending Release</p>
          <p className="text-3xl font-bold text-foreground mt-2">₦22.5M</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by beneficiary or business name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Funding Tranches */}
      <div className="space-y-4">
        {filtered.map((tranche) => (
          <div key={tranche.id} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Tranche Header */}
            <button
              onClick={() => setExpandedId(expandedId === tranche.id ? null : tranche.id)}
              className="w-full p-6 hover:bg-muted transition"
            >
              <div className="flex items-center justify-between">
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-foreground">{tranche.beneficiary}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{tranche.businessName} • {tranche.lga}</p>
                </div>

                <div className="text-right mr-4">
                  <p className="text-sm font-medium text-foreground">
                    ₦{(tranche.released / 1000000).toFixed(1)}M / ₦{(tranche.totalAllocation / 1000000).toFixed(1)}M
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        tranche.status === "on-track" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tranche.status === "on-track" ? "On Track" : "Delayed"}
                    </span>
                  </div>
                </div>

                <div className="w-6 h-6 flex items-center justify-center">{expandedId === tranche.id ? "−" : "+"}</div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-full rounded-full"
                  style={{ width: `${(tranche.released / tranche.totalAllocation) * 100}%` }}
                />
              </div>
            </button>

            {/* Expanded Details */}
            {expandedId === tranche.id && (
              <div className="border-t border-border p-6 bg-muted/50">
                {/* Milestones */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4">Milestones</h4>
                  <div className="space-y-3">
                    {tranche.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-card border border-border rounded"
                      >
                        <div className="flex items-center gap-3">
                          {milestone.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {milestone.status === "in-progress" && (
                            <div className="w-5 h-5 border-2 border-accent border-t-accent rounded-full animate-spin" />
                          )}
                          {milestone.status === "pending" && <AlertCircle className="w-5 h-5 text-muted-foreground" />}
                          <div>
                            <p className="font-medium text-foreground">{milestone.name}</p>
                            <p className="text-xs text-muted-foreground">₦{(milestone.amount / 1000000).toFixed(1)}M</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold capitalize text-muted-foreground">
                          {milestone.status.replace("-", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded font-medium text-sm hover:opacity-90">
                    <CheckCircle className="w-4 h-4" />
                    Release Funds
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded font-medium text-sm hover:bg-muted">
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FundingPage() {
  return (
    <Suspense fallback={null}>
      <FundingContent />
    </Suspense>
  )
}
