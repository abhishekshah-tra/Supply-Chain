import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Simulation & Scenarios',
}

export default function SimulationPage() {
  return (
    <PlaceholderPage
      title="Simulation & Scenarios"
      description="What-if scenarios will appear here."
    />
  )
}
