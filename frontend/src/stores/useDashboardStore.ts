import { create } from 'zustand'
import { getProfileSummary, getWorkoutLogs } from '../api'
import type { ProfileSummary, WorkoutLog } from '../types'

interface DashboardState {
  profile: ProfileSummary | null
  recentLogs: WorkoutLog[]
  isLoading: boolean
  error: string
  loadDashboard: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>(set => ({
  profile: null,
  recentLogs: [],
  isLoading: false,
  error: '',
  loadDashboard: async () => {
    try {
      set({ isLoading: true, error: '' })
      const [profile, recentLogs] = await Promise.all([
        getProfileSummary(),
        getWorkoutLogs(5),
      ])
      set({ profile, recentLogs })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Could not load dashboard' })
    } finally {
      set({ isLoading: false })
    }
  },
}))
