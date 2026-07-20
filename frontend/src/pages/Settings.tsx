import { API_BASE } from '../api'
import PixelAvatar from '../components/PixelAvatar'
import { useThemeStore } from '../stores/useThemeStore'

export default function Settings() {
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)
  const isDark = theme === 'dark'

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
          <PixelAvatar />
          <div>
            <p className="eyebrow">Player</p>
            <h3>FitQuest avatar</h3>
            <p>Figma-designed Wild Power Champion avatar for the quest dashboard.</p>
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
    </section>
  )
}
