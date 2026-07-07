using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<WorkoutQuest> WorkoutQuests { get; set; }
    public DbSet<WorkoutLog> WorkoutLogs { get; set; }
    public DbSet<Achievement> Achievements { get; set; }
    public DbSet<UserAchievement> UserAchievements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserProfile>()
            .Property(user => user.Username)
            .HasMaxLength(80);

        modelBuilder.Entity<WorkoutQuest>()
            .Property(quest => quest.Title)
            .HasMaxLength(120);

        modelBuilder.Entity<WorkoutQuest>()
            .Property(quest => quest.Description)
            .HasMaxLength(500);

        modelBuilder.Entity<WorkoutLog>()
            .Property(log => log.Notes)
            .HasMaxLength(500);

        modelBuilder.Entity<Achievement>()
            .Property(achievement => achievement.Name)
            .HasMaxLength(120);

        modelBuilder.Entity<Achievement>()
            .Property(achievement => achievement.Description)
            .HasMaxLength(500);

        modelBuilder.Entity<Achievement>()
            .Property(achievement => achievement.Icon)
            .HasMaxLength(80);

        modelBuilder.Entity<UserAchievement>()
            .HasIndex(userAchievement => new { userAchievement.UserProfileId, userAchievement.AchievementId })
            .IsUnique();

        modelBuilder.Entity<WorkoutLog>()
            .HasOne(log => log.WorkoutQuest)
            .WithMany(quest => quest.WorkoutLogs)
            .HasForeignKey(log => log.WorkoutQuestId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<WorkoutLog>()
            .HasOne(log => log.UserProfile)
            .WithMany(user => user.WorkoutLogs)
            .HasForeignKey(log => log.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserAchievement>()
            .HasOne(userAchievement => userAchievement.UserProfile)
            .WithMany(user => user.UserAchievements)
            .HasForeignKey(userAchievement => userAchievement.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserAchievement>()
            .HasOne(userAchievement => userAchievement.Achievement)
            .WithMany(achievement => achievement.UserAchievements)
            .HasForeignKey(userAchievement => userAchievement.AchievementId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
