import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Alerts & Exceptions',
}

export default function AlertsPage() {
  return (
    <PlaceholderPage
      title="Alerts & Exceptions"
      description="Cross-network exception inbox will appear here."
    />
  )
}
