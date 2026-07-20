# FitQuest

FitQuest is a gamified fitness quest tracker built for the Microsoft Student Accelerator 2026 Phase 2 Software Stream.

The app turns personal workout tasks into quests. Users can create workout quests, complete them, earn XP, level up, build streaks, and review progress over time. FitQuest focuses on motivation, habit consistency, and progress tracking.

FitQuest does not provide medical advice, personalised training plans, calorie recommendations, injury advice, or healthcare guidance.

## Assessment Theme

The 2026 software stream theme is **Gamification**.

FitQuest addresses this theme through:

- Workout quests
- XP rewards
- Level progression
- Streak tracking
- Achievement badges
- Progress dashboards
- Pixel-inspired game UI direction

## Key Features

- Create, edit, archive, restore, and complete workout quests
- Award XP when quests are completed
- Calculate player level from total XP
- Track current and longest workout streaks
- Create workout log records from quest completions
- Unlock achievements from milestone conditions
- Award achievement XP bonuses once per achievement
- View a dashboard summary with XP, level, streaks, and recent activity
- View a progress history page with completed quests
- View an achievement badge collection
- Switch between light and dark themes
- Use responsive navigation on desktop and mobile

## Advanced Features

The three implemented advanced features selected for the final submission are:

1. **Theme switching**
   - Light and dark mode support
   - Theme preference stored in local storage
   - Settings page toggle
   - Frontend test coverage

2. **Security measures**
   - Request validation for quest creation and updates
   - Fixed-window API rate limiting
   - Configured CORS origin allowlist
   - Updated SQLite native dependency to remove a known vulnerability warning

3. **State management**
   - Zustand store for theme state
   - Zustand store for dashboard profile summary and recent workout logs
   - Shared store state reset during frontend tests

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Zustand
- Vitest
- React Testing Library
- Custom CSS

### Backend

- C#
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- xUnit
- Scalar API documentation

## Project Structure

```text
backend/
  Controllers/
  Data/
  Dtos/
  Models/
  Program.cs

backend.Tests/
  AchievementsControllerTests.cs
  ProfileControllerTests.cs
  WorkoutLogsControllerTests.cs
  WorkoutQuestsControllerTests.cs

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

## Data Models

FitQuest currently uses these core backend entities:

- `UserProfile`
  - Stores username, total XP, level, current streak, longest streak, and last completed date.
- `WorkoutQuest`
  - Stores quest title, description, category, difficulty, XP reward, due date, active/archive state, and timestamps.
- `WorkoutLog`
  - Stores completed quest history, earned XP, completion notes, difficulty, category, and completion time.
- `Achievement`
  - Stores badge name, description, icon, unlock condition, threshold, XP bonus, and enabled state.
- `UserAchievement`
  - Links unlocked achievements to the user profile and records unlock time.

## API Summary

Main API endpoints:

- `GET /api/profile`
- `GET /api/workoutlogs`
- `GET /api/achievements`
- `GET /api/workoutquests`
- `GET /api/workoutquests/{id}`
- `POST /api/workoutquests`
- `PUT /api/workoutquests/{id}`
- `DELETE /api/workoutquests/{id}`
- `POST /api/workoutquests/{id}/complete`

Scalar API documentation is available locally after starting the backend:

```text
http://localhost:5000/scalar
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

The frontend expects the backend API to run on:

```text
http://localhost:5000
```

## Testing

Run backend tests:

```bash
dotnet test FitQuest.slnx
```

Run frontend tests:

```bash
cd frontend
npm run test
```

Run frontend production build:

```bash
cd frontend
npm run build
```

Current test coverage includes:

- Backend controller tests for quest validation, quest completion, streak updates, achievement unlocks, profile summary, workout logs, and achievements.
- Frontend tests for Dashboard rendering, Settings theme switching, Achievements badge rendering, and Quest Board interactions.

## Design Reference

UX planning and Figma notes are recorded in:

```text
specs/figma-design.md
```

Figma file:

```text
https://www.figma.com/design/Cvsd4C67ZUrTiRp1UL9TtH/FitQuest?node-id=0-1&p=f&t=CL25aBEkkeEQfQw3-0
```

## AI Usage and Planning Evidence

The `/specs` folder records planning, design decisions, AI-assisted development prompts, and progress updates.

Important files:

- `specs/ai-prompts.md`
- `specs/design-decisions.md`
- `specs/development-log.md`
- `specs/project-plan.md`
- `specs/agent-instructions.md`
- `specs/figma-design.md`

These documents describe the project concept, student design decisions, prompt usage, implementation decisions, and development progress.

## Deployment

Deployment links will be added before final submission.

- Frontend deployment: https://msa-2026-phase-2-software.vercel.app/
- Backend deployment: https://msa-2026-phase-2-software.onrender.com/

### Backend Render Setup

The backend is prepared for Render using `backend/Dockerfile`.

Recommended Render settings:

- Service type: Web Service
- Runtime: Docker
- Root directory: `backend`
- Dockerfile path: `Dockerfile`
- Persistent disk mount path: `/var/data`
- SQLite connection string: `Data Source=/var/data/fitquest.db`

The Dockerfile starts the API with Render's `PORT` environment variable:

```text
dotnet backend.dll --urls http://0.0.0.0:${PORT:-8080}
```

Production CORS must be updated after the frontend deployment URL is available.

### Frontend Vercel Setup

The frontend is prepared for Vercel using the existing Vite build.

Recommended Vercel settings:

- Framework preset: Vite
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:

```text
VITE_API_BASE_URL=https://msa-2026-phase-2-software.onrender.com/api
```

The frontend falls back to `http://localhost:5000/api` during local development when `VITE_API_BASE_URL` is not set.

## Current Submission Status

Implemented:

- FitQuest concept and gamification scope
- React TypeScript frontend
- C# .NET backend
- SQLite persistence
- Core data models
- CRUD endpoints
- Quest completion flow
- XP, level, streak, and achievement systems
- Multi-page responsive UI
- Frontend and backend tests
- Three advanced features
- Planning and AI usage documentation in `/specs`

Remaining before final submission:

- Deploy frontend and backend
- Add final deployment links
- Add final screenshots or demo notes
- Complete final `/specs` progress update
- Perform final assessment checklist review
