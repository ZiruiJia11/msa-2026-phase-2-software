using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private const int XpPerLevel = 100;
    private readonly AppDbContext _db;

    public ProfileController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<ProfileSummaryResponse>> GetProfile()
    {
        var user = await GetOrCreateDefaultUser();
        var completedWorkoutCount = await _db.WorkoutLogs.CountAsync(log => log.UserProfileId == user.Id);
        var xpForCurrentLevel = Math.Max(0, (user.Level - 1) * XpPerLevel);

        return Ok(new ProfileSummaryResponse
        {
            Id = user.Id,
            Username = user.Username,
            TotalXp = user.TotalXp,
            Level = user.Level,
            CurrentStreak = user.CurrentStreak,
            LongestStreak = user.LongestStreak,
            LastCompletedDate = user.LastCompletedDate,
            CompletedWorkoutCount = completedWorkoutCount,
            XpForCurrentLevel = xpForCurrentLevel,
            XpForNextLevel = user.Level * XpPerLevel,
            XpIntoCurrentLevel = Math.Max(0, user.TotalXp - xpForCurrentLevel)
        });
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
}
