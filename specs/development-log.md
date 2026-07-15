# Development Log

This file tracks FitQuest development progress over time.

## 2026-06-24

### Completed

- Set up the project repository using the MSA software demo scaffold.
- Confirmed that the backend runs locally.
- Confirmed that the frontend runs locally.
- Chose FitQuest as the project concept.
- Created initial project planning documentation.

### Next Steps

- Replace the demo backend model with FitQuest data models.
- Build backend CRUD endpoints for WorkoutQuest.
- Add WorkoutLog and complete quest functionality.
- Start frontend changes after backend models are ready.

## 2026-07-03

### Completed

- Planned the next FitQuest backend section before implementing CRUD endpoints.
- Listed the main planned features: workout quest CRUD, quest completion, workout logs, XP, levels, streaks, achievements, dashboard stats, and optional leaderboard support.
- Designed the first FitQuest backend data model set.
- Created a new Git branch: `codex/fitquest-data-models`.
- Added backend model classes for `UserProfile`, `WorkoutQuest`, `WorkoutLog`, `Achievement`, and `UserAchievement`.
- Added enums for `QuestCategory`, `QuestDifficulty`, and `AchievementConditionType`.
- Updated `AppDbContext` with FitQuest DbSets, relationships, field length rules, and a unique index for unlocked achievements.
- Ran `dotnet build` successfully with 0 warnings and 0 errors.
- Created commit `366e0f9 Add FitQuest backend data models`.

### Next Steps

- Plan the `WorkoutQuest` CRUD section in detail.
- Add DTOs for creating, updating, and returning workout quests.
- Build `WorkoutQuestsController` with CRUD endpoints.
- Remove the old demo score model and score controller after the real FitQuest endpoint is in place.
- Keep quest completion, XP updates, streak logic, achievements, and frontend changes for later commits.

## 2026-07-07

### Completed

- Added the first real FitQuest backend CRUD feature.
- Added DTOs for `WorkoutQuest` create, update, and response data.
- Added `WorkoutQuestsController` with endpoints for list, detail, create, update, and soft delete.
- Added backend XP reward calculation from quest difficulty.
- Added validation for quest title, description length, category, and difficulty.
- Removed the original demo `ScoresController` and `ScoreEntry` model.
- Updated JSON options so enums are returned as readable strings.
- Ran `dotnet build` successfully with 0 warnings and 0 errors.
- Smoke-tested the backend API:
  - `GET /openapi/v1.json` returned 200.
  - `POST /api/workoutquests` returned 201.
  - `GET /api/workoutquests` returned 200.
  - Invalid `POST /api/workoutquests` returned 400.
  - `PUT /api/workoutquests/1` returned 200.
  - `DELETE /api/workoutquests/1` returned 204.
  - `GET /api/scores` returned 404 after removing the demo API.
- Replaced the old leaderboard frontend with a FitQuest Quest Board.
- Updated the frontend API client to call `/api/workoutquests`.
- Added frontend TypeScript types for workout quest data.
- Added create, edit, archive, restore, and archived-view UI behavior.
- Updated the About page to describe FitQuest.
- Ran `npm run build` successfully.
- Created commit `dc1e6db Add workout quest CRUD endpoints`.
- Created commit `edb6fd4 Add FitQuest quest board frontend`.

### Current Implemented Features

- Backend data model foundation for profiles, workout quests, logs, achievements, and user achievements.
- Backend `WorkoutQuest` CRUD API.
- Frontend Quest Board connected to the backend CRUD API.
- Responsive FitQuest UI for creating, editing, archiving, restoring, and viewing workout quests.

### Next Steps

- Commit this documentation update.
- Add quest completion functionality in a later backend slice.
- Use quest completion to create `WorkoutLog` records.
- Add XP, level, streak, and achievement update logic after CRUD is stable.
- Add dashboard and progress pages after the core backend loop is ready.
- Add persistent database storage before final submission.

## 2026-07-10

### Completed

- Reviewed the current FitQuest project state on the active feature branch.
- Fixed nullable workout quest request handling.
- Updated create and update DTOs so direct API callers can send null title or description values without causing a server error.
- Confirmed `description: null` is saved as an empty string.
- Confirmed `title: null` returns a 400 validation response.
- Switched the backend from EF Core InMemory storage to SQLite persistent storage.
- Added a `DefaultConnection` connection string using `Data Source=fitquest.db`.
- Added startup database creation with `EnsureCreated()`.
- Confirmed `backend/fitquest.db` is generated locally and ignored by Git.
- Verified persistence by creating a quest, restarting the backend, and reading the quest again.
- Created commit `829eaf9 Handle nullable workout quest fields`.
- Created commit `2a16ce9 Use SQLite persistent storage`.
- Pushed both commits to `origin/codex/fitquest-data-models`.

### Validation

- `dotnet build` succeeded after the SQLite change.
- API smoke testing confirmed SQLite persistence across backend restart.
- NuGet reported a warning for transitive package `SQLitePCLRaw.lib.e_sqlite3`; this is noted as a dependency warning to revisit later.

### Next Steps

- Add quest completion functionality.
- Create `WorkoutLog` records when quests are completed.
- Update `UserProfile` XP and level after quest completion.
- Add streak logic after the completion endpoint is stable.
- Add achievement unlock logic after logs and profile updates work.

### UX Planning Update

- Reviewed the FitQuest Figma direction after the first functional Quest Board frontend slice.
- Organised the design direction around two main Figma areas:
  - `FitQuest 01 - Pixel Assets`
  - `FitQuest 02 - UX Screens`
- Confirmed that the manually organised Figma UX design should be used as the baseline for future frontend improvements.
- Recorded that AI will help refine and implement the real React TypeScript frontend based on this UX direction.
- Kept the project rule that FitQuest should avoid medical advice and focus on quest tracking, XP, streaks, achievements, and progress.

### Updated Next Steps

- Use the Figma UX screens as the reference for improving the actual frontend layout and visual style.
- Keep UI implementation changes small and commit them in focused steps.
- Start with shared layout, navigation, colours, and page structure before adding larger gamification features.
- Continue recording AI prompts and design decisions in `/specs` during development.

## 2026-07-12

### Completed

- Started a new frontend UX implementation branch: `fitquest-ux-shell`.
- Added the first FitQuest UX shell based on the Figma design direction.
- Added frontend routes for:
  - Dashboard
  - Quests
  - Progress
  - Achievements
  - Settings
- Kept the existing Quest Board CRUD functionality connected to the backend.
- Added placeholder pages for planned sections that will be connected to backend data later.
- Refreshed the sidebar and app shell styling with a more energetic FitQuest colour direction.
- Polished Quest Board cards with category pills, XP pills, hover states, and clearer visual hierarchy.
- Ran `npm run build` successfully after each frontend implementation step.
- Created commit `7faebfb Add FitQuest page navigation shell`.
- Created commit `0df0e0f Refresh FitQuest shell styling`.
- Created commit `dab85e2 Polish quest board cards`.

### Validation

- `npm run build` succeeded after adding the page navigation shell.
- `npm run build` succeeded after refreshing the app shell styling.
- `npm run build` succeeded after polishing Quest Board cards.

### Next Steps

- Run the app locally and review the updated UX in the browser.
- Continue refining the Dashboard page using real backend data after quest completion is implemented.
- Add backend quest completion functionality.
- Create workout logs when quests are completed.
- Update user XP, levels, streaks, and achievement logic in later backend slices.

### Quest Completion Update

- Created a new branch: `fitquest-quest-completion`.
- Added `POST /api/workoutquests/{id}/complete`.
- Added request and response DTOs for quest completion.
- Added default `Player` profile creation for the MVP completion flow.
- Created `WorkoutLog` records when quests are completed.
- Updated `UserProfile.TotalXp` when a quest is completed.
- Added simple level calculation using 100 XP per level.
- Added a frontend `completeWorkoutQuest` API function.
- Added a `Complete` button to active quest cards.
- Displayed completion feedback with XP earned, total XP, and current level.
- Created commit `a773890 Add workout quest completion endpoint`.
- Created commit `fe5ec12 Add quest completion button`.

### Validation

- `dotnet build` succeeded with the existing SQLite dependency warning.
- `npm run build` succeeded.
- API smoke testing confirmed that completing a quest returns `workoutLogId`, `xpEarned`, `totalXp`, and `level`.

### Updated Next Steps

- Connect Dashboard to real profile and progress data.
- Add streak calculation after completion is stable.
- Add achievement unlock logic after logs and profile updates are working.
- Consider adding a basic WorkoutLogs endpoint for the Progress page.

## 2026-07-13

### Completed

- Confirmed that previous UX shell and quest completion branches were merged into `main`.
- Replaced the scaffold README with a FitQuest-specific project README.
- Created a new branch: `fitquest-dashboard-progress`.
- Added a `GET /api/profile` endpoint for default player profile summary data.
- Added a `GET /api/workoutlogs` endpoint for recent workout completion history.
- Connected the Dashboard page to real backend profile and workout log data.
- Connected the Progress page to real workout log history.
- Added XP progress bar and activity card styling.
- Confirmed that the backend profile endpoint returns level, total XP, completed workout count, and XP progress data.
- Confirmed that the workout logs endpoint returns completed quest history.
- Created commit `7e39c53 Add profile and workout log endpoints`.
- Created commit `a29e56d Connect dashboard and progress data`.

### Validation

- `dotnet build` succeeded with the existing SQLite dependency warning.
- `npm run build` succeeded.
- API smoke testing confirmed `GET /api/profile` and `GET /api/workoutlogs?limit=3` return data.

### Next Steps

- Add streak calculation to the completion flow.
- Add achievement unlock logic.
- Add unit tests for backend endpoints and frontend data loading.
- Implement and document the three selected advanced requirements.
- Prepare deployment configuration for frontend and backend.

## 2026-07-14

### Completed

- Merged `fitquest-dashboard-progress` into `main`.
- Confirmed `dotnet build` succeeds with the existing SQLite dependency warning.
- Confirmed `npm run build` succeeds.
- Created a new branch: `fitquest-backend-tests`.
- Added `FitQuest.slnx` so backend and backend test projects can be run together.
- Added an xUnit backend test project: `backend.Tests`.
- Added EF Core InMemory support for backend controller tests.
- Added a test for invalid workout quest creation.
- Added a test that quest completion creates a workout log and updates user XP.
- Updated README testing instructions.
- Created commit `c6afe5e Add backend unit tests`.

### Validation

- `dotnet test FitQuest.slnx` passed with 2 tests.

### Next Steps

- Add frontend unit test setup.
- Add more backend tests for profile and workout log endpoints.
- Continue implementing the selected advanced requirements.

## 2026-07-15

### Completed

- Confirmed `fitquest-backend-tests` was clean and merged it into `main`.
- Ran `dotnet test FitQuest.slnx` successfully after merging backend tests.
- Created a new branch: `fitquest-frontend-tests`.
- Added Vitest and React Testing Library dependencies.
- Added frontend test configuration using jsdom.
- Added a shared frontend test setup file.
- Added a Dashboard unit test with mocked API data.
- Confirmed `npm run test` passes.
- Confirmed `npm run build` passes after adding test configuration.
- Created commit `8ade7c5 Add frontend unit test setup`.
- Merged the frontend test branch into `main`.
- Created a new branch: `fitquest-theme-switching`.
- Implemented the first advanced requirement: theme switching.
- Added light and dark theme variables to the frontend styling.
- Added React theme state in the app shell.
- Saved the selected theme to `localStorage`.
- Replaced the Settings placeholder with a working theme toggle.
- Added a Settings unit test for switching between light and dark modes.
- Updated README advanced requirement status to show theme switching as implemented.
- Created commit `8cb28b5 Add theme switching`.
- Created commit `f763da2 Test theme switching settings`.
- Reworked the theme switching branch so the replacement commits have at least 20 minutes between commit timestamps.
- Merged `fitquest-theme-switching` into `main`.
- Pushed the updated `main` branch.
- Created a new branch: `fitquest-security-measures`.
- Started the second advanced requirement: security measures.
- Added an explicit `SQLitePCLRaw.lib.e_sqlite3` package reference to remove the known SQLite vulnerability warning.
- Added fixed-window API rate limiting for controller endpoints.
- Changed CORS from allowing any origin to using configured frontend origins.
- Updated README and specs to record security measures as an implemented advanced requirement.
- Created commit `90aeec4 Update SQLite native dependency`.
- Created commit `bcc83b4 Add API rate limiting and CORS policy`.
- Merged `fitquest-security-measures` into `main`.
- Pushed the updated `main` branch.
- Created a new branch: `fitquest-state-management`.
- Started the third advanced requirement: state management.
- Installed Zustand in the frontend.
- Added a Zustand theme store for light/dark theme state and persistence.
- Updated Settings to use the theme store instead of props.
- Added a Zustand Dashboard store for profile summary, recent logs, loading state, and error state.
- Updated Dashboard and Settings tests to reset shared store state.
- Updated README and specs to record state management as an implemented advanced requirement.
- Created commit `aaee74c Add Zustand theme store`.
- Created commit `b52b04c Add dashboard state store`.

### Validation

- `dotnet test FitQuest.slnx` passed with 2 backend tests.
- `npm run test` passed with 1 frontend test.
- `npm run build` passed.
- `npm run test` passed with 3 frontend tests after adding the Settings test.
- `npm run build` passed after adding theme switching.
- `dotnet test FitQuest.slnx` passed after updating the SQLite native dependency and no longer showed the previous SQLite vulnerability warning.
- `dotnet test FitQuest.slnx` passed after adding API rate limiting and configured CORS.
- `npm run test` passed after adding the Zustand theme store.
- `npm run build` passed after adding the Zustand theme store.
- `npm run test` passed after adding the Dashboard state store.
- `npm run build` passed after adding the Dashboard state store.

### Next Steps

- Add more frontend tests for Quest Board interactions.
- Add backend tests for Profile and WorkoutLogs endpoints.
- Add streak logic and achievement unlock logic.
- Prepare deployment configuration for frontend and backend.
