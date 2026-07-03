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
