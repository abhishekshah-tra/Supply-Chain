import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Control Tower',
}

export default function ControlTowerPage() {
  return (
    <PlaceholderPage
      title="Control Tower"
      description="Network-level operational control tower is coming next."
    />
  )
}
