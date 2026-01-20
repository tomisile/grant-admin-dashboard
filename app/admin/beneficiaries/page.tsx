"use client"

import { useState } from "react"
import { mockBeneficiaries } from "@/lib/mock-data"
import { Search, Filter, ChevronRight } from "lucide-react"

export default function BeneficiariesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [ventureFilter, setVentureFilter] = useState("all")
  const [lgaFilter, setLgaFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(null)

  const stages = ["Planning & Setup", "Launch & Operations", "Growth & Scaling", "Sustainability & Impact"]
  const ventures = [
    "Boutique & Fashion",
    "Poultry Farming",
    "Cassava Processing",
    "Mobile Phone Accessories Trading",
    "Food Processing & Catering",
    "Fishing & Seafood Trading",
    "Arts & Crafts Production",
  ]
  const lgas = ["Calabar Municipal", "Calabar South", "Odukpani", "Akpabuyo", "Bakassi"]
  const riskLevels = ["low", "medium", "high"]

  const filtered = mockBeneficiaries.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.businessName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = stageFilter === "all" || b.stage === stageFilter
    const matchesVenture = ventureFilter === "all" || b.ventureType === ventureFilter
    const matchesLga = lgaFilter === "all" || b.lga === lgaFilter
    const matchesRisk = riskFilter === "all" || b.riskLevel === riskFilter
    return matchesSearch && matchesStage && matchesVenture && matchesLga && matchesRisk
  })

  const selected = selectedBeneficiary ? mockBeneficiaries.find((b) => b.id === selectedBeneficiary) : null

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Beneficiary Monitoring</h1>
        <p className="text-muted-foreground mt-2">Track progress and manage all grant-funded entrepreneurs across Calabar LGAs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Section */}
        <div className="lg:col-span-2">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or business..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Filter Buttons - Stage */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Stage:</span>
              </div>
              <button
                onClick={() => setStageFilter("all")}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  stageFilter === "all"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground hover:bg-secondary"
                }`}
              >
                All
              </button>
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setStageFilter(stage)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    stageFilter === stage
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-secondary"
                  }`}
                >
                  {stage.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Filter Buttons - LGA */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">LGA:</span>
              </div>
              <button
                onClick={() => setLgaFilter("all")}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  lgaFilter === "all"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground hover:bg-secondary"
                }`}
              >
                All
              </button>
              {lgas.map((lga) => (
                <button
                  key={lga}
                  onClick={() => setLgaFilter(lga)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    lgaFilter === lga
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-secondary"
                  }`}
                >
                  {lga.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Filter Buttons - Venture Type */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Type:</span>
              </div>
              <button
                onClick={() => setVentureFilter("all")}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  ventureFilter === "all"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground hover:bg-secondary"
                }`}
              >
                All
              </button>
              {ventures.map((venture) => (
                <button
                  key={venture}
                  onClick={() => setVentureFilter(venture)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    ventureFilter === venture
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-secondary"
                  }`}
                  title={venture}
                >
                  {venture.substring(0, 8)}...
                </button>
              ))}
            </div>

            {/* Filter Buttons - Risk */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Risk:</span>
              </div>
              <button
                onClick={() => setRiskFilter("all")}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  riskFilter === "all"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground hover:bg-secondary"
                }`}
              >
                All
              </button>
              {riskLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setRiskFilter(level)}
                  className={`px-3 py-1 rounded text-sm font-medium transition capitalize ${
                    riskFilter === level
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-secondary"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Beneficiaries List */}
          <div className="space-y-3">
            {filtered.map((beneficiary) => (
              <button
                key={beneficiary.id}
                onClick={() => setSelectedBeneficiary(beneficiary.id)}
                className={`w-full text-left border rounded-lg p-4 transition ${
                  selectedBeneficiary === beneficiary.id
                    ? "border-accent bg-muted"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{beneficiary.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{beneficiary.businessName}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="inline-block px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                        {beneficiary.stage}
                      </span>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {beneficiary.ventureType}
                      </span>
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        {beneficiary.lga}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${
                          beneficiary.riskLevel === "low"
                            ? "bg-green-100 text-green-800"
                            : beneficiary.riskLevel === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {beneficiary.riskLevel} risk
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-foreground mb-6">{selected.name}</h2>

              <div className="space-y-6">
                {/* Business Name */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Business Name</p>
                  <p className="text-sm text-foreground mt-1">{selected.businessName}</p>
                </div>

                {/* Venture Type */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Venture Type</p>
                  <p className="text-sm text-foreground mt-1">{selected.ventureType}</p>
                </div>

                {/* LGA */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">LGA (Location)</p>
                  <p className="text-sm text-foreground mt-1">{selected.lga}</p>
                </div>

                {/* Stage Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Overall Progress</p>
                    <span className="text-sm font-bold text-accent">{selected.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-full rounded-full" style={{ width: `${selected.progress}%` }} />
                  </div>
                </div>

                {/* Current Stage */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Current Stage</p>
                  <p className="text-sm text-foreground mt-1">{selected.stage}</p>
                </div>

                {/* Funds Released */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Funds Released</p>
                  <p className="text-sm text-foreground mt-1">₦{(selected.fundReleased / 1000).toFixed(0)}K</p>
                </div>

                {/* Next Milestone */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Next Milestone</p>
                  <p className="text-sm text-foreground mt-1">{selected.nextMilestone}</p>
                </div>

                {/* Risk Status */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Risk Level</p>
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-semibold capitalize ${
                      selected.riskLevel === "low"
                        ? "bg-green-100 text-green-800"
                        : selected.riskLevel === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selected.riskLevel}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <button className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded font-medium text-sm hover:opacity-90">
                    View Full Profile
                  </button>
                  <button className="flex-1 px-4 py-2 border border-border text-foreground rounded font-medium text-sm hover:bg-muted">
                    Approve Milestone
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
              <p className="text-sm">Select a beneficiary to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
