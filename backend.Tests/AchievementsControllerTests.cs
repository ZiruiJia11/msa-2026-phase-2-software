using backend.Controllers;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests;

public class AchievementsControllerTests
{
    [Fact]
    public async Task GetAll_ReturnsAchievements_WithUnlockStatusForPlayer()
    {
        await using var db = CreateDbContext();
        var user = new UserProfile
        {
            Username = "Player",
            Level = 1,
            CreatedAt = DateTime.UtcNow
        };
        var unlockedAchievement = new Achievement
        {
            Name = "First Quest",
            Description = "Complete your first workout quest.",
            Icon = "spark",
            ConditionType = AchievementConditionType.FirstWorkout,
            ConditionValue = 1,
            XpBonus = 25
        };
        var lockedAchievement = new Achievement
        {
            Name = "3-Day Streak",
            Description = "Build a three day workout streak.",
            Icon = "streak",
            ConditionType = AchievementConditionType.StreakDays,
            ConditionValue = 3,
            XpBonus = 75
        };
        db.UserProfiles.Add(user);
        db.Achievements.AddRange(unlockedAchievement, lockedAchievement);
        await db.SaveChangesAsync();
        db.UserAchievements.Add(new UserAchievement
        {
            UserProfileId = user.Id,
            AchievementId = unlockedAchievement.Id,
            UnlockedAt = DateTime.UtcNow
        });
        await db.SaveChangesAsync();

        var controller = new AchievementsController(db);

        var result = await controller.GetAll();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var achievements = Assert.IsAssignableFrom<IEnumerable<AchievementResponse>>(okResult.Value).ToList();

        Assert.Equal(2, achievements.Count);
        var firstQuest = achievements.Single(achievement => achievement.Name == "First Quest");
        var streak = achievements.Single(achievement => achievement.Name == "3-Day Streak");

        Assert.True(firstQuest.IsUnlocked);
        Assert.NotNull(firstQuest.UnlockedAt);
        Assert.False(streak.IsUnlocked);
        Assert.Null(streak.UnlockedAt);
    }

    [Fact]
    public async Task GetAll_ReturnsLockedAchievements_WhenPlayerDoesNotExist()
    {
        await using var db = CreateDbContext();
        db.Achievements.Add(new Achievement
        {
            Name = "XP Climber",
            Description = "Reach 250 total XP.",
            Icon = "bolt",
            ConditionType = AchievementConditionType.TotalXp,
            ConditionValue = 250,
            XpBonus = 100
        });
        await db.SaveChangesAsync();

        var controller = new AchievementsController(db);

        var result = await controller.GetAll();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var achievement = Assert.Single(Assert.IsAssignableFrom<IEnumerable<AchievementResponse>>(okResult.Value));

        Assert.Equal("XP Climber", achievement.Name);
        Assert.False(achievement.IsUnlocked);
        Assert.Null(achievement.UnlockedAt);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}
