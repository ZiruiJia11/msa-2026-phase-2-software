# Design Decisions

This file records key FitQuest project design decisions and the reasons behind them.

## 1. Why FitQuest Was Chosen

- FitQuest was chosen because fitness habits naturally support gamification.
- XP, levels, streaks, badges, and progress dashboards fit the project theme well.
- The idea is practical and easy to demonstrate in a short video.

## 2. Why WorkoutQuest and WorkoutLog Are Separate

- `WorkoutQuest` represents a reusable quest or task.
- `WorkoutLog` records each time a quest is completed.
- This is better than only using an `IsCompleted` field because the same quest may be completed multiple times.
- This supports history, weekly progress, streaks, and achievement logic.

## 3. Why the Leaderboard Is Optional

- A real leaderboard works best with multi-user support.
- Multi-user functionality may increase project scope.
- The MVP should prioritise quests, XP, streaks, achievements, and dashboard progress.
- If time allows, the leaderboard can be implemented with seeded demo users or simple user profiles.

## 4. Why the App Avoids Medical Advice

- FitQuest is a motivation and tracking app, not a medical or professional fitness coaching app.
- It should not provide personalised diet plans, calorie recommendations, or medical advice.
- This keeps the project safer, clearer, and easier to scope.

## 5. Why These Advanced Features Were Selected

- Theme switching improves user experience and gives the dashboard a more polished feel.
- Zustand is suitable for managing frontend app state such as profile data, quests, dashboard stats, and theme.
- Security measures such as input validation and rate limiting are useful because the backend accepts user input through API endpoints.

## 6. Why DTOs Are Used for WorkoutQuest CRUD

- DTOs keep API request and response shapes separate from EF Core entity classes.
- Create and update requests only accept the fields the user should control.
- Response DTOs avoid accidentally returning navigation properties or internal EF data.
- This keeps the API clearer for frontend integration and Scalar documentation.

## 7. Why XP Reward Is Calculated by the Backend

- The frontend should not decide how much XP a quest is worth.
- The backend maps difficulty to XP so the rule stays consistent.
- Current mapping is Easy = 25 XP, Medium = 50 XP, and Hard = 100 XP.

## 8. Why WorkoutQuest Delete Uses Soft Delete

- Quests may later be referenced by workout logs.
- Permanently deleting quests could make historical workout data harder to understand.
- Setting `IsActive` to `false` hides old quests while preserving the record for history and progress features.

## 9. Why the First Frontend Slice Is the Quest Board

- `WorkoutQuest` CRUD is the first complete backend feature, so the frontend should connect to that before adding dashboard features.
- A Quest Board makes the app visibly FitQuest instead of a generic demo leaderboard.
- Keeping the first frontend slice focused on quest management avoids mixing CRUD, completion, XP, streaks, and achievements in one large change.

## 10. Why the Frontend Shows Archive and Restore

- The backend uses soft delete, so archived quests still exist in the API when requested with `includeInactive=true`.
- Showing archived quests helps confirm that soft delete works.
- Restore support makes the MVP easier to test and gives users a way to recover archived quests.

## 11. Why Nullable Quest Request Fields Are Handled Explicitly

- The frontend normally sends strings for title and description, but direct API callers can send null values.
- Without explicit handling, null description values could cause server errors when the backend trims strings.
- The backend now treats null descriptions as empty strings and validates null titles as missing titles.
- This keeps API behavior predictable and safer.

## 12. Why SQLite Was Added for Persistent Storage

- The assessment requires data persistence using SQL or NoSQL storage.
- EF Core InMemory storage was useful for the demo scaffold but data disappeared after backend restarts.
- SQLite is simple to run locally, works well with EF Core, and does not require external database setup during early development.
- The local database file is ignored by Git so development data is not committed.

## 13. Why Figma Is Used as the UX Baseline

- The current frontend works functionally, but the app needs a more intentional UX direction before more pages are added.
- I manually organised the Figma file into clear FitQuest design areas for UX screens and pixel-style assets.
- The Figma design will act as the visual baseline for future frontend implementation work.
- AI will help refine and implement the design in React TypeScript, but the UX direction comes from my organised Figma design.
- This makes the design process clearer for assessment evidence and helps keep future UI changes consistent.

## 14. Why Pixel Assets Are Included

- FitQuest uses gamification, so small pixel-style characters and exercise action frames support the game-like theme.
- Pixel assets can help represent quest progress, workout categories, achievements, and motivational feedback.
- The assets are original FitQuest-style characters and should avoid copying specific copyrighted character designs.
- The first implementation can use the assets as visual inspiration before adding full animation in the frontend.

## 15. Why Quest Completion Creates Workout Logs

- Completing a quest should not only change the quest card in the UI.
- Each completion is a historical activity event, so it is recorded as a `WorkoutLog`.
- This allows the same quest to be completed multiple times over time.
- Workout logs can later support progress history, weekly summaries, streaks, and achievement unlock rules.

## 16. Why the MVP Uses One Default User

- Full authentication and multi-user profile management would increase the project scope.
- The MVP can still demonstrate XP, levels, logs, streaks, and achievements with one default user profile.
- The backend creates or reuses a default `Player` profile when a quest is completed.
- This keeps the gamification loop working while leaving real account support as an optional future improvement.

## 17. Why Level Calculation Is Simple First

- The first level rule is `100 XP per level`.
- This is easy to explain, test, and demonstrate.
- More advanced level curves can be added later after quest completion, logs, streaks, and achievements are stable.

## 18. Why Theme Switching Uses CSS Variables First

- Theme switching is one of the selected advanced requirements, so it should be implemented in a clear and demonstrable way.
- CSS variables keep the light and dark colour systems centralised in one stylesheet.
- The selected theme is stored in `localStorage` so the user's preference persists after refresh.
- Zustand is still planned for broader shared frontend state, but theme switching does not need that extra dependency yet.
- Keeping the first advanced feature simple makes it easier to test, review, and explain in the final submission.

## 19. Why Security Measures Are Kept Practical for the MVP

- FitQuest does not yet include authentication or multi-user account data, so the first security slice focuses on realistic API protections.
- Updating the SQLite native dependency removes a known vulnerability warning from backend test output.
- Rate limiting helps protect API endpoints from excessive repeated requests.
- A configured CORS allowlist is safer than allowing all origins during normal development.
- Existing backend validation for quest input remains part of the security story because it rejects invalid titles, descriptions, categories, and difficulties.

## 20. Why Zustand Was Added for Shared Frontend State

- Zustand is lightweight and easy to understand for a React TypeScript MVP.
- Theme state is app-level state because it affects the whole UI and needs to persist across refreshes.
- Dashboard state is shared user progress state that can later be reused by other pages such as Progress, Achievements, or Profile.
- The first migration keeps state management focused on real needs instead of moving every local form state into a global store.
- Form state remains local in the Quest Board because it is only used inside that page.

## 21. Why Streak Logic Uses Daily Completion Rules

- Streaks support the gamification theme by rewarding consistency instead of only total XP.
- A same-day completion does not increase the streak because the streak represents daily habit consistency.
- A completion on the day after the last completion increases the current streak.
- A completion after a missed day resets the current streak to 1.
- This rule is simple to explain, test, and demonstrate before adding achievement unlock logic.

## 22. Why Achievements Start With a Small Default Badge Set

- Achievement unlocks complete the main gamification loop without requiring user accounts or complex configuration.
- A small seeded badge set is easier to demo, test, and explain than a large catalogue.
- The first badges focus on behaviours already tracked by the MVP: first workout, streak days, total completions, and total XP.
- Achievement XP bonuses reward milestone progress but still use the existing level calculation rule.
- Category-specific achievements are left for later because the current model has a condition type but no category target field.
