import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Inventory',
}

export default function InventoryPage() {
  return (
    <PlaceholderPage
      title="Inventory"
      description="Inventory positions and ageing will appear here."
    />
  )
}
