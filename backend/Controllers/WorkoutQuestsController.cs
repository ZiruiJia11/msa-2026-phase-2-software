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
}
