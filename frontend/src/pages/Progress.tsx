import { useEffect, useState } from 'react'
import { getWorkoutLogs } from '../api'
import type { WorkoutLog } from '../types'

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function Progress() {
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLogs() {
      try {
        setIsLoading(true)
        setError('')
        setLogs(await getWorkoutLogs(50))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load workout history')
      } finally {
        setIsLoading(false)
      }
    }

    loadLogs()
  }, [])

  return (
    <section className="page-stack">
      <div className="hero-band">
        <div>
          <p className="eyebrow">Progress</p>
          <h2>Training history</h2>
        </div>
        <div className="metric-row" aria-label="Progress summary">
          <div>
            <strong>{logs.length}</strong>
            <span>Logs</span>
          </div>
          <div>
            <strong>{logs.reduce((sum, log) => sum + log.xpEarned, 0)}</strong>
            <span>XP Earned</span>
          </div>
          <div>
            <strong>{logs[0] ? formatDateTime(logs[0].completedAt) : 'None'}</strong>
            <span>Latest</span>
          </div>
        </div>
      </div>

      {error && <p className="status error">{error}</p>}
      {isLoading && <p className="muted">Loading workout history...</p>}

      <section className="panel activity-panel">
        <p className="eyebrow">Workout Logs</p>
        <h3>Completed quests</h3>

        {!isLoading && logs.length === 0 ? (
          <div className="empty-state">
            <strong>No workout logs yet</strong>
            <span>Complete a quest from the Quest Board to create your first log.</span>
          </div>
        ) : (
          <div className="activity-list">
            {logs.map(log => (
              <article className="activity-card" key={log.id}>
                <div>
                  <p className={`category-pill ${log.category.toLowerCase()}`}>{log.category}</p>
                  <h4>{log.questTitle}</h4>
                  <p className="muted">{log.difficulty} quest completed on {formatDateTime(log.completedAt)}</p>
                </div>
                <div className="quest-meta">
                  <span className="xp-pill">+{log.xpEarned} XP</span>
                  {log.notes && <span>{log.notes}</span>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  )
}
