using backend.Controllers;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests;

public class ProfileControllerTests
{
    [Fact]
    public async Task GetProfile_CreatesDefaultProfile_WhenPlayerDoesNotExist()
    {
        await using var db = CreateDbContext();
        var controller = new ProfileController(db);

        var result = await controller.GetProfile();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<ProfileSummaryResponse>(okResult.Value);

        Assert.Equal("Player", response.Username);
        Assert.Equal(1, response.Level);
        Assert.Equal(0, response.TotalXp);
        Assert.Equal(0, response.CompletedWorkoutCount);
        Assert.Single(await db.UserProfiles.ToListAsync());
    }

    [Fact]
    public async Task GetProfile_ReturnsProgressSummary_ForExistingPlayer()
    {
        await using var db = CreateDbContext();
        var user = new UserProfile
        {
            Username = "Player",
            TotalXp = 275,
            Level = 3,
            CurrentStreak = 2,
            LongestStreak = 4,
            LastCompletedDate = DateOnly.FromDateTime(DateTime.UtcNow),
            CreatedAt = DateTime.UtcNow
        };
        var quest = new WorkoutQuest
        {
            Title = "Core day",
            Description = "Core strength",
            Category = QuestCategory.Strength,
            Difficulty = QuestDifficulty.Medium,
            XpReward = 50,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.UserProfiles.Add(user);
        db.WorkoutQuests.Add(quest);
        await db.SaveChangesAsync();
        db.WorkoutLogs.AddRange(
            new WorkoutLog { UserProfileId = user.Id, WorkoutQuestId = quest.Id, XpEarned = 50, CompletedAt = DateTime.UtcNow },
            new WorkoutLog { UserProfileId = user.Id, WorkoutQuestId = quest.Id, XpEarned = 50, CompletedAt = DateTime.UtcNow.AddDays(-1) });
        await db.SaveChangesAsync();

        var controller = new ProfileController(db);

        var result = await controller.GetProfile();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<ProfileSummaryResponse>(okResult.Value);

        Assert.Equal(275, response.TotalXp);
        Assert.Equal(3, response.Level);
        Assert.Equal(2, response.CurrentStreak);
        Assert.Equal(4, response.LongestStreak);
        Assert.Equal(2, response.CompletedWorkoutCount);
        Assert.Equal(200, response.XpForCurrentLevel);
        Assert.Equal(300, response.XpForNextLevel);
        Assert.Equal(75, response.XpIntoCurrentLevel);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}
