"use client"

import Link from "next/link"
import { AlertCircle, BarChart3 } from "lucide-react"

export default function EquityPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Equity Portfolio</h1>
        <p className="text-muted-foreground mt-2">This page is not applicable to the grant program</p>
      </div>

      {/* Information Card */}
      <div className="max-w-2xl">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-blue-900 mb-3">No Equity Tracking for Grant Program</h2>
              <p className="text-blue-800 mb-4">
                This Grant Program provides grants to beneficiaries for starting or growing their
                businesses, but does not track government equity stakes in these ventures. This program focuses on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-blue-800 mb-6">
                <li>Staged fund releases based on milestone achievements</li>
                <li>Monitoring business progress and operational metrics</li>
                <li>Tracking beneficiary performance and compliance</li>
                <li>Supporting diverse venture types across Calabar LGAs</li>
              </ul>
              <p className="text-blue-800 mb-6">
                For tracking business progress, compliance, and fund management, please visit the relevant sections:
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/admin/beneficiaries"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Beneficiaries
                </Link>
                <Link
                  href="/admin/analytics"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded font-medium hover:opacity-90 transition"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
