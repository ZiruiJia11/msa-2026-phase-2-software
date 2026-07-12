import type {
  CompleteWorkoutQuestResponse,
  CreateWorkoutQuestRequest,
  UpdateWorkoutQuestRequest,
  WorkoutQuest,
} from './types'

const BASE = 'http://localhost:5000/api/workoutquests'

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
  const res = await fetch(`${BASE}?includeInactive=${includeInactive}`)
  return parseResponse<WorkoutQuest[]>(res, 'Failed to fetch workout quests')
}

export async function createWorkoutQuest(request: CreateWorkoutQuestRequest): Promise<WorkoutQuest> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  return parseResponse<WorkoutQuest>(res, 'Failed to create workout quest')
}

export async function updateWorkoutQuest(id: number, request: UpdateWorkoutQuestRequest): Promise<WorkoutQuest> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  return parseResponse<WorkoutQuest>(res, 'Failed to update workout quest')
}

export async function completeWorkoutQuest(id: number): Promise<CompleteWorkoutQuestResponse> {
  const res = await fetch(`${BASE}/${id}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes: '' }),
  })

  return parseResponse<CompleteWorkoutQuestResponse>(res, 'Failed to complete workout quest')
}

export async function archiveWorkoutQuest(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to archive workout quest')
}
