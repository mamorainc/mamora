import { RefreshButton } from "./refresh-button"

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-start sm:justify-between sm:items-center justify-start gap-4 sm:flex-row">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <RefreshButton />
    </div>
  )
}
