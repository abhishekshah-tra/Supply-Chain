'use client'

import type { ReactNode } from 'react'
import { MilestoneStatus } from '../../types/itemTrace'
import { STATUS_LABELS } from '../../constants/status'

interface StatusBadgeProps {
  status: MilestoneStatus
  withLabel?: boolean
}

export function StatusBadge({ status, withLabel = true }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {withLabel ? STATUS_LABELS[status] : (
        <span className="sr-only">{STATUS_LABELS[status]}</span>
      )}
    </span>
  )
}

interface CardProps {
  title?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
  id?: string
}

export function Card({ title, footer, children, className = '', id }: CardProps) {
  return (
    <section className={`card ${className}`.trim()} id={id}>
      {title ? (
        <header className="card__header">
          <h2 className="card__title">{title}</h2>
        </header>
      ) : null}
      {children}
      {footer ? <footer className="card__footer">{footer}</footer> : null}
    </section>
  )
}

interface TextLinkProps {
  children: ReactNode
  onClick: () => void
}

export function TextLink({ children, onClick }: TextLinkProps) {
  return (
    <button type="button" className="text-link" onClick={onClick}>
      {children}
    </button>
  )
}
