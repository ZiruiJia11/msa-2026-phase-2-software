import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Dashboard from './Dashboard'

vi.mock('../api', () => ({
  getProfileSummary: vi.fn(async () => ({
    id: 1,
    username: 'Player',
    totalXp: 125,
    level: 2,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: '2026-07-14',
    completedWorkoutCount: 3,
    xpForCurrentLevel: 100,
    xpForNextLevel: 200,
    xpIntoCurrentLevel: 25,
  })),
  getWorkoutLogs: vi.fn(async () => [
    {
      id: 1,
      workoutQuestId: 2,
      questTitle: 'Push day',
      category: 'Strength',
      difficulty: 'Medium',
      xpEarned: 50,
      notes: '',
      completedAt: '2026-07-14T09:00:00Z',
    },
  ]),
}))

describe('Dashboard', () => {
  it('renders profile progress and recent completions', async () => {
    render(<Dashboard />)

    expect(await screen.findByText('Player')).toBeInTheDocument()
    expect(screen.getByText('125')).toBeInTheDocument()
    expect(screen.getByText('Push day')).toBeInTheDocument()
    expect(screen.getByText('+50 XP')).toBeInTheDocument()
    expect(screen.getByLabelText('XP progress 25%')).toBeInTheDocument()
  })
})
