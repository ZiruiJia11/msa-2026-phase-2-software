using backend.Controllers;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Tests;

public class WorkoutLogsControllerTests
{
    [Fact]
    public async Task GetRecent_ReturnsLogsInNewestFirstOrder()
    {
        await using var db = CreateDbContext();
        var (olderLog, newerLog) = await SeedLogs(db);
        var controller = new WorkoutLogsController(db);

        var result = await controller.GetRecent();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var logs = Assert.IsAssignableFrom<IEnumerable<WorkoutLogResponse>>(okResult.Value).ToList();

        Assert.Equal([newerLog.Id, olderLog.Id], logs.Select(log => log.Id).ToList());
        Assert.Equal("Evening run", logs[0].QuestTitle);
        Assert.Equal(QuestCategory.Cardio, logs[0].Category);
    }

    [Fact]
    public async Task GetRecent_ClampsLimit_ToAtLeastOne()
    {
        await using var db = CreateDbContext();
        await SeedLogs(db);
        var controller = new WorkoutLogsController(db);

        var result = await controller.GetRecent(0);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var logs = Assert.IsAssignableFrom<IEnumerable<WorkoutLogResponse>>(okResult.Value).ToList();

        Assert.Single(logs);
    }

    private static async Task<(WorkoutLog olderLog, WorkoutLog newerLog)> SeedLogs(AppDbContext db)
    {
        var user = new UserProfile
        {
            Username = "Player",
            Level = 1,
            CreatedAt = DateTime.UtcNow
        };
        var quest = new WorkoutQuest
        {
            Title = "Evening run",
            Description = "Easy cardio",
            Category = QuestCategory.Cardio,
            Difficulty = QuestDifficulty.Easy,
            XpReward = 25,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.UserProfiles.Add(user);
        db.WorkoutQuests.Add(quest);
        await db.SaveChangesAsync();

        var olderLog = new WorkoutLog
        {
            UserProfileId = user.Id,
            WorkoutQuestId = quest.Id,
            XpEarned = 25,
            CompletedAt = DateTime.UtcNow.AddDays(-2)
        };
        var newerLog = new WorkoutLog
        {
            UserProfileId = user.Id,
            WorkoutQuestId = quest.Id,
            XpEarned = 25,
            CompletedAt = DateTime.UtcNow
        };
        db.WorkoutLogs.AddRange(olderLog, newerLog);
        await db.SaveChangesAsync();

        return (olderLog, newerLog);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}
