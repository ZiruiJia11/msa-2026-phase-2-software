namespace backend.Models;

public class WorkoutQuest
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public QuestCategory Category { get; set; }
    public QuestDifficulty Difficulty { get; set; }
    public int XpReward { get; set; }
    public DateOnly? DueDate { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public List<WorkoutLog> WorkoutLogs { get; set; } = [];
}
