export default function About() {
  return (
    <section className="panel about-panel">
      <p className="eyebrow">Project</p>
      <h2>FitQuest</h2>
      <p>
        FitQuest is a gamified fitness challenge tracker for the MSA 2026 Software Stream.
      </p>
      <div className="summary-grid">
        <div>
          <strong>Frontend</strong>
          <span>React TypeScript</span>
        </div>
        <div>
          <strong>Backend</strong>
          <span>C# .NET API</span>
        </div>
        <div>
          <strong>Theme</strong>
          <span>Gamification</span>
        </div>
      </div>
    </section>
  )
}
