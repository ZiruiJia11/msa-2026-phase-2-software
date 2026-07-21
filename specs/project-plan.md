# FitQuest Project Plan

## Project Overview

- **Project name:** FitQuest
- **Project type:** Full-stack web application
- **Assessment stream:** Microsoft Student Accelerator 2026 Phase 2 Software Stream
- **Theme:** Gamification
- **Frontend:** React with TypeScript
- **Backend:** C# with .NET
- **Database:** Entity Framework Core with persistent database storage
- **API documentation:** Scalar

## Project Pitch

- FitQuest turns personal fitness goals into daily quests.
- Users log workouts, complete challenges, earn XP, maintain activity streaks, unlock achievements, and track progress through a gamified fitness dashboard.

## Problem Statement

- Many people struggle to stay consistent with fitness habits.
- Traditional fitness trackers can feel passive or too focused on raw numbers.
- FitQuest aims to make fitness habit tracking more motivating by using simple game mechanics.
- The app focuses on motivation, habit consistency, and progress tracking.
- FitQuest will not provide medical advice, personalised diet plans, calorie recommendations, or professional training programs.

## Target Users

- Students who want a simple way to stay active.
- Beginners who want motivation through small, trackable goals.
- Users who enjoy game-like progress systems.
- People who want to track workouts without needing complex fitness planning tools.

## Connection to Gamification Theme

- Workout tasks are represented as quests.
- Completing quests awards XP.
- Total XP contributes to user levels.
- Consistent activity builds streaks.
- Users can unlock achievement badges.
- Dashboard progress indicators provide visual feedback.
- Optional leaderboard rankings can add friendly competition.

## Main User Flow

- User opens the dashboard.
- User views current level, XP progress, streak, and weekly activity.
- User creates a workout quest.
- User completes a quest after doing the workout.
- The app creates a workout log.
- The user earns XP.
- The app updates level and streak progress.
- The app checks whether any achievements should unlock.
- User reviews progress and achievements.

## Main Pages

### Dashboard

- Shows level.
- Shows XP progress.
- Shows current streak.
- Shows weekly completed workouts.
- Shows recent workout logs.
- Shows recent achievements.

### Quests

- Allows users to create workout quests.
- Allows users to view workout quests.
- Allows users to update workout quests.
- Allows users to complete workout quests.
- Allows users to delete workout quests.

### Achievements

- Shows unlocked badges.
- Shows locked badges.
- Example badges:
  - First Workout
  - 3-Day Streak
  - Cardio Starter
  - Strength Builder
  - Consistency Builder

### Progress

- Shows completed workout history.
- Shows weekly activity summaries.

### Leaderboard

- Optional feature.
- Can rank users by total XP.
- Can rank users by weekly completed workouts.
- If full multi-user functionality is not implemented, seeded demo users can be used.

### Profile / Settings

- May include profile information.
- May include theme switching between light mode and dark mode.

## Core Data Models

### UserProfile

- Id
- Username
- TotalXp
- Level
- CurrentStreak
- LongestStreak
- LastCompletedDate
- CreatedAt

### WorkoutQuest

- Id
- Title
- Description
- Category
- Difficulty
- XpReward
- DueDate
- IsActive
- CreatedAt
- UpdatedAt

### WorkoutLog

- Id
- WorkoutQuestId
- UserProfileId
- CompletedAt
- XpEarned
- Notes

### Achievement

- Id
- Name
- Description
- Icon
- ConditionType
- ConditionValue
- XpBonus

### UserAchievement

- Id
- UserProfileId
- AchievementId
- UnlockedAt

## Quest Categories

- Strength
- Cardio
- Flexibility
- Endurance
- Mobility
- Recovery

## Difficulty and XP System

- Easy: 25 XP
- Medium: 50 XP
- Hard: 100 XP
- XP is awarded when a user completes a quest.
- User level increases based on total XP.
- Achievement XP bonuses may be added when badges are unlocked.

## Minimum Viable Product

- Quest CRUD functionality.
- Complete quest action.
- Workout log creation.
- XP calculation.
- Basic level system.
- Basic streak tracking.
- Achievement unlock logic.
- Dashboard statistics.
- Responsive frontend UI.
- Persistent database storage.
- Scalar API documentation.
- Frontend and backend deployment.

## Planned Advanced Features

- Theme switching between light mode and dark mode.
- State management using Zustand.
- Security measures including input validation and rate limiting.

## Development Order

- Completed `/specs` documentation baseline.
- Replaced the demo score model with FitQuest data models.
- Built backend CRUD endpoints for WorkoutQuest.
- Added WorkoutLog and complete quest functionality.
- Added XP and level calculation.
- Added streak tracking logic.
- Added achievement unlock logic.
- Built the frontend quests page.
- Built the dashboard page.
- Built the achievements page.
- Added theme switching.
- Added Zustand state management.
- Added input validation and rate limiting.
- Added unit tests for key frontend and backend functionality.
- Deployed the frontend to Vercel and backend to Render.
- Polished the UI with Figma-inspired avatar evolution and quest battle feedback.
- Updated README and `/specs` records for final submission review.

## Design Direction

- Use a clean fitness dashboard style.
- Make key stats easy to scan.
- Use progress bars for XP, levels, and weekly goals.
- Use badges or icons for achievements.
- Keep forms simple and clear.
- Ensure the UI works well on desktop and mobile.
- Avoid medical or professional training language.

## Scope Control

- Start with one main user profile.
- Keep quest creation simple.
- Use predefined quest categories and difficulty levels.
- Keep leaderboard optional until core features are complete.
- Do not add personalised workout plans.
- Do not add nutrition, calorie, injury, or medical guidance.
- Prioritise assessment requirements before extra features.

## Success Criteria

- FitQuest clearly follows the gamification theme.
- Users can create, edit, complete, and delete workout quests.
- Completing quests creates workout logs and awards XP.
- User level and streak information updates correctly.
- Achievements can be unlocked through user progress.
- Dashboard shows useful progress statistics.
- Data persists after restarting the backend.
- Scalar API documentation is available.
- The frontend is responsive and visually polished.
- The README clearly lists the top three advanced features.
- The `/specs` folder documents planning, AI usage, and design decisions.
- Public frontend and backend deployment links are available.
- Final assessment checklist is recorded in `/specs/final-assessment-checklist.md`.
