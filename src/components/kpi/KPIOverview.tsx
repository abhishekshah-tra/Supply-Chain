'use client'

import { memo } from 'react'
import {
  Clock3,
  Gauge,
  Hourglass,
  Route,
  ShieldCheck,
  CornerUpRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { JourneyKpis } from '../../types/itemTrace'
import { formatHours, formatPercent } from '../../utils/format'

interface KPICardProps {
  label: string
  value: string
  secondary: string
  icon: LucideIcon
  tone?: 'neutral' | 'info' | 'success' | 'warning'
}

export const KPICard = memo(function KPICard({
  label,
  value,
  secondary,
  icon: Icon,
  tone = 'neutral',
}: KPICardProps) {
  return (
    <article className={`kpi-card kpi-card--${tone}`}>
      <div className="kpi-card__text">
        <p className="kpi-card__label">{label}</p>
        <p className="kpi-card__value">{value}</p>
        <p className="kpi-card__meta">{secondary}</p>
      </div>
      <span className="kpi-card__icon" aria-hidden="true">
        <Icon size={18} />
      </span>
    </article>
  )
})

interface KPIOverviewProps {
  kpis: JourneyKpis
}

export const KPIOverview = memo(function KPIOverview({ kpis }: KPIOverviewProps) {
  return (
    <section className="kpi-grid" aria-label="Journey summary">
      <KPICard
        label="Journey Status"
        value={kpis.journeyStatus}
        secondary={kpis.journeyStatusDetail}
        icon={Route}
        tone="info"
      />
      <KPICard
        label="Total Lead Time"
        value={formatHours(kpis.totalLeadTimeHours)}
        secondary={`SLA: ${formatHours(kpis.slaHours)}`}
        icon={Clock3}
      />
      <KPICard
        label="Elapsed Time"
        value={formatHours(kpis.elapsedTimeHours)}
        secondary={`${formatPercent(kpis.slaUtilizedPercent)} of SLA`}
        icon={Hourglass}
      />
      <KPICard
        label="Next Milestone"
        value={kpis.nextMilestone}
        secondary={`ETA: ${kpis.nextMilestoneEta}`}
        icon={CornerUpRight}
      />
      <KPICard
        label="SLA Compliance"
        value={kpis.slaComplianceLabel}
        secondary={kpis.slaComplianceDetail}
        icon={ShieldCheck}
        tone="success"
      />
      <KPICard
        label="Delay Risk"
        value={kpis.delayRisk === 'low' ? 'Low' : kpis.delayRisk === 'medium' ? 'Medium' : 'High'}
        secondary={kpis.delayRiskDetail}
        icon={Gauge}
        tone={kpis.delayRisk === 'low' ? 'success' : 'warning'}
      />
    </section>
  )
})
