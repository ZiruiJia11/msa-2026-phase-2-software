export type QuestCategory = 'Strength' | 'Cardio' | 'Flexibility' | 'Endurance' | 'Mobility' | 'Recovery'
export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard'

export interface WorkoutQuest {
  id: number
  title: string
  description: string
  category: QuestCategory
  difficulty: QuestDifficulty
  xpReward: number
  dueDate: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateWorkoutQuestRequest {
  title: string
  description: string
  category: QuestCategory
  difficulty: QuestDifficulty
  dueDate: string | null
}

export interface UpdateWorkoutQuestRequest extends CreateWorkoutQuestRequest {
  isActive: boolean
}
