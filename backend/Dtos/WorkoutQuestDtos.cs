using backend.Models;

namespace backend.Dtos;

public class CreateWorkoutQuestRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public QuestCategory Category { get; set; }
    public QuestDifficulty Difficulty { get; set; }
    public DateOnly? DueDate { get; set; }
}

public class UpdateWorkoutQuestRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public QuestCategory Category { get; set; }
    public QuestDifficulty Difficulty { get; set; }
    public DateOnly? DueDate { get; set; }
    public bool IsActive { get; set; } = true;
}

public class WorkoutQuestResponse
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public QuestCategory Category { get; set; }
    public QuestDifficulty Difficulty { get; set; }
    public int XpReward { get; set; }
    public DateOnly? DueDate { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
