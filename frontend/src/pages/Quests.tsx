import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  archiveWorkoutQuest,
  createWorkoutQuest,
  getWorkoutQuests,
  updateWorkoutQuest,
} from '../api'
import type { QuestCategory, QuestDifficulty, WorkoutQuest } from '../types'

const categories: QuestCategory[] = ['Strength', 'Cardio', 'Flexibility', 'Endurance', 'Mobility', 'Recovery']
const difficulties: QuestDifficulty[] = ['Easy', 'Medium', 'Hard']

interface QuestFormState {
  title: string
  description: string
  category: QuestCategory
  difficulty: QuestDifficulty
  dueDate: string
}

const initialForm: QuestFormState = {
  title: '',
  description: '',
  category: 'Strength',
  difficulty: 'Easy',
  dueDate: '',
}

function formatDate(value: string | null) {
  if (!value) return 'No due date'
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

function toFormState(quest: WorkoutQuest): QuestFormState {
  return {
    title: quest.title,
    description: quest.description,
    category: quest.category,
    difficulty: quest.difficulty,
    dueDate: quest.dueDate ?? '',
  }
}

export default function Quests() {
  const [quests, setQuests] = useState<WorkoutQuest[]>([])
  const [form, setForm] = useState<QuestFormState>(initialForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [includeInactive, setIncludeInactive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const activeQuests = useMemo(() => quests.filter(quest => quest.isActive), [quests])
  const totalXp = useMemo(() => activeQuests.reduce((sum, quest) => sum + quest.xpReward, 0), [activeQuests])
  const nextDue = useMemo(() => {
    return activeQuests
      .filter(quest => quest.dueDate)
      .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))[0]
  }, [activeQuests])

  const loadQuests = async () => {
    try {
      setIsLoading(true)
      setError('')
      setQuests(await getWorkoutQuests(includeInactive))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load quests')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadQuests()
  }, [includeInactive])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSaving(true)
    setError('')
    setMessage('')

    const request = {
      title: form.title,
      description: form.description,
      category: form.category,
      difficulty: form.difficulty,
      dueDate: form.dueDate || null,
    }

    try {
      if (editingId) {
        await updateWorkoutQuest(editingId, { ...request, isActive: true })
        setMessage('Quest updated')
      } else {
        await createWorkoutQuest(request)
        setMessage('Quest created')
      }

      setForm(initialForm)
      setEditingId(null)
      await loadQuests()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save quest')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (quest: WorkoutQuest) => {
    setEditingId(quest.id)
    setForm(toFormState(quest))
    setMessage('')
    setError('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm(initialForm)
    setMessage('')
    setError('')
  }

  const handleArchive = async (id: number) => {
    try {
      setError('')
      setMessage('')
      await archiveWorkoutQuest(id)
      setMessage('Quest archived')
      await loadQuests()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not archive quest')
    }
  }

  const handleRestore = async (quest: WorkoutQuest) => {
    try {
      setError('')
      setMessage('')
      await updateWorkoutQuest(quest.id, {
        title: quest.title,
        description: quest.description,
        category: quest.category,
        difficulty: quest.difficulty,
        dueDate: quest.dueDate,
        isActive: true,
      })
      setMessage('Quest restored')
      await loadQuests()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not restore quest')
    }
  }

  return (
    <div className="quest-page">
      <section className="hero-band">
        <div>
          <p className="eyebrow">FitQuest MVP</p>
          <h2>Workout quests</h2>
        </div>
        <div className="metric-row" aria-label="Quest summary">
          <div>
            <strong>{activeQuests.length}</strong>
            <span>Active</span>
          </div>
          <div>
            <strong>{totalXp}</strong>
            <span>XP</span>
          </div>
          <div>
            <strong>{nextDue ? formatDate(nextDue.dueDate) : 'None'}</strong>
            <span>Next due</span>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <form className="panel quest-form" onSubmit={handleSubmit}>
          <div className="panel-header">
            <div>
              <p className="eyebrow">{editingId ? 'Edit' : 'New'}</p>
              <h3>{editingId ? 'Update quest' : 'Create quest'}</h3>
            </div>
            {editingId && <button type="button" className="ghost-button" onClick={handleCancel}>Cancel</button>}
          </div>

          <label>
            Title
            <input
              value={form.title}
              maxLength={120}
              onChange={event => setForm(current => ({ ...current, title: event.target.value }))}
              placeholder="Push day"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              maxLength={500}
              onChange={event => setForm(current => ({ ...current, description: event.target.value }))}
              placeholder="Chest, shoulders, and triceps"
              rows={4}
            />
          </label>

          <div className="field-row">
            <label>
              Category
              <select
                value={form.category}
                onChange={event => setForm(current => ({ ...current, category: event.target.value as QuestCategory }))}
              >
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>

            <label>
              Difficulty
              <select
                value={form.difficulty}
                onChange={event => setForm(current => ({ ...current, difficulty: event.target.value as QuestDifficulty }))}
              >
                {difficulties.map(difficulty => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
              </select>
            </label>
          </div>

          <label>
            Due date
            <input
              type="date"
              value={form.dueDate}
              onChange={event => setForm(current => ({ ...current, dueDate: event.target.value }))}
            />
          </label>

          {error && <p className="status error">{error}</p>}
          {message && <p className="status success">{message}</p>}

          <button type="submit" className="primary-button" disabled={isSaving}>
            {isSaving ? 'Saving...' : editingId ? 'Save quest' : 'Create quest'}
          </button>
        </form>

        <section className="panel quest-list-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Board</p>
              <h3>Quests</h3>
            </div>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={includeInactive}
                onChange={event => setIncludeInactive(event.target.checked)}
              />
              Archived
            </label>
          </div>

          {isLoading && <p className="muted">Loading quests...</p>}

          {!isLoading && quests.length === 0 && (
            <div className="empty-state">
              <strong>No quests yet</strong>
              <span>Create your first workout quest.</span>
            </div>
          )}

          <div className="quest-list">
            {quests.map(quest => (
              <article className={quest.isActive ? 'quest-card' : 'quest-card archived'} key={quest.id}>
                <div className="quest-card-main">
                  <div>
                    <p className="eyebrow">{quest.category}</p>
                    <h4>{quest.title}</h4>
                  </div>
                  <span className={`difficulty ${quest.difficulty.toLowerCase()}`}>{quest.difficulty}</span>
                </div>
                {quest.description && <p>{quest.description}</p>}
                <div className="quest-meta">
                  <span>{quest.xpReward} XP</span>
                  <span>{formatDate(quest.dueDate)}</span>
                  <span>{quest.isActive ? 'Active' : 'Archived'}</span>
                </div>
                <div className="quest-actions">
                  <button type="button" className="ghost-button" onClick={() => handleEdit(quest)}>Edit</button>
                  {quest.isActive ? (
                    <button type="button" className="danger-button" onClick={() => handleArchive(quest.id)}>Archive</button>
                  ) : (
                    <button type="button" className="ghost-button" onClick={() => handleRestore(quest)}>Restore</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}

