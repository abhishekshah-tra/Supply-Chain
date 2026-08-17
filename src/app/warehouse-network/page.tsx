import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Warehouse Network',
}

export default function WarehouseNetworkPage() {
  return (
    <PlaceholderPage
      title="Warehouse Network"
      description="Warehouse topology and capacity views will appear here."
    />
  )
}
