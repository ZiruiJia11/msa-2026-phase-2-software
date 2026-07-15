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
          <p>Switch between a bright quest board and a darker focus mode.</p>
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
    </section>
  )
}
