'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { LayoutProvider } from './LayoutContext'
import { Sidebar } from './Sidebar'

export function AppLayout({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 1100px)')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    if (isDesktop) {
      setCollapsed((value) => !value)
    } else {
      setMobileOpen((value) => !value)
    }
  }

  return (
    <LayoutProvider value={{ onMenuClick: toggleMenu }}>
      <div className={`app-shell ${collapsed && isDesktop ? 'is-collapsed' : ''}`}>
        <Sidebar
          collapsed={isDesktop ? collapsed : false}
          mobileOpen={!isDesktop && mobileOpen}
          onNavigate={() => setMobileOpen(false)}
        />
        {!isDesktop && mobileOpen ? (
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <div className="app-main">{children}</div>
      </div>
    </LayoutProvider>
  )
}
