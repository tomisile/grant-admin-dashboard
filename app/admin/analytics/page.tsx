"use client"

import { mockAlerts, mockAnalytics } from "@/lib/mock-data"
import { AlertCircle, Download } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Alerts</h1>
          <p className="text-muted-foreground mt-2">Grant program metrics, compliance tracking, and notifications • Updated June 2027</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Alerts Section */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Automated Alerts & Notifications
            </h2>

            <div className="space-y-3">
              {mockAlerts.map((alert) => {
                const severityColor =
                  alert.severity === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                return (
                  <div key={alert.id} className="p-4 border border-border rounded-lg hover:bg-muted transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${severityColor}`}>
                            {alert.severity}
                          </span>
                          <span className="text-xs text-muted-foreground">{alert.date}</span>
                        </div>
                        <h4 className="font-semibold text-foreground">{alert.beneficiary}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      </div>
                      <button className="px-3 py-1 text-xs font-medium border border-border text-foreground rounded hover:bg-muted">
                        Dismiss
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Compliance Summary */}
        <div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Program Health</h3>

            <div className="space-y-6">
              {/* Compliance Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-muted-foreground uppercase">Compliance</span>
                  <span className="text-2xl font-bold text-accent">{mockAnalytics.complianceRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-full rounded-full"
                    style={{ width: `${mockAnalytics.complianceRate}%` }}
                  />
                </div>
              </div>

              {/* Avg Skills */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-muted-foreground uppercase">Avg Skills</span>
                  <span className="text-2xl font-bold text-foreground">{mockAnalytics.avgSkillsProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-full rounded-full"
                    style={{ width: `${mockAnalytics.avgSkillsProgress}%` }}
                  />
                </div>
              </div>

              {/* On-Track */}
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-muted-foreground uppercase">On Track</span>
                  <span className="text-2xl font-bold text-green-600">32/45</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-2 border border-border text-foreground rounded font-medium hover:bg-muted transition">
              View Full Report
            </button>
          </div>
        </div>
      </div>

      {/* Business Stage Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Business Stage Distribution</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground uppercase">Stage</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground uppercase">
                  Beneficiaries %
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground uppercase">Progress</th>
              </tr>
            </thead>
            <tbody>
              {mockAnalytics.stageDistribution.map((stage) => (
                <tr key={stage.stage} className="border-b border-border hover:bg-muted transition">
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{stage.stage}</td>
                  <td className="py-3 px-4 text-sm font-bold text-accent">{stage.percentage}%</td>
                  <td className="py-3 px-4">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-accent h-full rounded-full" style={{ width: `${stage.percentage}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
