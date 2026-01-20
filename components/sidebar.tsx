"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, DollarSign, Bot, Briefcase, AlertCircle } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/admin/beneficiaries", label: "Beneficiaries", icon: Users },
    { href: "/admin/funding", label: "Funding", icon: DollarSign },
    { href: "/admin/ai-auditor", label: "AI Auditor", icon: Bot },
    { href: "/admin/analytics", label: "Analytics", icon: AlertCircle },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-8 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Grant Program</h1>
        <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-border text-xs text-muted-foreground">
        <p>Grant Program Administration</p>
        <p>Calabar, Cross River State</p>
      </div>
    </aside>
  )
}
