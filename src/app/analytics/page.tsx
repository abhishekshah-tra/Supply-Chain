import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Analytics & Reports',
}

export default function AnalyticsPage() {
  return (
    <PlaceholderPage
      title="Analytics & Reports"
      description="SLA and network analytics will appear here."
    />
  )
}
