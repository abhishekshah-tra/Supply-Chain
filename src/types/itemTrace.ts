export const MilestoneStatus = {
  Completed: 'completed',
  InProgress: 'in_progress',
  Upcoming: 'upcoming',
  Exception: 'exception',
} as const

export type MilestoneStatus =
  (typeof MilestoneStatus)[keyof typeof MilestoneStatus]

export const AlertSeverity = {
  Info: 'info',
  Warning: 'warning',
  Critical: 'critical',
} as const

export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity]

export const DelayRisk = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
} as const

export type DelayRisk = (typeof DelayRisk)[keyof typeof DelayRisk]

export const SlaCompliance = {
  OnTrack: 'on_track',
  AtRisk: 'at_risk',
  Breached: 'breached',
} as const

export type SlaCompliance = (typeof SlaCompliance)[keyof typeof SlaCompliance]

export interface ItemDetails {
  poNumber: string
  shipmentAsn: string
  containerNo: string
  palletNo: string
  cartonNo: string
  sku: string
  itemDescription: string
  quantity: number
  quantityUom: string
  division: string
  destination: string
  journeyType: string
  supplierName: string
  originCountry: string
  hsCode: string
  brand: string
  color: string
  size: string
  netWeight: string
  expectedStoreDate: string
}

export interface Milestone {
  id: string
  name: string
  location: string
  locationId: string
  eventTime: string | null
  etaTime: string | null
  dwellTimeHours: number | null
  status: MilestoneStatus
  icon: string
}

export interface JourneyKpis {
  journeyStatus: string
  journeyStatusDetail: string
  totalLeadTimeHours: number
  slaHours: number
  elapsedTimeHours: number
  slaUtilizedPercent: number
  nextMilestone: string
  nextMilestoneEta: string
  slaCompliance: SlaCompliance
  slaComplianceLabel: string
  slaComplianceDetail: string
  delayRisk: DelayRisk
  delayRiskDetail: string
}

export interface JourneyMetrics {
  totalJourneyTimeHours: number
  totalDwellTimeHours: number
  totalProcessingTimeHours: number
  totalWaitingTimeHours: number
  slaHours: number
  slaVarianceHours: number
  slaUtilizedPercent: number
  agingHours: number
}

export interface AlertItem {
  id: string
  severity: AlertSeverity
  title: string
  description: string
  timestamp: string
  location: string
  milestoneId: string
  acknowledged: boolean
}

export interface CommentItem {
  id: string
  author: string
  role: string
  location: string
  timestamp: string
  message: string
}

export interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  status: MilestoneStatus
  address: string
}

export interface ItemTrace {
  id: string
  identifiers: string[]
  item: ItemDetails
  kpis: JourneyKpis
  milestones: Milestone[]
  alerts: AlertItem[]
  comments: CommentItem[]
  metrics: JourneyMetrics
  locations: MapLocation[]
  lastUpdated: string
}

export interface TraceFilters {
  status: MilestoneStatus | 'all'
  location: string | 'all'
  journeyType: string | 'all'
  dateFrom: string
  dateTo: string
  exceptionOnly: boolean
}

export interface NewCommentInput {
  message: string
  author: string
  role: string
  location: string
}

export const defaultFilters: TraceFilters = {
  status: 'all',
  location: 'all',
  journeyType: 'all',
  dateFrom: '',
  dateTo: '',
  exceptionOnly: false,
}
