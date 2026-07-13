# AI Prompts Log

This file records meaningful AI prompts used during planning and development of FitQuest. It is intended as evidence of AI-assisted development, so it focuses on important prompts, summaries, decisions, and reflections rather than every small conversation.

## Prompt 001: Project concept selection

### Date

2026-06-24

### Context

- I needed to choose a project idea for the MSA Phase 2 Software Stream.
- The project needed to be a full-stack web application based on the theme of gamification.

### Prompt Summary

- I asked AI to compare possible gamified project ideas, including SkillQuest, CareerQuest, and FitQuest.

### AI Output Summary

- AI suggested that FitQuest was a strong option because fitness tracking naturally supports quests, XP, streaks, levels, achievements, and progress tracking.

### My Decision

- I chose FitQuest because it is practical, easy to demonstrate, visually clear, and strongly connected to the gamification theme.

### Reflection

- AI helped compare scope and risks, but I made the final decision based on assessment suitability and project feasibility.

## Prompt 002: Project planning documentation

### Date

2026-06-24

### Context

- After choosing FitQuest, I needed to create planning documentation for the `/specs` folder.

### Prompt Summary

- I asked AI to help structure a project plan with bullet points, including project overview, main pages, data models, MVP features, advanced features, and development order.

### AI Output Summary

- AI suggested a structured planning document covering the FitQuest concept, gamification loop, main pages, data models, MVP scope, advanced features, and success criteria.

### My Decision

- I used this to create `/specs/project-plan.md`.

### Reflection

- This helped me define the project scope before changing any code.

## Prompt 003: Feature list and data model planning

### Date

2026-07-03

### Context

- After choosing FitQuest, I needed to clarify the planned features before adding more backend code.
- The next technical step was to design the data models that would support quests, XP, streaks, achievements, and progress tracking.

### Prompt Summary

- I asked AI to list the FitQuest features and help design the data models clearly before implementation.
- I also asked what data should be included for the first backend model slice.

### AI Output Summary

- AI suggested focusing the MVP on workout quest CRUD, workout logs, XP, levels, streaks, achievements, dashboard stats, persistent storage, and Scalar documentation.
- AI recommended these main models: `UserProfile`, `WorkoutQuest`, `WorkoutLog`, `Achievement`, and `UserAchievement`.
- AI recommended supporting enums for quest category, quest difficulty, and achievement condition type.

### My Decision

- I decided to implement the data model foundation first before building CRUD endpoints.
- I kept the old demo score API temporarily so the backend could continue compiling while FitQuest backend features are introduced step by step.

### Reflection

- This planning step helped keep the backend changes small and understandable.
- Creating the models as a separate commit makes the Git history clearer for assessment review.

## Prompt 004: WorkoutQuest CRUD backend implementation

### Date

2026-07-07

### Context

- The FitQuest backend already had the first data model slice committed.
- The next step was to add the first real FitQuest API feature and remove the original demo leaderboard API.

### Prompt Summary

- I asked AI what the next implementation step should be after creating the FitQuest data models.
- AI recommended building `WorkoutQuest` CRUD endpoints before adding quest completion, XP updates, streaks, achievements, or frontend changes.
- I asked AI to proceed with that backend section and keep documentation updates for after the implementation checkpoint.

### AI Output Summary

- AI created DTOs for creating, updating, and returning workout quests.
- AI added `WorkoutQuestsController` with endpoints for listing, reading, creating, updating, and soft deleting quests.
- AI removed the old demo score model and score controller.
- AI added string enum JSON handling so API requests and responses can use readable values such as `Cardio` and `Easy`.

### My Decision

- I accepted the recommendation to keep this section focused on CRUD only.
- I decided to leave quest completion, workout logs, XP profile updates, streak logic, achievements, and frontend integration for later commits.

### Reflection

- Splitting CRUD from completion logic kept the backend easier to test and understand.
- This also created a clear Git checkpoint for the first real FitQuest API feature.

## Prompt 005: FitQuest Quest Board frontend

### Date

2026-07-07

### Context

- After the demo score API was removed, the old leaderboard frontend showed a backend error because it still called `/api/scores`.
- I needed the frontend to connect to the new FitQuest `WorkoutQuest` CRUD API.

### Prompt Summary

- I asked AI to replace the old demo leaderboard UI with a FitQuest Quest Board that uses `/api/workoutquests`.

### AI Output Summary

- AI updated the frontend API client and TypeScript types for workout quests.
- AI replaced the old leaderboard route with a `Quests` page.
- AI added a form for creating and editing quests.
- AI added quest cards, summary stats, archive/restore actions, and responsive styling.
- AI updated the About page to describe FitQuest instead of the demo app.

### My Decision

- I accepted this as the first real FitQuest frontend slice.
- I kept the frontend focused on quest management only, leaving dashboard, progress, achievements, theme switching, and Zustand for later work.

### Reflection

- This made the app visible as FitQuest for the first time while keeping the scope small.
- The frontend now matches the backend CRUD feature instead of relying on the removed demo score API.

## Prompt 006: Backend validation and persistent storage

### Date

2026-07-10

### Context

- After reviewing the current FitQuest progress, I wanted to fix small backend quality issues before adding larger gamification features.
- The backend still needed safer request handling and persistent database storage for the assessment requirements.

### Prompt Summary

- I asked AI to continue with small commits.
- The first task was to handle nullable `WorkoutQuest` request fields safely.
- The second task was to replace EF Core InMemory storage with SQLite persistent storage.

### AI Output Summary

- AI updated workout quest request DTOs so `Title` and `Description` can safely receive null input from direct API callers.
- AI updated the controller to convert null title and description values to empty strings before validation and trimming.
- AI switched the backend from `UseInMemoryDatabase` to `UseSqlite`.
- AI added a `DefaultConnection` connection string and startup database creation using `EnsureCreated()`.

### My Decision

- I accepted these as two separate small commits to keep the Git history clear.
- I kept the generated local SQLite database file out of Git because it is already ignored by `.gitignore`.

### Reflection

- This step improved backend reliability and moved the project closer to the assessment requirement for persistent storage.
- A NuGet warning remains for a transitive SQLite dependency, but the backend builds and SQLite persistence works locally.

## Prompt 007: UX direction and Figma design handoff

### Date

2026-07-10

### Context

- After implementing the first FitQuest Quest Board frontend slice, I wanted to improve the user experience before adding more features.
- I manually organised the Figma file into a clearer UX design direction, including FitQuest screen designs and pixel-style asset ideas.
- The goal was to use my own Figma UX direction as the design baseline, then ask AI to help refine and implement it in the actual React frontend.

### Prompt Summary

- I asked AI to help organise the Figma design and prepare the project record.
- I clarified that the UX direction should be based on my manually designed Figma file.
- I asked AI to record that the next implementation work should use this UX design as the reference for improving the real frontend.

### AI Output Summary

- AI recommended treating the Figma file as two main design areas: pixel assets and UX screens.
- AI suggested documenting the design handoff before changing frontend code.
- AI planned to use the Figma UX direction as the reference when refining the React implementation.

### My Decision

- I decided that the manually organised Figma UX design should become the visual baseline for the next frontend work.
- I will let AI assist with turning the Figma direction into a more polished and consistent React TypeScript UI.

### Reflection

- This step separates design thinking from implementation.
- Recording the handoff makes it clear that the frontend design is based on my own UX direction, with AI used to support refinement and implementation.

## Prompt 008: Frontend UX shell implementation

### Date

2026-07-12

### Context

- The Figma UX design had been organised and recorded as the visual baseline for FitQuest.
- The current React frontend only had the working Quest Board and About page.
- I wanted to begin translating the Figma direction into the real frontend.

### Prompt Summary

- I asked AI to start the new day's plan and implement the first frontend UX improvements.
- I also clarified that future branches do not need to use the `codex/` prefix.
- The requested work was to create the UX shell step by step.

### AI Output Summary

- AI created a new branch called `fitquest-ux-shell`.
- AI added page routes for Dashboard, Quests, Progress, Achievements, and Settings.
- AI added placeholder pages for planned sections that are not fully implemented yet.
- AI refreshed the FitQuest shell styling with a more energetic colour direction.
- AI polished Quest Board cards with category pills, XP pills, and clearer visual hierarchy.

### My Decision

- I accepted this as the first implementation step from Figma UX planning into the actual React frontend.
- I kept the work focused on frontend structure and visual polish only.
- Backend completion, XP updates, streaks, and achievements will be implemented later.

### Reflection

- This step made the app feel more like the planned FitQuest product instead of a single CRUD page.
- Keeping the work in small commits made the Git history clearer and easier to review.

## Prompt 009: Quest completion feature

### Date

2026-07-12

### Context

- FitQuest already had workout quest CRUD and a polished frontend quest board.
- The next core gamification feature was letting users complete a quest and earn XP.
- This needed to create a workout log and update the user's progress data.

### Prompt Summary

- I asked AI to start the Quest Completion Backend Slice.
- The planned scope was to add a backend completion endpoint, create `WorkoutLog` records, update user XP and level, and then connect the frontend with a Complete button.

### AI Output Summary

- AI added `POST /api/workoutquests/{id}/complete`.
- AI added completion request and response DTOs.
- AI added a simple default user profile flow for the MVP.
- AI created a workout log when a quest is completed.
- AI updated the user's total XP and calculated level using a simple 100 XP per level rule.
- AI added a frontend API function and Complete button on active quest cards.

### My Decision

- I accepted this as the first full gamification loop after quest CRUD.
- I kept streak and achievement unlock logic out of this slice so the feature remains small and easier to test.

### Reflection

- This feature connects the app's quest system to real progress tracking.
- Completing a quest now produces backend data that can later power Dashboard, Progress, Streak, and Achievement pages.

## Prompt 010: Dashboard and Progress data slice

### Date

2026-07-13

### Context

- Quest completion had been implemented and was creating `WorkoutLog` records.
- The Dashboard and Progress pages still showed placeholder content.
- The next step was to show real gamification feedback from backend data.

### Prompt Summary

- I asked AI to implement the Dashboard and Progress real data slice.
- The requested scope was to add profile summary and workout log endpoints, then connect the frontend Dashboard and Progress pages to those endpoints.

### AI Output Summary

- AI added a profile summary endpoint for the default player profile.
- AI added a workout logs endpoint for recent completion history.
- AI connected the Dashboard to level, total XP, completed workout count, and recent completions.
- AI connected the Progress page to workout log history.
- AI added simple XP progress bar styling and activity card styling.

### My Decision

- I accepted this as the next step because it turns completed quest data into visible user progress.
- I kept streak and achievement logic out of this slice so the feature stayed focused.

### Reflection

- This made the gamification loop more complete: create quest, complete quest, earn XP, and see progress.
- The Dashboard and Progress pages are now useful screens instead of placeholders.
