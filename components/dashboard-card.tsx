import type { ReactNode } from "react"

interface DashboardCardProps {
  title: string
  value: ReactNode
  subtitle?: string
  icon?: ReactNode
  className?: string
}

export function DashboardCard({ title, value, subtitle, icon, className = "" }: DashboardCardProps) {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground mt-2">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
    </div>
  )
}
