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
