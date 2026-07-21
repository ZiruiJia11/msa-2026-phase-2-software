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

## 2026-07-17

### Completed

- Reviewed the current `main` branch and confirmed the three selected advanced requirements are implemented.
- Created a new branch: `fitquest-streak-logic`.
- Added workout streak calculation to quest completion.
- Updated completion responses to include current and longest streak values.
- Added backend test coverage for first completion streak creation.
- Added backend test coverage for continuing a streak when the previous completion was yesterday.
- Updated frontend completion feedback to show the current streak.
- Updated the Dashboard to show current streak, best streak, and last completed date.
- Updated Dashboard unit test coverage for the streak summary.
- Created commit `dc65a36 Add workout streak tracking`.
- Created commit `e797d3d Show streak summary on dashboard`.

### Validation

- `dotnet test FitQuest.slnx` passed with 3 backend tests after adding streak logic.
- `npm run test` passed after updating frontend streak types and Dashboard UI.
- `npm run build` passed after updating frontend streak types and Dashboard UI.

### Next Steps

- Add achievement unlock logic.
- Add more backend tests for Profile and WorkoutLogs endpoints.
- Prepare deployment configuration for frontend and backend.

## 2026-07-20

### Completed

- Reviewed the current `main` branch and confirmed achievements were the biggest remaining gamification gap.
- Created a new branch: `fitquest-achievement-unlocks`.
- Added achievement DTOs and an achievements API endpoint.
- Added default seeded achievements:
  - First Quest
  - 3-Day Streak
  - Quest Regular
  - XP Climber
- Updated quest completion to unlock eligible achievements.
- Added achievement XP bonuses to the user's total XP.
- Updated completion responses to include newly unlocked achievements.
- Added backend test coverage for unlocking the First Quest achievement.
- Connected the frontend Achievements page to real backend achievement data.
- Updated quest completion feedback to show newly unlocked achievements.
- Added frontend test coverage for locked and unlocked achievement badges.
- Created commit `8d5aa89 Add achievement unlock backend`.
- Created commit `5175bf8 Connect achievement badges frontend`.
- Merged `fitquest-achievement-unlocks` into `main`.
- Pushed the updated `main` branch.
- Created a new branch: `fitquest-backend-coverage`.
- Added `ProfileController` tests for default profile creation and existing profile summary values.
- Added `WorkoutLogsController` tests for newest-first ordering and safe limit clamping.
- Added `AchievementsController` tests for locked and unlocked achievement states.
- Created commit `ca3498b Add profile and workout log tests`.
- Created commit `38daa93 Add achievement controller tests`.
- Merged `fitquest-backend-coverage` into `main`.
- Pushed the updated `main` branch.
- Created a new branch: `fitquest-questboard-tests`.
- Added Quest Board tests for loading active quests and summary metrics.
- Added Quest Board tests for completing a quest and showing XP, streak, and unlocked achievement feedback.
- Added Quest Board tests for creating a quest from the form.
- Added Quest Board tests for archiving and restoring a quest.
- Created commit `55510bb Add quest board completion tests`.
- Created commit `cbad9f7 Add quest board form tests`.

### Validation

- `dotnet test FitQuest.slnx` passed with 4 backend tests after adding achievement unlock logic.
- `npm run test` passed with 4 frontend tests after connecting the Achievements page.
- `npm run build` passed after adding achievement frontend types and UI.
- `dotnet test FitQuest.slnx` passed with 8 backend tests after adding profile and workout log tests.
- `dotnet test FitQuest.slnx` passed with 10 backend tests after adding achievement controller tests.
- `npm run test` passed with 6 frontend tests after adding Quest Board completion tests.
- `npm run test` passed with 8 frontend tests after adding Quest Board form, archive, and restore tests.
- `npm run build` passed after adding Quest Board interaction tests.

### Next Steps

- Prepare deployment configuration for frontend and backend.
- Polish final README, screenshots, and demo notes.

## 2026-07-21

### Completed

- Reviewed the project after the Quest Board frontend test branch was merged into `main`.
- Ran a full local smoke test:
  - backend unit tests
  - frontend unit tests
  - frontend production build
  - backend API endpoint checks
  - browser screenshot checks for desktop and mobile UI
- Found that the frontend worked from `localhost:5173` but showed `Failed to fetch` from `127.0.0.1:5173`.
- Added `127.0.0.1:5173` and `127.0.0.1:5174` to the backend CORS allowlist.
- Improved the mobile layout:
  - compact top FitQuest brand area
  - fixed bottom navigation bar
  - shortened mobile labels: Home, Quests, Logs, Badges, Set
  - desktop sidebar kept unchanged
- Created branch `fitquest-local-cors-smoke-test`.
- Created commit `e57db54 Allow local frontend loopback origins`.
- Created commit `4f6cd2c Improve mobile navigation layout`.
- Merged `fitquest-local-cors-smoke-test` into `main`.
- Pushed the updated `main` branch.
- Created branch `fitquest-final-readme`.
- Refined the root README for submission readiness.
- Added clearer README sections for:
  - project overview
  - key features
  - three advanced features
  - tech stack
  - project structure
  - data models
  - API summary
  - local running instructions
  - testing instructions
  - design and AI documentation links
  - deployment placeholders
  - current submission status
- Created commit `04de898 Refine README for submission readiness`.

### Validation

- `dotnet test FitQuest.slnx` passed with 10 backend tests during the smoke test.
- `npm run test` passed with 8 frontend tests during the smoke test.
- `npm run build` passed during the smoke test.
- Browser screenshots confirmed Dashboard, Quests, Progress, Achievements, desktop layout, and mobile layout rendered correctly.
- After restarting the backend, the `127.0.0.1:5173` frontend path loaded real dashboard data instead of showing `Failed to fetch`.
- `npm run test` passed after the mobile navigation update.
- `npm run build` passed after the mobile navigation update.
- `dotnet test FitQuest.slnx` passed after merging into `main`.
- `npm run build` passed after the README-only update.

### Next Steps

- Push the README/specs branch.
- Deploy the backend and frontend.
- Add final deployment links to README.
- Add final screenshots or demo notes.
- Perform final assessment checklist review.

## 2026-07-21 Continued

### Completed

- Deployed the backend to Render:
  - https://msa-2026-phase-2-software.onrender.com/
- Deployed the frontend to Vercel:
  - https://msa-2026-phase-2-software.vercel.app/
- Fixed the Render SQLite path issue by using the persistent disk path.
- Confirmed the frontend Vercel deployment can connect to the Render backend after environment/CORS setup.
- Added the Figma-designed pixel avatar asset to the frontend.
- Removed the exported avatar image backgrounds so only the character pixels show.
- Added level-based avatar evolution:
  - Rookie Challenger
  - Wild Power Champion
  - Iron Will Ascendant
- Moved the desktop sidebar avatar into the central sidebar space.
- Added Quest Board monster battle feedback:
  - monster shown on each quest card
  - player and monster approach each other
  - contact point before attack
  - pixel hit effect
  - monster knock-away animation
  - XP burst feedback
- Added stable quest monster variants:
  - Brute
  - Wraith
  - Crawler
  - Golem
  - Sprite
- Synced the Quest Board battle avatar with the current player level after quest completion.
- Updated the README with deployment links, gameplay UI notes, demo notes, and current submission status.

### Validation

- `npm run test` passed with 8 frontend tests after the final gameplay UI updates.
- `npm run build` passed after the final gameplay UI updates.
- `dotnet test FitQuest.slnx` initially failed because a local backend process was still running and locking `backend.exe`.
- Stopped the local backend process and reran `dotnet test FitQuest.slnx`.
- `dotnet test FitQuest.slnx` passed with 10 backend tests after the process lock was cleared.

### User Design Direction

- The user chose the FitQuest concept and asked for a more game-like UX.
- The user manually refined the Figma file and directed the implementation to follow that design direction.
- The user requested the sidebar avatar placement, level-based avatar changes, quest boss battles, monster variety, and repeated animation timing adjustments.
- AI assisted with implementation, testing, and documentation, while the visual direction and acceptance decisions came from the user.

### Next Steps

- Perform one final assessment checklist review against the PDF.
- Capture final screenshots or demo notes if needed for the submission package.
