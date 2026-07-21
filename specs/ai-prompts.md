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

## Prompt 017: Achievement unlock logic

### Date

2026-07-20

### Context

- Streak logic had been implemented and merged into `main`.
- The Achievements page still showed static planned badges.
- The backend already had `Achievement` and `UserAchievement` models, but they were not seeded, exposed through an API, or connected to quest completion.

### Prompt Summary

- I asked AI for the next step after reviewing completed and incomplete project features.
- AI recommended implementing achievement unlock logic because it completes the gamification loop after XP, levels, and streaks.

### AI Output Summary

- AI added backend achievement DTOs and an achievements API endpoint.
- AI added default achievement seed data for First Quest, 3-Day Streak, Quest Regular, and XP Climber.
- AI updated quest completion so eligible achievements unlock once and award XP bonuses.
- AI added backend test coverage for unlocking the First Quest achievement.
- AI connected the frontend Achievements page to real backend data.
- AI updated quest completion feedback to show newly unlocked achievements.
- AI added a frontend test for locked and unlocked achievement badge rendering.

### My Decision

- I chose achievement unlocks as the next feature because it was the biggest missing gamification piece.
- I accepted a small initial badge set instead of building a large badge catalogue immediately.
- I kept category-specific achievements out of this slice because the current achievement model does not yet store a category target.

### My Contribution

- I reviewed the self-check and agreed that achievements should be the next priority before deployment.
- I kept the work split into backend unlock logic, frontend badge display, and documentation commits.
- I confirmed the unlock rules should stay simple enough to demo and test.
- I kept the project documentation focused on my decisions and review process, with AI recorded as implementation support.

### Reflection

- Achievement unlocks make the FitQuest loop more complete: complete quests, gain XP, build streaks, and unlock badges.
- The Achievements page now shows real app state instead of placeholder content.

## Prompt 018: Backend test coverage improvement

### Date

2026-07-20

### Context

- Achievement unlock logic had been merged into `main`.
- The project had core backend features working, but test coverage was still concentrated mainly around quest creation and completion.
- Before deployment, I wanted stronger evidence that the main backend read endpoints behave correctly.

### Prompt Summary

- I asked AI for the next step after completing achievement unlocks.
- AI recommended improving backend test coverage before deployment because the app already had enough core features and needed stronger assessment evidence.

### AI Output Summary

- AI added `ProfileController` tests for default profile creation and existing profile summary values.
- AI added `WorkoutLogsController` tests for newest-first ordering and safe limit clamping.
- AI added `AchievementsController` tests for locked and unlocked achievement states.
- AI confirmed that `dotnet test FitQuest.slnx` passes with 10 backend tests.

### My Decision

- I chose backend coverage as the next task because deployment should happen after the main API behaviour is better protected by tests.
- I prioritised controller tests that cover user-visible data: profile summary, workout history, and achievement badge state.

### My Contribution

- I reviewed the self-check and agreed that tests were weaker than the implemented feature set.
- I chose to improve backend coverage before starting deployment.
- I kept the work split into focused commits: profile/workout log tests, achievement controller tests, and documentation.
- I reviewed the test results and confirmed the backend test count increased from 4 to 10.

### Reflection

- This makes the project more reliable before deployment.
- The test evidence now better matches the number of backend features implemented in FitQuest.

## Prompt 019: Quest Board frontend interaction tests

### Date

2026-07-20

### Context

- Backend test coverage had been improved and merged into `main`.
- The frontend had tests for Dashboard, Settings, and Achievements, but the Quest Board was still missing interaction coverage.
- Quest Board is the main user workflow for creating, completing, archiving, and restoring quests.

### Prompt Summary

- I asked AI to continue with the next testing task.
- AI recommended adding Quest Board interaction tests because they cover the app's main user-facing workflow before deployment.

### AI Output Summary

- AI added tests for loading active quests and rendering summary metrics.
- AI added a test for completing a quest and showing XP, streak, and unlocked achievement feedback.
- AI added tests for creating a quest from the form.
- AI added tests for archiving and restoring a quest.
- AI confirmed that frontend tests pass with 8 tests and that the frontend build passes.

### My Decision

- I chose Quest Board interaction tests because this is the most important frontend workflow in FitQuest.
- I prioritised tests that match demo actions: view quests, create a quest, complete a quest, archive, and restore.

### My Contribution

- I reviewed the current frontend test gap and agreed that Quest Board needed coverage before deployment.
- I kept the tests focused on user-visible behaviour instead of testing implementation details.
- I reviewed the test and build results and confirmed the frontend test count increased from 4 to 8.
- I kept the work split into completion tests, form/archive tests, and documentation.

### Reflection

- The frontend tests now cover the most important user workflow in the app.
- This gives stronger confidence before moving into deployment and final polish.

## Prompt 020: Local smoke testing and mobile navigation refinement

### Date

2026-07-21

### Context

- The Quest Board frontend tests had been merged into `main`.
- I wanted to test the whole app and visually check the UI before moving into final documentation and deployment.
- The app had a responsive sidebar, but the mobile layout still used a large sidebar that took up too much of the first screen.

### Prompt Summary

- I asked AI to test the overall project and UI.
- After reviewing the screenshots, I chose to improve the mobile navigation because the app should feel more usable on small screens.

### AI Output Summary

- AI ran backend tests, frontend tests, and the frontend production build.
- AI started the backend and frontend locally and checked key API endpoints.
- AI used browser screenshots to inspect Dashboard, Quests, Progress, Achievements, desktop layout, and mobile layout.
- AI found a local CORS issue when the frontend was opened from `127.0.0.1`.
- AI added `127.0.0.1:5173` and `127.0.0.1:5174` to the backend CORS allowlist.
- AI updated the mobile layout to use a compact top brand area and a fixed bottom navigation bar.
- AI shortened mobile navigation labels to avoid text overlap.

### My Decision

- I chose to test the app visually before adding final documentation because UI issues are easier to catch in the browser than from code alone.
- I accepted the CORS fix because local users may open the frontend through either `localhost` or `127.0.0.1`.
- I chose the mobile navigation improvement because it directly improves usability while keeping the desktop sidebar unchanged.

### My Contribution

- I asked for full project and UI testing rather than only relying on unit tests.
- I reviewed the UI issue and agreed that mobile navigation should be improved.
- I directed the work toward practical UX polish instead of adding new features.
- I reviewed the test results, screenshots, and final merge into `main`.

### Reflection

- This step made FitQuest feel more polished and easier to demo on mobile.
- The local smoke test also found a real environment issue that could have confused future testing.

## Prompt 021: README submission readiness

### Date

2026-07-21

### Context

- The app already had core FitQuest functionality, tests, advanced features, and `/specs` documentation.
- The README existed, but it needed to read more like a final submission overview.
- At that time, deployment links had not yet been added, so the README needed to clearly separate completed work from remaining final submission tasks.

### Prompt Summary

- I asked what the next step should be after testing and UI polish.
- AI recommended refining the README before deployment so the project is easier to assess.
- I approved this direction.

### AI Output Summary

- AI reviewed the existing README and project structure.
- AI refined the README to include a clearer project overview, key features, advanced features, tech stack, project structure, data models, API summary, local running instructions, testing instructions, design links, AI documentation links, deployment placeholders, and final submission status.
- AI kept deployment links as `To be added` because deployment had not been completed at that point. This was later updated after Render and Vercel deployment.

### My Decision

- I chose README refinement as the next task because the implementation work needs to be presented clearly for assessment.
- I wanted the README to show what has already been completed and what remains before final submission.
- I kept the README practical and evidence-focused instead of turning it into marketing copy.

### My Contribution

- I reviewed the project status and agreed that documentation should be improved before deployment.
- I confirmed the README should support assessment review by clearly listing the three advanced features.
- I kept the project direction focused on React TypeScript, C# .NET, simple code, FitQuest naming, and avoiding medical advice.
- I made the final call to continue with specs documentation after the README branch was created.

### Reflection

- The README now gives a clearer first impression of the project.
- It also makes the remaining work easier to track: deployment links, screenshots/demo notes, final specs update, and final assessment checklist review.

## Prompt 022: Deployment setup and production connection fixes

### Date

2026-07-21

### Context

- The project had core frontend and backend functionality working locally.
- I needed to deploy the backend and frontend for the final submission.
- The frontend and backend needed to connect correctly in production.

### Prompt Summary

- I asked AI to help with deployment, first using Render for the backend and then Vercel for the frontend.
- I reported production errors such as SQLite being unable to open the database file and frontend `Failed to fetch`.

### AI Output Summary

- AI helped adjust the Render SQLite setup to use a persistent disk path.
- AI helped confirm the backend deployment URL.
- AI helped configure the frontend deployment to call the Render API through `VITE_API_BASE_URL`.
- AI helped identify that production CORS/environment setup was the likely cause of the frontend fetch issue.

### My Decision

- I chose Render for the C# .NET backend and Vercel for the React TypeScript frontend.
- I confirmed the deployed URLs once both services were working.
- I chose to keep the deployment setup simple and explainable for the assessment.

### My Contribution

- I provided the live Render and Vercel URLs.
- I checked the deployed app and reported the production errors.
- I confirmed when the production connection was working.
- I directed the project to move on only after the deployed frontend could reach the backend.

### Reflection

- Deployment exposed environment issues that local development did not show.
- Fixing these issues made the project stronger because the final submission can be tested from public URLs.

## Prompt 023: Figma avatar and level-based player evolution

### Date

2026-07-21

### Context

- I had manually updated the Figma file with a FitQuest UX direction and pixel-style character assets.
- The app needed to use the character design more visibly.
- I wanted the player avatar to change as the user levels up.

### Prompt Summary

- I asked AI to use the Figma-designed character assets in the actual frontend.
- I then asked AI to make the character dynamic and create several states from basic to ultimate based on player level.
- I also asked AI to remove the white exported background around the character.

### AI Output Summary

- AI exported the Figma avatar assets into the frontend.
- AI added `PixelAvatar` support for multiple avatar stages.
- AI added level-based avatar evolution:
  - Rookie Challenger
  - Wild Power Champion
  - Iron Will Ascendant
- AI processed the avatar PNG files so the background is transparent.

### My Decision

- I chose to use my Figma design as the UX baseline.
- I chose level-based avatar evolution because it makes XP and levels more visible.
- I requested the white frame removal because the character should appear as a sprite, not as a boxed image.

### My Contribution

- I manually refined the Figma design and renamed the file to FitQuest.
- I asked for the character to be included in the actual app.
- I reviewed the visual output and identified the white frame problem.
- I directed the avatar to evolve by player level.

### Reflection

- The avatar makes the app feel more like FitQuest and less like a generic CRUD app.
- The level-based visual progression strengthens the gamification theme.

## Prompt 024: Quest boss battle feedback and monster variants

### Date

2026-07-21

### Context

- The Quest Board already supported completing quests, XP rewards, streaks, and achievements.
- I wanted quest completion to feel more fun and game-like.
- The app needed stronger visual evidence of gamification.

### Prompt Summary

- I asked AI to make the page more interesting by adding monsters as bosses.
- I asked for a completion animation where the player character attacks and knocks the monster away.
- I repeatedly adjusted the animation direction:
  - make the player and monster move closer
  - make both sides contact before the attack
  - make the contact point even closer
  - add more monster variety

### AI Output Summary

- AI added a CSS-based monster boss to each quest card.
- AI added a battle animation when a quest is completed:
  - player approach
  - monster approach
  - contact point
  - attack effect
  - XP burst
  - monster knock-away
- AI added stable monster variants generated from quest data:
  - Brute
  - Wraith
  - Crawler
  - Golem
  - Sprite
- AI made difficulty affect monster size.
- AI synced the battle avatar with the player's current level.

### My Decision

- I chose to add boss battle feedback because it makes the main Quest Board workflow more memorable.
- I chose stable randomisation instead of fully random monsters so the UI does not change unpredictably every refresh.
- I approved using CSS-based pixel monsters because it keeps the code simple and avoids extra asset complexity.

### My Contribution

- I proposed the boss battle idea.
- I gave repeated visual direction on the animation timing and contact distance.
- I asked for more monster variety and difficulty-based monster changes.
- I approved the final version after reviewing the local UI.

### Reflection

- This was a user-led UX refinement where AI implemented the details.
- The final Quest Board now better demonstrates gamification through interaction, not only through numbers.

## Prompt 025: Final paperwork and submission status update

### Date

2026-07-21

### Context

- The core app, deployment, tests, avatar evolution, and quest battle UI had been completed.
- The README and `/specs` files needed to be updated so the documentation matched the current project.

### Prompt Summary

- I asked AI what was still missing.
- AI identified final paperwork, final testing records, deployment review, screenshots/demo notes, and checklist review.
- I asked AI to do the paperwork update.

### AI Output Summary

- AI updated the README with the latest feature list, deployment links, gameplay UI notes, and demo notes.
- AI updated the development log with deployment, avatar, monster battle, and final validation progress.
- AI updated design decisions to explain deployment, avatar evolution, and monster battle feedback.
- AI ran final validation:
  - frontend tests passed
  - frontend build passed
  - backend tests passed after stopping a local backend process that was locking `backend.exe`

### My Decision

- I chose to update documentation after the latest gameplay UI was merged and pushed.
- I wanted the documentation to clearly show that my design decisions guided the UX direction.
- I chose to keep the remaining work focused on final checklist review and optional screenshots/demo evidence.

### My Contribution

- I asked for the final gap review.
- I approved the paperwork update.
- I required the records to describe my own design contribution rather than presenting the project as fully AI-designed.
- I kept the documentation in English for submission consistency.

### Reflection

- The documentation now better matches the actual state of the project.
- The project is close to final submission review, with the main remaining task being an assessment checklist pass.
