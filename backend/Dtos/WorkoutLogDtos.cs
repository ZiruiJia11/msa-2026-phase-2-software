using backend.Models;

namespace backend.Dtos;

public class WorkoutLogResponse
{
    public int Id { get; set; }
    public int WorkoutQuestId { get; set; }
    public string QuestTitle { get; set; } = string.Empty;
    public QuestCategory Category { get; set; }
    public QuestDifficulty Difficulty { get; set; }
    public int XpEarned { get; set; }
    public string Notes { get; set; } = string.Empty;
    public DateTime CompletedAt { get; set; }
}
