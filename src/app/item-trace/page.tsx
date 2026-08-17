import type { Metadata } from 'next'
import { EndToEndTracePage } from '@/components/pages/EndToEndTracePage'

export const metadata: Metadata = {
  title: 'End to End Item Trace',
  description:
    "Real-time visibility of an item's journey across the supply chain and warehouse network",
}

export default function ItemTraceRoute() {
  return <EndToEndTracePage />
}
