export default function Dashboard() {
  return (
    <section className="page-stack">
      <div className="hero-band">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Adventure overview</h2>
        </div>
        <div className="metric-row" aria-label="Profile summary">
          <div>
            <strong>1</strong>
            <span>Level</span>
          </div>
          <div>
            <strong>0</strong>
            <span>Total XP</span>
          </div>
          <div>
            <strong>0 days</strong>
            <span>Streak</span>
          </div>
        </div>
      </div>

      <section className="panel placeholder-panel">
        <p className="eyebrow">Next Build</p>
        <h3>Dashboard stats will appear here</h3>
        <p>
          This page will show XP progress, streaks, weekly completions, and recent quest activity after
          the quest completion feature is implemented.
        </p>
      </section>
    </section>
  )
}
