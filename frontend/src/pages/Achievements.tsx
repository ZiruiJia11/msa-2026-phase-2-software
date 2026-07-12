const plannedBadges = ['First Quest', '3-Day Streak', 'Cardio Starter', 'Strength Builder']

export default function Achievements() {
  return (
    <section className="page-stack">
      <div className="hero-band">
        <div>
          <p className="eyebrow">Achievements</p>
          <h2>Badge collection</h2>
        </div>
      </div>

      <section className="panel placeholder-panel">
        <p className="eyebrow">Planned Badges</p>
        <h3>Unlocks will appear here</h3>
        <div className="summary-grid">
          {plannedBadges.map(badge => (
            <div key={badge}>
              <strong>{badge}</strong>
              <span>Locked</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
