"use client"

import { useState } from "react"
import { mockAIReports } from "@/lib/mock-data"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"

export default function AIAuditorPage() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(null)

  const report = mockAIReports[0]
  const selected = selectedBeneficiary ? mockAIReports.find((r) => r.beneficiary === selectedBeneficiary) : report

  const getRiskColor = (level: string) => {
    if (level === "low") return { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle }
    if (level === "medium") return { bg: "bg-yellow-100", text: "text-yellow-800", icon: AlertTriangle }
    return { bg: "bg-red-100", text: "text-red-800", icon: AlertCircle }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">AI-Powered Performance Auditor</h1>
        <p className="text-muted-foreground mt-2">Automated analysis of submissions and project performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Beneficiary Selection */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Select Beneficiary</h2>
          <div className="space-y-2">
            {mockAIReports.map((r) => (
              <button
                key={r.beneficiary}
                onClick={() => setSelectedBeneficiary(r.beneficiary)}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  selectedBeneficiary === r.beneficiary ||
                  (!selectedBeneficiary && r.beneficiary === mockAIReports[0].beneficiary)
                    ? "border-accent bg-muted"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <h3 className="font-semibold text-foreground text-sm">{r.beneficiary}</h3>
                <p className="text-xs text-muted-foreground mt-1">{r.businessName}</p>
                <p className="text-xs text-muted-foreground">{r.lga}</p>
                <div
                  className={`mt-2 inline-block px-2 py-1 rounded text-xs font-semibold capitalize ${getRiskColor(r.riskLevel).bg} ${getRiskColor(r.riskLevel).text}`}
                >
                  {r.riskLevel} Risk
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report Details */}
        {selected && (
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Assessment */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">AI Assessment Report</h2>
                  <p className="text-xs text-muted-foreground mt-1">{selected.businessName} • {selected.lga}</p>
                </div>
                <span className="text-xs text-muted-foreground">{selected.date}</span>
              </div>

              {/* Risk Score Heatmap */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Risk Score</p>
                  <span className="text-3xl font-bold text-foreground">{selected.riskScore}</span>
                </div>

                <div className="w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full mb-3" />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>

                <div
                  className={`mt-4 inline-block px-4 py-2 rounded-lg font-semibold capitalize ${getRiskColor(selected.riskLevel).bg} ${getRiskColor(selected.riskLevel).text}`}
                >
                  {selected.riskLevel} Risk Level
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Executive Summary</h3>
              <ul className="space-y-3">
                {selected.summary.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    {idx < 2 ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Recommendations</h3>
              <ol className="space-y-3">
                {selected.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-accent text-accent-foreground rounded-full text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-foreground">{rec}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Button */}
            <button className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition">
              Generate Full Report
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
