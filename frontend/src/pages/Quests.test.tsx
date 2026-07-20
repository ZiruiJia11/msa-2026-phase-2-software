import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  archiveWorkoutQuest,
  completeWorkoutQuest,
  createWorkoutQuest,
  getWorkoutQuests,
  updateWorkoutQuest,
} from '../api'
import Quests from './Quests'

vi.mock('../api', () => ({
  archiveWorkoutQuest: vi.fn(async () => undefined),
  completeWorkoutQuest: vi.fn(async () => ({
    workoutLogId: 10,
    workoutQuestId: 1,
    userProfileId: 1,
    xpEarned: 50,
    totalXp: 175,
    level: 2,
    currentStreak: 3,
    longestStreak: 3,
    unlockedAchievements: [
      {
        id: 2,
        name: '3-Day Streak',
        icon: 'streak',
        xpBonus: 75,
      },
    ],
    completedAt: '2026-07-20T10:00:00Z',
  })),
  createWorkoutQuest: vi.fn(async () => ({
    id: 2,
    title: 'Recovery walk',
    description: 'Easy movement',
    category: 'Recovery',
    difficulty: 'Easy',
    xpReward: 25,
    dueDate: null,
    isActive: true,
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z',
  })),
  getWorkoutQuests: vi.fn(async () => [
    {
      id: 1,
      title: 'Push day',
      description: 'Chest, shoulders, and triceps',
      category: 'Strength',
      difficulty: 'Medium',
      xpReward: 50,
      dueDate: '2026-07-24',
      isActive: true,
      createdAt: '2026-07-20T09:00:00Z',
      updatedAt: '2026-07-20T09:00:00Z',
    },
  ]),
  updateWorkoutQuest: vi.fn(async () => ({
    id: 1,
    title: 'Push day',
    description: 'Chest, shoulders, and triceps',
    category: 'Strength',
    difficulty: 'Medium',
    xpReward: 50,
    dueDate: '2026-07-24',
    isActive: true,
    createdAt: '2026-07-20T09:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z',
  })),
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Quests', () => {
  it('loads active quests and shows summary metrics', async () => {
    render(<Quests />)

    expect(await screen.findByText('Push day')).toBeInTheDocument()
    expect(screen.getByText('Chest, shoulders, and triceps')).toBeInTheDocument()
    expect(within(screen.getByLabelText('Quest summary')).getByText('1')).toBeInTheDocument()
    expect(within(screen.getByLabelText('Quest summary')).getByText('50')).toBeInTheDocument()
  })

  it('completes a quest and shows unlocked achievement feedback', async () => {
    render(<Quests />)

    const questCard = (await screen.findByText('Push day')).closest('article')
    expect(questCard).not.toBeNull()

    fireEvent.click(within(questCard as HTMLElement).getByRole('button', { name: 'Complete' }))

    expect(completeWorkoutQuest).toHaveBeenCalledWith(1)
    expect(await screen.findByText(/Quest complete: \+50 XP/)).toBeInTheDocument()
    expect(screen.getByText(/Streak 3/)).toBeInTheDocument()
    expect(screen.getByText(/Unlocked: 3-Day Streak \(\+75 XP\)/)).toBeInTheDocument()
    expect(getWorkoutQuests).toHaveBeenCalledTimes(2)
  })

  it('creates a quest from the form', async () => {
    render(<Quests />)

    await screen.findByText('Push day')

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Recovery walk' } })
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Easy movement' } })
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Recovery' } })
    fireEvent.change(screen.getByLabelText('Difficulty'), { target: { value: 'Easy' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create quest' }))

    expect(createWorkoutQuest).toHaveBeenCalledWith({
      title: 'Recovery walk',
      description: 'Easy movement',
      category: 'Recovery',
      difficulty: 'Easy',
      dueDate: null,
    })
    expect(await screen.findByText('Quest created')).toBeInTheDocument()
  })

  it('archives and restores a quest', async () => {
    vi.mocked(getWorkoutQuests)
      .mockResolvedValueOnce([
        {
          id: 1,
          title: 'Push day',
          description: 'Chest, shoulders, and triceps',
          category: 'Strength',
          difficulty: 'Medium',
          xpReward: 50,
          dueDate: '2026-07-24',
          isActive: true,
          createdAt: '2026-07-20T09:00:00Z',
          updatedAt: '2026-07-20T09:00:00Z',
        },
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          id: 1,
          title: 'Push day',
          description: 'Chest, shoulders, and triceps',
          category: 'Strength',
          difficulty: 'Medium',
          xpReward: 50,
          dueDate: '2026-07-24',
          isActive: false,
          createdAt: '2026-07-20T09:00:00Z',
          updatedAt: '2026-07-20T10:00:00Z',
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 1,
          title: 'Push day',
          description: 'Chest, shoulders, and triceps',
          category: 'Strength',
          difficulty: 'Medium',
          xpReward: 50,
          dueDate: '2026-07-24',
          isActive: true,
          createdAt: '2026-07-20T09:00:00Z',
          updatedAt: '2026-07-20T11:00:00Z',
        },
      ])

    render(<Quests />)

    const questCard = (await screen.findByText('Push day')).closest('article')
    expect(questCard).not.toBeNull()

    fireEvent.click(within(questCard as HTMLElement).getByRole('button', { name: 'Archive' }))
    expect(archiveWorkoutQuest).toHaveBeenCalledWith(1)
    expect(await screen.findByText('Quest archived')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Archived'))
    expect(await screen.findByText('Archived')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Restore' }))
    expect(updateWorkoutQuest).toHaveBeenCalledWith(1, {
      title: 'Push day',
      description: 'Chest, shoulders, and triceps',
      category: 'Strength',
      difficulty: 'Medium',
      dueDate: '2026-07-24',
      isActive: true,
    })
    expect(await screen.findByText('Quest restored')).toBeInTheDocument()
  })
})
