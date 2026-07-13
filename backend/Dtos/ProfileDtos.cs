namespace backend.Dtos;

public class ProfileSummaryResponse
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public int TotalXp { get; set; }
    public int Level { get; set; }
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public DateOnly? LastCompletedDate { get; set; }
    public int CompletedWorkoutCount { get; set; }
    public int XpForCurrentLevel { get; set; }
    public int XpForNextLevel { get; set; }
    public int XpIntoCurrentLevel { get; set; }
}
