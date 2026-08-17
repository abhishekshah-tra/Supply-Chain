'use client'

import { Bell, Menu, RefreshCw, User } from 'lucide-react'
import { PAGE_SUBTITLE, PAGE_TITLE } from '../../constants/navigation'
import { formatLastUpdated } from '../../utils/format'

interface HeaderProps {
  lastUpdated: Date
  isRefreshing: boolean
  onRefresh: () => void
  onMenuClick: () => void
  title?: string
  subtitle?: string
}

export function Header({
  lastUpdated,
  isRefreshing,
  onRefresh,
  onMenuClick,
  title = PAGE_TITLE,
  subtitle = PAGE_SUBTITLE,
}: HeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__left">
        <button
          type="button"
          className="icon-btn"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="page-header__title">{title}</h1>
          {subtitle ? <p className="page-header__subtitle">{subtitle}</p> : null}
        </div>
      </div>

      <div className="page-header__right">
        <div className="last-updated">
          <span>Last Updated: {formatLastUpdated(lastUpdated)}</span>
          <button
            type="button"
            className="icon-btn"
            onClick={onRefresh}
            aria-label="Refresh data"
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? 'is-spinning' : ''} />
          </button>
        </div>
        <button type="button" className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notif-dot" aria-hidden="true" />
        </button>
        <button type="button" className="avatar" aria-label="User profile">
          <User size={16} />
        </button>
      </div>
    </header>
  )
}
