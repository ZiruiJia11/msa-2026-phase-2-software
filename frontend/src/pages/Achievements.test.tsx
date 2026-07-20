import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Achievements from './Achievements'

vi.mock('../api', () => ({
  getAchievements: vi.fn(async () => [
    {
      id: 1,
      name: 'First Quest',
      description: 'Complete your first workout quest.',
      icon: 'spark',
      conditionType: 'FirstWorkout',
      conditionValue: 1,
      xpBonus: 25,
      isUnlocked: true,
      unlockedAt: '2026-07-20T09:00:00Z',
    },
    {
      id: 2,
      name: '3-Day Streak',
      description: 'Build a three day workout streak.',
      icon: 'streak',
      conditionType: 'StreakDays',
      conditionValue: 3,
      xpBonus: 75,
      isUnlocked: false,
      unlockedAt: null,
    },
  ]),
}))

afterEach(() => {
  cleanup()
})

describe('Achievements', () => {
  it('renders unlocked and locked achievement badges', async () => {
    render(<Achievements />)

    expect(await screen.findByText('First Quest')).toBeInTheDocument()
    expect(screen.getByText('3-Day Streak')).toBeInTheDocument()
    expect(within(screen.getByLabelText('Achievement summary')).getByText('2')).toBeInTheDocument()
    expect(screen.getAllByText('Unlocked').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Locked').length).toBeGreaterThan(0)
  })
})
