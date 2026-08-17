'use client'

import { createContext, useContext, type ReactNode } from 'react'

interface LayoutContextValue {
  onMenuClick: () => void
}

const LayoutContext = createContext<LayoutContextValue>({
  onMenuClick: () => undefined,
})

export function LayoutProvider({
  value,
  children,
}: {
  value: LayoutContextValue
  children: ReactNode
}) {
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export function useLayout() {
  return useContext(LayoutContext)
}
