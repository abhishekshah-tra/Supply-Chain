import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
  return (
    <PlaceholderPage
      title="Home"
      description="Workspace overview will appear here."
    />
  )
}
