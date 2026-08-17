import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Operations',
}

export default function OperationsPage() {
  return (
    <PlaceholderPage
      title="Operations"
      description="Inbound, putaway and dispatch operations will appear here."
    />
  )
}
