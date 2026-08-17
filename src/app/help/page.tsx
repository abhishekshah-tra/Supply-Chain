import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Help & Support',
}

export default function HelpPage() {
  return (
    <PlaceholderPage
      title="Help & Support"
      description="Guides and support contacts will appear here."
    />
  )
}
