import { useEffect, useMemo } from 'react'
import PixelAvatar from '../components/PixelAvatar'
import { useDashboardStore } from '../stores/useDashboardStore'

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

function formatDate(value: string | null) {
  if (!value) return 'No completions yet'

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export default function Dashboard() {
  const profile = useDashboardStore(state => state.profile)
  const recentLogs = useDashboardStore(state => state.recentLogs)
  const isLoading = useDashboardStore(state => state.isLoading)
  const error = useDashboardStore(state => state.error)
  const loadDashboard = useDashboardStore(state => state.loadDashboard)

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const xpProgress = useMemo(() => {
    if (!profile) return 0
    return Math.min(100, Math.round((profile.xpIntoCurrentLevel / 100) * 100))
  }, [profile])

  return (
    <section className="page-stack">
      <div className="hero-band">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Adventure overview</h2>
        </div>
        <div className="metric-row" aria-label="Profile summary">
          <div>
            <strong>{profile?.level ?? '-'}</strong>
            <span>Level</span>
          </div>
          <div>
            <strong>{profile?.totalXp ?? '-'}</strong>
            <span>Total XP</span>
          </div>
          <div>
            <strong>{profile?.currentStreak ?? '-'}</strong>
            <span>Day streak</span>
          </div>
        </div>
      </div>

      {error && <p className="status error">{error}</p>}
      {isLoading && <p className="muted">Loading dashboard...</p>}

      {profile && (
        <section className="content-grid">
          <div className="panel progress-panel">
            <div className="dashboard-avatar-row">
              <div>
                <p className="eyebrow">XP Progress</p>
                <h3>{profile.username}</h3>
              </div>
              <PixelAvatar level={profile.level} showStage />
            </div>
            <div className="progress-bar" aria-label={`XP progress ${xpProgress}%`}>
              <span style={{ width: `${xpProgress}%` }} />
            </div>
            <p>
              {profile.xpIntoCurrentLevel} / 100 XP toward level {profile.level + 1}
            </p>
            <div className="streak-summary" aria-label="Streak summary">
              <div>
                <strong>{profile.currentStreak}</strong>
                <span>Current streak</span>
              </div>
              <div>
                <strong>{profile.longestStreak}</strong>
                <span>Best streak</span>
              </div>
              <div>
                <strong>{formatDate(profile.lastCompletedDate)}</strong>
                <span>Last completed</span>
              </div>
            </div>
          </div>

          <div className="panel activity-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Recent Activity</p>
                <h3>Latest completions</h3>
              </div>
            </div>

            {recentLogs.length === 0 ? (
              <div className="empty-state">
                <strong>No completions yet</strong>
                <span>Complete a quest to start filling your history.</span>
              </div>
            ) : (
              <div className="activity-list">
                {recentLogs.map(log => (
                  <article className="activity-card" key={log.id}>
                    <div>
                      <p className={`category-pill ${log.category.toLowerCase()}`}>{log.category}</p>
                      <h4>{log.questTitle}</h4>
                    </div>
                    <div className="quest-meta">
                      <span className="xp-pill">+{log.xpEarned} XP</span>
                      <span>{formatDateTime(log.completedAt)}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </section>
  )
}
