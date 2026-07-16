# AI Prompts Log

This file records meaningful AI prompts used during planning and development of FitQuest. It is intended as evidence of AI-assisted development, so it focuses on important prompts, summaries, decisions, and reflections rather than every small conversation.

## Authorship Note

- I used AI as a planning, coding support, documentation, and review assistant.
- I made the project decisions, chose the FitQuest concept, confirmed the feature scope, reviewed the output, tested the app locally, managed the Git workflow, and decided when work was ready to commit.
- AI suggestions were treated as drafts or implementation support, not as automatic final decisions.
- I kept the project direction aligned with the MSA assessment requirements, my own Figma UX direction, and the rule that FitQuest should avoid medical or personalised fitness advice.

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

### My Contribution

- I chose the final project concept after comparing the options.
- I judged which idea would be realistic for the MSA timeframe and suitable for a live demo.
- I set the project boundary that FitQuest should focus on gamified tracking rather than medical or personalised fitness advice.

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

### My Contribution

- I decided what planning sections were needed for the assessment evidence.
- I reviewed and adapted the suggested structure so it matched FitQuest rather than a generic project.
- I used the plan to guide later implementation order and feature scope.

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

### My Contribution

- I chose which FitQuest entities were necessary for the MVP.
- I decided to start with backend models before adding controllers or UI changes.
- I reviewed the model boundaries so quests, logs, users, and achievements could support later gamification work.

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

### My Contribution

- I chose CRUD as the first real backend feature after the data model foundation.
- I controlled the scope by delaying XP, streaks, achievements, and frontend work.
- I reviewed the API behaviour and kept this as a focused checkpoint in the Git history.

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

### My Contribution

- I decided that the old demo leaderboard should be replaced with a real FitQuest Quest Board.
- I reviewed the UI behaviour for creating, editing, archiving, and restoring quests.
- I kept the first frontend slice focused on quest management instead of mixing in later dashboard or achievement features.

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

### My Contribution

- I identified nullable request handling and persistent storage as quality issues to fix before larger features.
- I chose SQLite because it satisfies persistence requirements while staying simple for local development.
- I verified that generated database files should remain out of Git.
- I treated the remaining dependency warning as follow-up work instead of ignoring it.

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

### My Contribution

- I manually organised and renamed the Figma design direction before asking AI to record it.
- I decided which visual direction should become the baseline for the React implementation.
- I reviewed the documentation to make sure it represented my UX work rather than treating the Figma direction as AI-generated.

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

### My Contribution

- I chose to improve UX before adding more backend complexity.
- I provided the Figma direction and confirmed that the real frontend should follow it.
- I reviewed the implemented layout, navigation, and styling and decided it was suitable to keep.
- I requested small commits and controlled the branch naming convention for the project history.

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

### My Contribution

- I chose quest completion as the next priority because it makes the app meaningfully gamified.
- I confirmed that the first loop should include XP and workout logs, but not streaks or achievements yet.
- I reviewed the behaviour after implementation and kept the feature focused so later work could build on it.

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

### My Contribution

- I decided that Dashboard and Progress should show real backend data before adding more placeholder pages.
- I checked that the work supported the user-visible gamification loop: complete a quest, earn XP, and then see progress.
- I kept this feature limited to profile and log display so it would remain reviewable.

### Reflection

- This made the gamification loop more complete: create quest, complete quest, earn XP, and see progress.
- The Dashboard and Progress pages are now useful screens instead of placeholders.

## Prompt 011: Backend unit test setup

### Date

2026-07-14

### Context

- The assessment requires unit tests covering key backend and frontend functionality.
- FitQuest already had quest CRUD, quest completion, profile summary, and progress history features.
- The next hardening step was to add backend tests for important behaviour.

### Prompt Summary

- I asked AI to start the next assessment hardening task after merging the Dashboard and Progress work.
- The requested scope was to add a backend test project and cover key backend behaviour.

### AI Output Summary

- AI created a solution file for the backend and test project.
- AI added an xUnit backend test project.
- AI added EF Core InMemory for controller-level tests.
- AI added tests for invalid quest creation and quest completion.
- AI confirmed that `dotnet test FitQuest.slnx` passes.

### My Decision

- I accepted this as the first testing slice.
- I kept the test scope small first so the project gains test infrastructure before adding broader coverage.

### My Contribution

- I prioritised adding backend tests because the assessment requires test evidence.
- I chose to start with high-value backend behaviour: invalid input and quest completion.
- I reviewed the test results and used them as a checkpoint before continuing frontend work.

### Reflection

- The project now has backend test evidence for the assessment.
- More tests should be added later for profile, workout logs, and frontend rendering.

## Prompt 012: Frontend unit test setup

### Date

2026-07-15

### Context

- Backend tests had been added and merged into `main`.
- The assessment also requires frontend unit tests.
- The Dashboard page was a good first frontend test target because it displays real gamification progress data.

### Prompt Summary

- I asked AI to continue with the next assessment hardening step.
- AI recommended merging backend tests first, then adding frontend unit test setup.

### AI Output Summary

- AI merged the backend test branch into `main`.
- AI added Vitest, React Testing Library, jest-dom, user-event, and jsdom.
- AI configured the frontend test script and Vitest jsdom setup.
- AI added a Dashboard test that mocks API data and verifies profile progress and recent completion rendering.
- AI confirmed that `npm run test` and `npm run build` pass.

### My Decision

- I accepted Dashboard rendering as the first frontend unit test slice.
- I kept the first frontend test focused on user-visible progress data rather than broad UI coverage.

### My Contribution

- I decided that frontend tests should start with Dashboard because it displays real progress data.
- I verified the frontend test command and build command after the setup was added.
- I kept the first frontend test small so the test framework could be introduced safely.

### Reflection

- The project now has both backend and frontend unit test evidence.
- More frontend tests should be added for Quest Board create/complete behaviour later.

## Prompt 013: Theme switching advanced requirement

### Date

2026-07-15

### Context

- Backend and frontend unit test setup had been completed.
- The next assessment step was to begin implementing the selected advanced requirements.
- Theme switching was chosen as the first advanced requirement because it improves UX and can be clearly demonstrated in the frontend.

### Prompt Summary

- I asked AI to continue step by step and start the next planned assessment task.
- AI recommended implementing theme switching as a small, testable advanced feature before moving to larger items such as security hardening or state management.

### AI Output Summary

- AI added light and dark theme support using CSS variables.
- AI added theme state in the React app shell.
- AI saved the selected theme in `localStorage`.
- AI replaced the placeholder Settings page with a theme toggle.
- AI added a frontend unit test for the Settings theme toggle.
- AI confirmed that frontend tests and build pass.

### My Decision

- I accepted theme switching as the first implemented advanced requirement.
- I kept the feature simple and understandable instead of introducing a larger state management library at this stage.

### My Contribution

- I chose theme switching as one of the three advanced requirements during planning.
- I confirmed the feature should stay simple, visible, and testable for the assessment.
- I reviewed the Settings page behaviour and asked for commit history to be redone so the commits were spaced more realistically.
- I decided not to merge the branch until the history, tests, and documentation were ready.

### Reflection

- This creates visible progress toward the assessment's advanced feature requirement.
- The feature is small enough to test and document clearly, while still improving the FitQuest user experience.

## Prompt 014: Security measures advanced requirement

### Date

2026-07-15

### Context

- Theme switching had been implemented and merged into `main`.
- The next assessment priority was to implement another advanced requirement.
- The backend still showed a known vulnerability warning for the SQLite native dependency.
- The API also had fully open CORS during local development.

### Prompt Summary

- I asked AI to start the security measures advanced requirement.
- AI recommended handling security in small commits: first remove the SQLite dependency warning, then add runtime API protections such as rate limiting and a configured CORS allowlist.

### AI Output Summary

- AI added an explicit safe version of `SQLitePCLRaw.lib.e_sqlite3`.
- AI confirmed that the previous SQLite vulnerability warning disappeared during `dotnet test`.
- AI added fixed-window API rate limiting with HTTP 429 responses.
- AI changed CORS from allowing any origin to using configured local frontend origins.
- AI updated project documentation to show security measures as an implemented advanced requirement.

### My Decision

- I accepted these security measures because they are practical for the MVP and easy to explain in the final submission.
- I kept authentication and user accounts out of this security slice because they would increase project scope.

### My Contribution

- I approved security measures as the second advanced requirement after theme switching was merged.
- I kept the scope realistic for the MVP by focusing on dependency safety, CORS, rate limiting, and validation.
- I reviewed the validation output and confirmed that the SQLite vulnerability warning was removed.
- I decided to merge this work only after backend tests, frontend tests, and build checks passed.

### Reflection

- This security step improves the backend without making the project too complex.
- The changes also create clear assessment evidence: dependency warning removal, CORS restrictions, rate limiting, and existing request validation.

## Prompt 015: State management advanced requirement

### Date

2026-07-15

### Context

- Theme switching and security measures had been implemented and merged into `main`.
- The remaining selected advanced requirement was shared frontend state management.
- The app already had app-level theme state and Dashboard profile data that could benefit from centralised state.

### Prompt Summary

- I asked AI to implement the third advanced requirement step by step.
- AI recommended using Zustand because it had already been selected during planning and fits the app's current size.
- AI suggested starting with theme state, then moving Dashboard profile and recent activity data into a shared store.

### AI Output Summary

- AI installed Zustand in the frontend.
- AI created a theme store for light/dark mode state, local storage persistence, and applying the theme to the document.
- AI updated the Settings page to use the theme store instead of receiving props from `App`.
- AI created a Dashboard store for profile summary data, recent workout logs, loading state, and error state.
- AI updated Dashboard tests so shared store state is reset between test runs.
- AI confirmed that frontend tests and build pass.

### My Decision

- I accepted Zustand as the state management solution because it is simple, understandable, and appropriate for a React TypeScript MVP.
- I kept the scope focused on theme and Dashboard state rather than moving every page into a store at once.

### My Contribution

- I selected state management as the third advanced requirement based on the earlier project plan.
- I approved using Zustand because it fits the current app size and is easier to explain than a heavier state framework.
- I kept Quest Board form state local because it does not need to be shared globally.
- I reviewed the tests and merged the branch only after the shared store state was reset correctly between test runs.

### Reflection

- This completes the third selected advanced requirement with real app-level state rather than adding a library only for assessment evidence.
- Keeping the migration small makes the code easier to review and reduces risk before deployment.

## Prompt 016: Workout streak logic

### Date

2026-07-17

### Context

- The three selected advanced requirements had been implemented and merged into `main`.
- The next gamification improvement was streak tracking.
- `UserProfile` already had fields for `CurrentStreak`, `LongestStreak`, and `LastCompletedDate`, but quest completion was not yet calculating streaks.

### Prompt Summary

- I asked AI to start the new day's work and identify the best next feature.
- AI recommended implementing streak logic because it strongly supports the FitQuest gamification theme and connects existing profile, quest completion, and dashboard features.

### AI Output Summary

- AI added streak calculation to the quest completion endpoint.
- AI updated completion responses to include current and longest streak values.
- AI added backend tests for initial streak creation and continuing a streak from yesterday.
- AI updated frontend completion feedback to include the current streak.
- AI updated the Dashboard to show current streak, best streak, and last completed date.
- AI confirmed that backend tests, frontend tests, and frontend build pass.

### My Decision

- I accepted a simple streak rule: same-day completions do not increase the streak, consecutive-day completions increase it, and missed days reset it to 1.
- I kept streak logic separate from achievement unlocks so each gamification feature remains easy to review and test.

### My Contribution

- I started the new day's work by asking for the next practical task after the advanced requirements were completed.
- I chose streak logic because it strengthens FitQuest's habit-building and gamification purpose.
- I reviewed the proposed streak rules and accepted the simple daily consistency model.
- I asked for the next step during the work, then confirmed the documentation should be updated before merging.

### Reflection

- This makes FitQuest feel more like a habit-building gamified app.
- The Dashboard now gives clearer feedback after completing quests.
