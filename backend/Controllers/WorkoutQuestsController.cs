using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkoutQuestsController : ControllerBase
{
    private readonly AppDbContext _db;

    public WorkoutQuestsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkoutQuestResponse>>> GetAll([FromQuery] bool includeInactive = false)
    {
        var query = _db.WorkoutQuests.AsNoTracking();

        if (!includeInactive)
        {
            query = query.Where(quest => quest.IsActive);
        }

        var quests = await query
            .OrderByDescending(quest => quest.IsActive)
            .ThenBy(quest => quest.DueDate == null)
            .ThenBy(quest => quest.DueDate)
            .ThenByDescending(quest => quest.CreatedAt)
            .Select(quest => ToResponse(quest))
            .ToListAsync();

        return Ok(quests);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WorkoutQuestResponse>> GetById(int id)
    {
        var quest = await _db.WorkoutQuests.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
        if (quest is null)
        {
            return NotFound();
        }

        return Ok(ToResponse(quest));
    }

    [HttpPost]
    public async Task<ActionResult<WorkoutQuestResponse>> Create(CreateWorkoutQuestRequest request)
    {
        var title = request.Title ?? string.Empty;
        var description = request.Description ?? string.Empty;
        var validationError = ValidateRequest(title, description, request.Category, request.Difficulty);
        if (validationError is not null)
        {
            return BadRequest(new { message = validationError });
        }

        var now = DateTime.UtcNow;
        var quest = new WorkoutQuest
        {
            Title = title.Trim(),
            Description = description.Trim(),
            Category = request.Category,
            Difficulty = request.Difficulty,
            XpReward = GetXpReward(request.Difficulty),
            DueDate = request.DueDate,
            IsActive = true,
            CreatedAt = now,
            UpdatedAt = now
        };

        _db.WorkoutQuests.Add(quest);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = quest.Id }, ToResponse(quest));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<WorkoutQuestResponse>> Update(int id, UpdateWorkoutQuestRequest request)
    {
        var title = request.Title ?? string.Empty;
        var description = request.Description ?? string.Empty;
        var validationError = ValidateRequest(title, description, request.Category, request.Difficulty);
        if (validationError is not null)
        {
            return BadRequest(new { message = validationError });
        }

        var quest = await _db.WorkoutQuests.FindAsync(id);
        if (quest is null)
        {
            return NotFound();
        }

        quest.Title = title.Trim();
        quest.Description = description.Trim();
        quest.Category = request.Category;
        quest.Difficulty = request.Difficulty;
        quest.XpReward = GetXpReward(request.Difficulty);
        quest.DueDate = request.DueDate;
        quest.IsActive = request.IsActive;
        quest.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return Ok(ToResponse(quest));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var quest = await _db.WorkoutQuests.FindAsync(id);
        if (quest is null)
        {
            return NotFound();
        }

        quest.IsActive = false;
        quest.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{id:int}/complete")]
    public async Task<ActionResult<CompleteWorkoutQuestResponse>> Complete(int id, CompleteWorkoutQuestRequest request)
    {
        var quest = await _db.WorkoutQuests.FindAsync(id);
        if (quest is null)
        {
            return NotFound();
        }

        if (!quest.IsActive)
        {
            return BadRequest(new { message = "Archived quests cannot be completed." });
        }

        var notes = request.Notes ?? string.Empty;
        if (notes.Trim().Length > 500)
        {
            return BadRequest(new { message = "Notes must be 500 characters or fewer." });
        }

        var user = await GetOrCreateDefaultUser();
        var now = DateTime.UtcNow;
        var log = new WorkoutLog
        {
            WorkoutQuestId = quest.Id,
            UserProfileId = user.Id,
            CompletedAt = now,
            XpEarned = quest.XpReward,
            Notes = notes.Trim()
        };

        user.TotalXp += quest.XpReward;
        user.Level = CalculateLevel(user.TotalXp);
        UpdateStreak(user, DateOnly.FromDateTime(now));

        _db.WorkoutLogs.Add(log);
        await _db.SaveChangesAsync();
        var unlockedAchievements = await UnlockAchievements(user, now);
        if (unlockedAchievements.Count > 0)
        {
            await _db.SaveChangesAsync();
        }

        return Ok(new CompleteWorkoutQuestResponse
        {
            WorkoutLogId = log.Id,
            WorkoutQuestId = quest.Id,
            UserProfileId = user.Id,
            XpEarned = log.XpEarned,
            TotalXp = user.TotalXp,
            Level = user.Level,
            CurrentStreak = user.CurrentStreak,
            LongestStreak = user.LongestStreak,
            UnlockedAchievements = unlockedAchievements,
            CompletedAt = log.CompletedAt
        });
    }

    private static WorkoutQuestResponse ToResponse(WorkoutQuest quest)
    {
        return new WorkoutQuestResponse
        {
            Id = quest.Id,
            Title = quest.Title,
            Description = quest.Description,
            Category = quest.Category,
            Difficulty = quest.Difficulty,
            XpReward = quest.XpReward,
            DueDate = quest.DueDate,
            IsActive = quest.IsActive,
            CreatedAt = quest.CreatedAt,
            UpdatedAt = quest.UpdatedAt
        };
    }

    private static string? ValidateRequest(string title, string description, QuestCategory category, QuestDifficulty difficulty)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return "Title is required.";
        }

        if (title.Trim().Length > 120)
        {
            return "Title must be 120 characters or fewer.";
        }

        if (description.Trim().Length > 500)
        {
            return "Description must be 500 characters or fewer.";
        }

        if (!Enum.IsDefined(category))
        {
            return "Category is not valid.";
        }

        if (!Enum.IsDefined(difficulty))
        {
            return "Difficulty is not valid.";
        }

        return null;
    }

    private static int GetXpReward(QuestDifficulty difficulty)
    {
        return difficulty switch
        {
            QuestDifficulty.Easy => 25,
            QuestDifficulty.Medium => 50,
            QuestDifficulty.Hard => 100,
            _ => 0
        };
    }

    private async Task<UserProfile> GetOrCreateDefaultUser()
    {
        var user = await _db.UserProfiles.FirstOrDefaultAsync(profile => profile.Username == "Player");
        if (user is not null)
        {
            return user;
        }

        user = new UserProfile
        {
            Username = "Player",
            Level = 1,
            CreatedAt = DateTime.UtcNow
        };

        _db.UserProfiles.Add(user);
        await _db.SaveChangesAsync();

        return user;
    }

    private static int CalculateLevel(int totalXp)
    {
        return Math.Max(1, (totalXp / 100) + 1);
    }

    private static void UpdateStreak(UserProfile user, DateOnly completedDate)
    {
        if (user.LastCompletedDate == completedDate)
        {
            return;
        }

        if (user.LastCompletedDate == completedDate.AddDays(-1))
        {
            user.CurrentStreak += 1;
        }
        else
        {
            user.CurrentStreak = 1;
        }

        user.LongestStreak = Math.Max(user.LongestStreak, user.CurrentStreak);
        user.LastCompletedDate = completedDate;
    }

    private async Task<List<UnlockedAchievementResponse>> UnlockAchievements(UserProfile user, DateTime unlockedAt)
    {
        var completedWorkoutCount = await _db.WorkoutLogs.CountAsync(log => log.UserProfileId == user.Id);
        var unlockedAchievementIds = await _db.UserAchievements
            .Where(userAchievement => userAchievement.UserProfileId == user.Id)
            .Select(userAchievement => userAchievement.AchievementId)
            .ToListAsync();

        var availableAchievements = await _db.Achievements
            .Where(achievement => !unlockedAchievementIds.Contains(achievement.Id))
            .OrderBy(achievement => achievement.ConditionType)
            .ThenBy(achievement => achievement.ConditionValue)
            .ToListAsync();

        var unlocked = new List<UnlockedAchievementResponse>();
        foreach (var achievement in availableAchievements)
        {
            if (!IsAchievementUnlocked(achievement, user, completedWorkoutCount))
            {
                continue;
            }

            _db.UserAchievements.Add(new UserAchievement
            {
                UserProfileId = user.Id,
                AchievementId = achievement.Id,
                UnlockedAt = unlockedAt
            });

            user.TotalXp += achievement.XpBonus;
            unlocked.Add(new UnlockedAchievementResponse
            {
                Id = achievement.Id,
                Name = achievement.Name,
                Icon = achievement.Icon,
                XpBonus = achievement.XpBonus
            });
        }

        if (unlocked.Count > 0)
        {
            user.Level = CalculateLevel(user.TotalXp);
        }

        return unlocked;
    }

    private static bool IsAchievementUnlocked(Achievement achievement, UserProfile user, int completedWorkoutCount)
    {
        return achievement.ConditionType switch
        {
            AchievementConditionType.FirstWorkout => completedWorkoutCount >= achievement.ConditionValue,
            AchievementConditionType.StreakDays => user.CurrentStreak >= achievement.ConditionValue,
            AchievementConditionType.TotalCompletions => completedWorkoutCount >= achievement.ConditionValue,
            AchievementConditionType.TotalXp => user.TotalXp >= achievement.ConditionValue,
            _ => false
        };
    }
}
