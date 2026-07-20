import { API_BASE } from '../api'
import PixelAvatar, { avatarStages, getAvatarStage } from '../components/PixelAvatar'
import { useDashboardStore } from '../stores/useDashboardStore'
import { useThemeStore } from '../stores/useThemeStore'

export default function Settings() {
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)
  const profile = useDashboardStore(state => state.profile)
  const isDark = theme === 'dark'
  const currentLevel = profile?.level ?? 1
  const currentStage = getAvatarStage(currentLevel)

  return (
    <section className="page-stack">
      <div className="hero-band">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Player setup</h2>
        </div>
      </div>

      <section className="panel settings-panel">
        <div>
          <p className="eyebrow">Appearance</p>
          <h3>Theme mode</h3>
          <p>Current palette: {isDark ? 'Dark focus' : 'Bright quest board'}.</p>
        </div>

        <label className="theme-toggle">
          <input
            type="checkbox"
            checked={isDark}
            onChange={event => setTheme(event.target.checked ? 'dark' : 'light')}
          />
          <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
        </label>
      </section>

      <section className="settings-grid">
        <article className="panel settings-panel avatar-panel">
          <PixelAvatar level={currentLevel} showStage />
          <div>
            <p className="eyebrow">Player</p>
            <h3>{currentStage.name}</h3>
            <p>Avatar appearance upgrades automatically as the player reaches higher levels.</p>
          </div>
        </article>

        <article className="panel settings-panel">
          <div>
            <p className="eyebrow">Records</p>
            <h3>Completion time</h3>
            <p>Workout logs use the current completion time automatically.</p>
          </div>
          <div className="settings-value">Current time</div>
        </article>

        <article className="panel settings-panel">
          <div>
            <p className="eyebrow">Connection</p>
            <h3>API endpoint</h3>
            <p>{API_BASE}</p>
          </div>
          <div className="settings-value">Active</div>
        </article>
      </section>

      <section className="panel settings-panel avatar-evolution-panel">
        <div>
          <p className="eyebrow">Avatar Evolution</p>
          <h3>Level-based forms</h3>
        </div>
        <div className="avatar-stage-list">
          {avatarStages.map(stage => {
            const isUnlocked = currentLevel >= stage.minLevel
            const isActive = currentStage.id === stage.id

            return (
              <article
                className={`avatar-stage-card ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
                key={stage.id}
              >
                <PixelAvatar level={stage.minLevel} decorative />
                <div>
                  <span className="settings-value">Level {stage.minLevel}</span>
                  <h4>{stage.name}</h4>
                  <p>{stage.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </section>
  )
}
