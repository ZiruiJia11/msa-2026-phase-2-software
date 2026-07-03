namespace backend.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public int TotalXp { get; set; }
    public int Level { get; set; } = 1;
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public DateOnly? LastCompletedDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<WorkoutLog> WorkoutLogs { get; set; } = [];
    public List<UserAchievement> UserAchievements { get; set; } = [];
}
