import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  addItemComment,
  applyMilestoneFilters,
  getItemTrace,
} from '../services/itemTraceService'
import {
  defaultFilters,
  type ItemTrace,
  type NewCommentInput,
  type TraceFilters,
} from '../types/itemTrace'

type LoadState = 'idle' | 'loading' | 'empty' | 'ready' | 'error'

const SEARCH_SKELETON_MS = 1000

interface UseItemTraceResult {
  query: string
  setQuery: (value: string) => void
  search: (value?: string) => void
  trace: ItemTrace | null
  filteredMilestones: ItemTrace['milestones']
  selectedMilestoneId: string | null
  setSelectedMilestoneId: (id: string | null) => void
  filters: TraceFilters
  setFilters: (filters: TraceFilters) => void
  resetFilters: () => void
  loadState: LoadState
  errorMessage: string
  isRefreshing: boolean
  lastUpdated: Date
  refresh: () => void
  addComment: (input: NewCommentInput) => void
  retry: () => void
}

export function useItemTrace(): UseItemTraceResult {
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [trace, setTrace] = useState<ItemTrace | null>(null)
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null)
  const [filters, setFilters] = useState<TraceFilters>(defaultFilters)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(() => new Date('2025-05-20T10:30:00'))
  const loadTimerRef = useRef<number | null>(null)

  const clearLoadTimer = useCallback(() => {
    if (loadTimerRef.current !== null) {
      window.clearTimeout(loadTimerRef.current)
      loadTimerRef.current = null
    }
  }, [])

  useEffect(() => () => clearLoadTimer(), [clearLoadTimer])

  const load = useCallback((identifier: string) => {
    const value = identifier.trim()
    if (!value) {
      setTrace(null)
      setSelectedMilestoneId(null)
      setLoadState('idle')
      setErrorMessage('')
      return
    }

    try {
      const result = getItemTrace(value)
      if (!result) {
        setTrace(null)
        setSelectedMilestoneId(null)
        setLoadState('empty')
        setErrorMessage('')
        return
      }

      const current = result.milestones.find((m) => m.status === 'in_progress')
      setTrace(result)
      setSelectedMilestoneId(current?.id ?? result.milestones[0]?.id ?? null)
      setLoadState('ready')
      setErrorMessage('')
      setLastUpdated(new Date(result.lastUpdated))
    } catch (error) {
      setTrace(null)
      setSelectedMilestoneId(null)
      setLoadState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
    }
  }, [])

  const search = useCallback(
    (value?: string) => {
      const next = value ?? query
      setQuery(next)
      setActiveQuery(next)
      clearLoadTimer()

      if (!next.trim()) {
        load(next)
        return
      }

      setTrace(null)
      setSelectedMilestoneId(null)
      setErrorMessage('')
      setLoadState('loading')
      loadTimerRef.current = window.setTimeout(() => {
        load(next)
        loadTimerRef.current = null
      }, SEARCH_SKELETON_MS)
    },
    [clearLoadTimer, load, query],
  )

  const refresh = useCallback(() => {
    setIsRefreshing(true)
    window.setTimeout(() => {
      if (activeQuery) load(activeQuery)
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 450)
  }, [activeQuery, load])

  const retry = useCallback(() => {
    load(activeQuery || query)
  }, [activeQuery, load, query])

  const addComment = useCallback(
    (input: NewCommentInput) => {
      if (!activeQuery) return
      addItemComment(activeQuery, input)
      load(activeQuery)
    },
    [activeQuery, load],
  )

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const filteredMilestones = useMemo(() => {
    if (!trace) return []
    return applyMilestoneFilters(trace, filters)
  }, [trace, filters])

  return {
    query,
    setQuery,
    search,
    trace,
    filteredMilestones,
    selectedMilestoneId,
    setSelectedMilestoneId,
    filters,
    setFilters,
    resetFilters,
    loadState,
    errorMessage,
    isRefreshing,
    lastUpdated,
    refresh,
    addComment,
    retry,
  }
}
