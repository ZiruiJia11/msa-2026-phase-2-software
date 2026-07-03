namespace backend.Models;

public class WorkoutLog
{
    public int Id { get; set; }
    public int WorkoutQuestId { get; set; }
    public int UserProfileId { get; set; }
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
    public int XpEarned { get; set; }
    public string Notes { get; set; } = string.Empty;

    public WorkoutQuest? WorkoutQuest { get; set; }
    public UserProfile? UserProfile { get; set; }
}
