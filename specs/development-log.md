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
