import { useEffect, useMemo, useState } from 'react'
import { getAchievements } from '../api'
import type { Achievement } from '../types'

function formatUnlockedAt(value: string | null) {
  if (!value) return 'Locked'

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadAchievements() {
      try {
        setIsLoading(true)
        setError('')
        setAchievements(await getAchievements())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load achievements')
      } finally {
        setIsLoading(false)
      }
    }

    loadAchievements()
  }, [])

  const unlockedCount = useMemo(
    () => achievements.filter(achievement => achievement.isUnlocked).length,
    [achievements],
  )

  return (
    <section className="page-stack">
      <div className="hero-band">
        <div>
          <p className="eyebrow">Achievements</p>
          <h2>Badge collection</h2>
        </div>
        <div className="metric-row" aria-label="Achievement summary">
          <div>
            <strong>{unlockedCount}</strong>
            <span>Unlocked</span>
          </div>
          <div>
            <strong>{achievements.length}</strong>
            <span>Total badges</span>
          </div>
          <div>
            <strong>{achievements.length - unlockedCount}</strong>
            <span>Locked</span>
          </div>
        </div>
      </div>

      {error && <p className="status error">{error}</p>}
      {isLoading && <p className="muted">Loading achievements...</p>}

      {!isLoading && achievements.length === 0 && (
        <section className="panel placeholder-panel">
          <p className="eyebrow">Badges</p>
          <h3>No achievements available</h3>
          <p>Achievements will appear after the backend seeds the default badge set.</p>
        </section>
      )}

      <section className="achievement-grid" aria-label="Achievement badges">
        {achievements.map(achievement => (
          <article
            className={achievement.isUnlocked ? 'achievement-card unlocked' : 'achievement-card'}
            key={achievement.id}
          >
            <div className="achievement-icon" aria-hidden="true">{achievement.icon}</div>
            <div>
              <p className="eyebrow">{achievement.isUnlocked ? 'Unlocked' : 'Locked'}</p>
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
            </div>
            <div className="quest-meta">
              <span>{formatUnlockedAt(achievement.unlockedAt)}</span>
              <span className="xp-pill">+{achievement.xpBonus} XP</span>
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}
