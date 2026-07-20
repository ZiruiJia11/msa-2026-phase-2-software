using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddOpenApi();
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("api", limiterOptions =>
    {
        limiterOptions.PermitLimit = 60;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=fitquest.db";
EnsureSqliteDirectoryExists(connectionString);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:5173"];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    SeedAchievements(db);
}

if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseCors();
app.UseRateLimiter();
app.UseAuthorization();

app.MapOpenApi();
app.MapScalarApiReference();
app.MapControllers().RequireRateLimiting("api");

app.Run();

static void SeedAchievements(AppDbContext db)
{
    if (db.Achievements.Any())
    {
        return;
    }

    db.Achievements.AddRange(
        new Achievement
        {
            Name = "First Quest",
            Description = "Complete your first workout quest.",
            Icon = "spark",
            ConditionType = AchievementConditionType.FirstWorkout,
            ConditionValue = 1,
            XpBonus = 25
        },
        new Achievement
        {
            Name = "3-Day Streak",
            Description = "Build a three day workout streak.",
            Icon = "streak",
            ConditionType = AchievementConditionType.StreakDays,
            ConditionValue = 3,
            XpBonus = 75
        },
        new Achievement
        {
            Name = "Quest Regular",
            Description = "Complete five workout quests.",
            Icon = "medal",
            ConditionType = AchievementConditionType.TotalCompletions,
            ConditionValue = 5,
            XpBonus = 100
        },
        new Achievement
        {
            Name = "XP Climber",
            Description = "Reach 250 total XP.",
            Icon = "bolt",
            ConditionType = AchievementConditionType.TotalXp,
            ConditionValue = 250,
            XpBonus = 100
        });

    db.SaveChanges();
}

static void EnsureSqliteDirectoryExists(string connectionString)
{
    var dataSource = new SqliteConnectionStringBuilder(connectionString).DataSource;

    if (string.IsNullOrWhiteSpace(dataSource) || dataSource.Equals(":memory:", StringComparison.OrdinalIgnoreCase))
    {
        return;
    }

    var directory = Path.GetDirectoryName(Path.GetFullPath(dataSource));
    if (!string.IsNullOrWhiteSpace(directory))
    {
        Directory.CreateDirectory(directory);
    }
}
