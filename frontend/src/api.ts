import type {
  Achievement,
  CompleteWorkoutQuestResponse,
  CreateWorkoutQuestRequest,
  ProfileSummary,
  UpdateWorkoutQuestRequest,
  WorkoutLog,
  WorkoutQuest,
} from './types'

export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'
const QUESTS_BASE = `${API_BASE}/workoutquests`

async function parseResponse<T>(res: Response, fallbackMessage: string): Promise<T> {
  if (!res.ok) {
    let message = fallbackMessage
    try {
      const body = await res.json()
      if (typeof body.message === 'string') message = body.message
    } catch {
      // Keep fallback message when the response has no JSON body.
    }
    throw new Error(message)
  }

  return res.json()
}

export async function getWorkoutQuests(includeInactive = false): Promise<WorkoutQuest[]> {
  const res = await fetch(`${QUESTS_BASE}?includeInactive=${includeInactive}`)
  return parseResponse<WorkoutQuest[]>(res, 'Failed to fetch workout quests')
}

export async function createWorkoutQuest(request: CreateWorkoutQuestRequest): Promise<WorkoutQuest> {
  const res = await fetch(QUESTS_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  return parseResponse<WorkoutQuest>(res, 'Failed to create workout quest')
}

export async function updateWorkoutQuest(id: number, request: UpdateWorkoutQuestRequest): Promise<WorkoutQuest> {
  const res = await fetch(`${QUESTS_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  return parseResponse<WorkoutQuest>(res, 'Failed to update workout quest')
}

export async function completeWorkoutQuest(id: number): Promise<CompleteWorkoutQuestResponse> {
  const res = await fetch(`${QUESTS_BASE}/${id}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes: '' }),
  })

  return parseResponse<CompleteWorkoutQuestResponse>(res, 'Failed to complete workout quest')
}

export async function archiveWorkoutQuest(id: number): Promise<void> {
  const res = await fetch(`${QUESTS_BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to archive workout quest')
}

export async function getProfileSummary(): Promise<ProfileSummary> {
  const res = await fetch(`${API_BASE}/profile`)
  return parseResponse<ProfileSummary>(res, 'Failed to fetch profile summary')
}

export async function getWorkoutLogs(limit = 20): Promise<WorkoutLog[]> {
  const res = await fetch(`${API_BASE}/workoutlogs?limit=${limit}`)
  return parseResponse<WorkoutLog[]>(res, 'Failed to fetch workout logs')
}

export async function getAchievements(): Promise<Achievement[]> {
  const res = await fetch(`${API_BASE}/achievements`)
  return parseResponse<Achievement[]>(res, 'Failed to fetch achievements')
}
