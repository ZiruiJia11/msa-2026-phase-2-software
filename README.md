# FitQuest

FitQuest is a gamified fitness quest tracker built for the Microsoft Student Accelerator 2026 Phase 2 Software Stream.

The app turns personal workout tasks into quests. Users can create workout quests, complete them, earn XP, level up, and build progress history over time. FitQuest focuses on motivation, habit consistency, and progress tracking. It does not provide medical advice, personalised training plans, calorie recommendations, injury advice, or healthcare guidance.

## Assessment Theme

The 2026 software stream theme is **Gamification**.

FitQuest connects to this theme through:

- Workout quests
- XP rewards
- Level progression
- Workout logs
- Achievement planning
- Progress dashboards
- Pixel-style visual direction and game-inspired UI

## Current Features

- Workout quest CRUD:
  - Create quests
  - View quests
  - Edit quests
  - Archive quests
  - Restore archived quests
- Quest completion:
  - Complete active quests
  - Create workout log records
  - Award XP
  - Update total XP
  - Calculate level using a simple 100 XP per level rule
  - Track current and longest workout streaks
  - Unlock achievements and award achievement XP bonuses
- FitQuest frontend shell:
  - Dashboard
  - Quests
  - Progress
  - Achievements
  - Settings
- Responsive React Router navigation
- Light and dark theme switching
- API rate limiting
- Configured CORS origin allowlist
- SQLite persistent storage
- Scalar API documentation
- Figma UX design reference
- `/specs` documentation for planning, AI usage, design decisions, and development progress

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Zustand
- Custom CSS

### Backend

- C#
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Scalar API documentation

## Project Structure

```text
backend/
  Controllers/
  Data/
  Dtos/
  Models/
  Program.cs

frontend/
  src/
    pages/
    stores/
    api.ts
    App.tsx
    types.ts

specs/
  agent-instructions.md
  ai-prompts.md
  design-decisions.md
  development-log.md
  figma-design.md
  project-plan.md
```

## Running Locally

### Backend

Requires the .NET 10 SDK.

```bash
cd backend
dotnet run --launch-profile http
```

Backend API:

```text
http://localhost:5000
```

Scalar API documentation:

```text
http://localhost:5000/scalar
```

SQLite database:

```text
backend/fitquest.db
```

The local database file is ignored by Git.

### Frontend

Requires Node.js 20 or higher.

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

The frontend currently expects the backend API to run on:

```text
http://localhost:5000
```

## API Summary

Current main API endpoints:

- `GET /api/achievements`
- `GET /api/workoutquests`
- `GET /api/workoutquests/{id}`
- `POST /api/workoutquests`
- `PUT /api/workoutquests/{id}`
- `DELETE /api/workoutquests/{id}`
- `POST /api/workoutquests/{id}/complete`

## Design Reference

Figma design notes are recorded in:

```text
specs/figma-design.md
```

Figma file:

```text
https://www.figma.com/design/Cvsd4C67ZUrTiRp1UL9TtH/FitQuest?node-id=0-1&p=f&t=CL25aBEkkeEQfQw3-0
```

## AI Usage and Planning Evidence

The `/specs` folder contains evidence of planning, design decisions, AI-assisted development, and development progress.

Important files:

- `specs/ai-prompts.md`
- `specs/design-decisions.md`
- `specs/development-log.md`
- `specs/project-plan.md`
- `specs/agent-instructions.md`
- `specs/figma-design.md`

## Advanced Requirements Status

The final submission must clearly list the top three implemented advanced requirements. Current status:

1. **Theme switching** - Implemented
   - Light and dark theme modes
   - Theme preference saved in local storage
   - Settings page toggle
   - Frontend unit test coverage
2. **Security measures** - Implemented
   - Backend request validation for quest creation and updates
   - Fixed-window API rate limiting
   - Configured CORS origin allowlist for local frontend origins
   - Updated SQLite native dependency to remove a known vulnerability warning
3. **State management** - Implemented
   - Zustand store for app theme state
   - Zustand store for Dashboard profile summary and recent workout logs
   - Frontend tests reset shared store state between runs

## Deployment

Deployment links will be added before final submission.

- Frontend deployment: To be added
- Backend deployment: To be added

## Testing

Backend unit tests have been added with xUnit. Frontend unit tests have been added with Vitest and React Testing Library.

Current test coverage includes:

- Backend controller tests for quest validation, quest completion, streak updates, achievement unlocks, profile summary, workout logs, and achievements.
- Frontend tests for Dashboard rendering, Settings theme switching, and Achievements badge rendering.

Run backend tests:

```bash
dotnet test FitQuest.slnx
```

Current validation commands:

```bash
cd backend
dotnet build
```

```bash
cd frontend
npm run build
```

Run frontend tests:

```bash
cd frontend
npm run test
```

## Current Development Status

FitQuest has completed the first real vertical slices:

- FitQuest data models
- Workout quest CRUD API
- Quest Board frontend
- SQLite persistence
- Figma UX direction
- Multi-page frontend shell
- Quest completion with XP and workout logs
- Dashboard and Progress pages connected to backend data
- Dashboard streak summary
- Real achievement badge collection
- Backend and frontend unit test setup
- Theme switching advanced requirement
- Security measures advanced requirement
- State management advanced requirement

Next priorities:

1. Add more backend and frontend unit tests.
2. Deploy frontend and backend.
3. Polish final README, screenshots, and demo notes.

## Reflection

If I were to repeat this project, I would replace the starter scaffold README earlier and set up testing infrastructure sooner. The project is now moving from core feature implementation into assessment hardening: tests, deployment, advanced requirements, and final documentation.
