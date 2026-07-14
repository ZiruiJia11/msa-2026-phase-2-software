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

        var log = await db.WorkoutLogs.SingleAsync();
        Assert.Equal(quest.Id, log.WorkoutQuestId);
        Assert.Equal(50, log.XpEarned);
        Assert.Equal("Completed in test", log.Notes);

        var user = await db.UserProfiles.SingleAsync();
        Assert.Equal("Player", user.Username);
        Assert.Equal(50, user.TotalXp);
        Assert.Equal(1, user.Level);
        Assert.NotNull(user.LastCompletedDate);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}
