import { create } from 'zustand'
import { getProfileSummary, getWorkoutLogs } from '../api'
import type { CompleteWorkoutQuestResponse, ProfileSummary, WorkoutLog } from '../types'

interface DashboardState {
  profile: ProfileSummary | null
  recentLogs: WorkoutLog[]
  isLoading: boolean
  error: string
  loadDashboard: () => Promise<void>
  applyQuestCompletion: (result: CompleteWorkoutQuestResponse) => void
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
  applyQuestCompletion: result => {
    set(state => {
      if (!state.profile) return state

      return {
        profile: {
          ...state.profile,
          totalXp: result.totalXp,
          level: result.level,
          currentStreak: result.currentStreak,
          longestStreak: result.longestStreak,
          lastCompletedDate: result.completedAt,
          completedWorkoutCount: state.profile.completedWorkoutCount + 1,
          xpIntoCurrentLevel: result.totalXp % 100,
        },
      }
    })
  },
}))
