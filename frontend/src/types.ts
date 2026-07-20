export type QuestCategory = 'Strength' | 'Cardio' | 'Flexibility' | 'Endurance' | 'Mobility' | 'Recovery'
export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard'
export type AchievementConditionType = 'FirstWorkout' | 'StreakDays' | 'CategoryCompletions' | 'TotalCompletions' | 'TotalXp'

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

export interface CompleteWorkoutQuestResponse {
  workoutLogId: number
  workoutQuestId: number
  userProfileId: number
  xpEarned: number
  totalXp: number
  level: number
  currentStreak: number
  longestStreak: number
  unlockedAchievements: UnlockedAchievement[]
  completedAt: string
}

export interface UnlockedAchievement {
  id: number
  name: string
  icon: string
  xpBonus: number
}

export interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  conditionType: AchievementConditionType
  conditionValue: number
  xpBonus: number
  isUnlocked: boolean
  unlockedAt: string | null
}

export interface ProfileSummary {
  id: number
  username: string
  totalXp: number
  level: number
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string | null
  completedWorkoutCount: number
  xpForCurrentLevel: number
  xpForNextLevel: number
  xpIntoCurrentLevel: number
}

export interface WorkoutLog {
  id: number
  workoutQuestId: number
  questTitle: string
  category: QuestCategory
  difficulty: QuestDifficulty
  xpEarned: number
  notes: string
  completedAt: string
}
