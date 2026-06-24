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
