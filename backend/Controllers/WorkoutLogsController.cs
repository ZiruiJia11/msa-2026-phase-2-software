using backend.Data;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkoutLogsController : ControllerBase
{
    private readonly AppDbContext _db;

    public WorkoutLogsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkoutLogResponse>>> GetRecent([FromQuery] int limit = 20)
    {
        var safeLimit = Math.Clamp(limit, 1, 100);
        var logs = await _db.WorkoutLogs
            .AsNoTracking()
            .Include(log => log.WorkoutQuest)
            .OrderByDescending(log => log.CompletedAt)
            .Take(safeLimit)
            .Select(log => new WorkoutLogResponse
            {
                Id = log.Id,
                WorkoutQuestId = log.WorkoutQuestId,
                QuestTitle = log.WorkoutQuest == null ? "Unknown quest" : log.WorkoutQuest.Title,
                Category = log.WorkoutQuest == null ? default : log.WorkoutQuest.Category,
                Difficulty = log.WorkoutQuest == null ? default : log.WorkoutQuest.Difficulty,
                XpEarned = log.XpEarned,
                Notes = log.Notes,
                CompletedAt = log.CompletedAt
            })
            .ToListAsync();

        return Ok(logs);
    }
}
