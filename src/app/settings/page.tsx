import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Workspace and user preferences will appear here."
    />
  )
}
