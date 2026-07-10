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
