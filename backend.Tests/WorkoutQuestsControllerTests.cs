using backend.Controllers;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests;

public class WorkoutQuestsControllerTests
{
    [Fact]
    public async Task Create_ReturnsBadRequest_WhenTitleIsMissing()
    {
        await using var db = CreateDbContext();
        var controller = new WorkoutQuestsController(db);

        var result = await controller.Create(new CreateWorkoutQuestRequest
        {
            Title = "",
            Description = "A quest without a valid title",
            Category = QuestCategory.Strength,
            Difficulty = QuestDifficulty.Easy
        });

        Assert.IsType<BadRequestObjectResult>(result.Result);
        Assert.Empty(await db.WorkoutQuests.ToListAsync());
    }

    [Fact]
    public async Task Complete_CreatesWorkoutLog_AndUpdatesUserXp()
    {
        await using var db = CreateDbContext();
        var quest = new WorkoutQuest
        {
            Title = "Push day",
            Description = "Chest and triceps",
            Category = QuestCategory.Strength,
            Difficulty = QuestDifficulty.Medium,
            XpReward = 50,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.WorkoutQuests.Add(quest);
        await db.SaveChangesAsync();

        var controller = new WorkoutQuestsController(db);

        var result = await controller.Complete(quest.Id, new CompleteWorkoutQuestRequest
        {
            Notes = "Completed in test"
        });

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<CompleteWorkoutQuestResponse>(okResult.Value);

        Assert.Equal(quest.Id, response.WorkoutQuestId);
        Assert.Equal(50, response.XpEarned);
        Assert.Equal(50, response.TotalXp);
        Assert.Equal(1, response.Level);
        Assert.Equal(1, response.CurrentStreak);
        Assert.Equal(1, response.LongestStreak);

        var log = await db.WorkoutLogs.SingleAsync();
        Assert.Equal(quest.Id, log.WorkoutQuestId);
        Assert.Equal(50, log.XpEarned);
        Assert.Equal("Completed in test", log.Notes);

        var user = await db.UserProfiles.SingleAsync();
        Assert.Equal("Player", user.Username);
        Assert.Equal(50, user.TotalXp);
        Assert.Equal(1, user.Level);
        Assert.Equal(1, user.CurrentStreak);
        Assert.Equal(1, user.LongestStreak);
        Assert.NotNull(user.LastCompletedDate);
    }

    [Fact]
    public async Task Complete_IncreasesStreak_WhenLastCompletionWasYesterday()
    {
        await using var db = CreateDbContext();
        var quest = new WorkoutQuest
        {
            Title = "Run day",
            Description = "Easy run",
            Category = QuestCategory.Cardio,
            Difficulty = QuestDifficulty.Easy,
            XpReward = 25,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        var user = new UserProfile
        {
            Username = "Player",
            TotalXp = 100,
            Level = 2,
            CurrentStreak = 1,
            LongestStreak = 1,
            LastCompletedDate = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-1),
            CreatedAt = DateTime.UtcNow
        };
        db.WorkoutQuests.Add(quest);
        db.UserProfiles.Add(user);
        await db.SaveChangesAsync();

        var controller = new WorkoutQuestsController(db);

        var result = await controller.Complete(quest.Id, new CompleteWorkoutQuestRequest());

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<CompleteWorkoutQuestResponse>(okResult.Value);

        Assert.Equal(2, response.CurrentStreak);
        Assert.Equal(2, response.LongestStreak);

        var updatedUser = await db.UserProfiles.SingleAsync();
        Assert.Equal(2, updatedUser.CurrentStreak);
        Assert.Equal(2, updatedUser.LongestStreak);
        Assert.Equal(DateOnly.FromDateTime(DateTime.UtcNow), updatedUser.LastCompletedDate);
    }

    [Fact]
    public async Task Complete_UnlocksFirstWorkoutAchievement_AndAddsBonusXp()
    {
        await using var db = CreateDbContext();
        var quest = new WorkoutQuest
        {
            Title = "First badge quest",
            Description = "Unlock the first badge",
            Category = QuestCategory.Mobility,
            Difficulty = QuestDifficulty.Easy,
            XpReward = 25,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        var achievement = new Achievement
        {
            Name = "First Quest",
            Description = "Complete your first workout quest.",
            Icon = "spark",
            ConditionType = AchievementConditionType.FirstWorkout,
            ConditionValue = 1,
            XpBonus = 25
        };
        db.WorkoutQuests.Add(quest);
        db.Achievements.Add(achievement);
        await db.SaveChangesAsync();

        var controller = new WorkoutQuestsController(db);

        var result = await controller.Complete(quest.Id, new CompleteWorkoutQuestRequest());

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<CompleteWorkoutQuestResponse>(okResult.Value);

        var unlockedAchievement = Assert.Single(response.UnlockedAchievements);
        Assert.Equal("First Quest", unlockedAchievement.Name);
        Assert.Equal(25, unlockedAchievement.XpBonus);
        Assert.Equal(50, response.TotalXp);

        var userAchievement = await db.UserAchievements.SingleAsync();
        Assert.Equal(achievement.Id, userAchievement.AchievementId);

        var user = await db.UserProfiles.SingleAsync();
        Assert.Equal(50, user.TotalXp);
        Assert.Equal(1, user.Level);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}
