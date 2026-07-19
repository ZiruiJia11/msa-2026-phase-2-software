using backend.Models;

namespace backend.Dtos;

public class AchievementResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public AchievementConditionType ConditionType { get; set; }
    public int ConditionValue { get; set; }
    public int XpBonus { get; set; }
    public bool IsUnlocked { get; set; }
    public DateTime? UnlockedAt { get; set; }
}

public class UnlockedAchievementResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public int XpBonus { get; set; }
}
