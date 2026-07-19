using backend.Data;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AchievementsController : ControllerBase
{
    private readonly AppDbContext _db;

    public AchievementsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AchievementResponse>>> GetAll()
    {
        var user = await _db.UserProfiles.AsNoTracking().FirstOrDefaultAsync(profile => profile.Username == "Player");
        var userId = user?.Id ?? 0;

        var achievements = await _db.Achievements
            .AsNoTracking()
            .OrderBy(achievement => achievement.ConditionType)
            .ThenBy(achievement => achievement.ConditionValue)
            .GroupJoin(
                _db.UserAchievements.AsNoTracking().Where(userAchievement => userAchievement.UserProfileId == userId),
                achievement => achievement.Id,
                userAchievement => userAchievement.AchievementId,
                (achievement, userAchievements) => new { achievement, userAchievement = userAchievements.FirstOrDefault() })
            .Select(item => new AchievementResponse
            {
                Id = item.achievement.Id,
                Name = item.achievement.Name,
                Description = item.achievement.Description,
                Icon = item.achievement.Icon,
                ConditionType = item.achievement.ConditionType,
                ConditionValue = item.achievement.ConditionValue,
                XpBonus = item.achievement.XpBonus,
                IsUnlocked = item.userAchievement != null,
                UnlockedAt = item.userAchievement == null ? null : item.userAchievement.UnlockedAt
            })
            .ToListAsync();

        return Ok(achievements);
    }
}
