using Microsoft.EntityFrameworkCore;
using TournamentFixtures.Models;

namespace TournamentFixtures.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<TournamentTeam> TournamentTeams { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Tournament table mapping
            modelBuilder.Entity<Tournament>(entity =>
            {
                entity.ToTable("tournament");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.StateId).HasColumnName("state_id");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.StartDate).HasColumnName("start_date");
                entity.Property(e => e.EndDate).HasColumnName("end_date");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Type).HasColumnName("type");
                entity.Property(e => e.Oid).HasColumnName("oid");
                entity.Property(e => e.IsPublished).HasColumnName("isPublished");
                entity.Property(e => e.RegistrationDeadline).HasColumnName("registration_deadline");
            });

            // Team table mapping (optional if table name = class name and default conventions used)
            modelBuilder.Entity<Team>(entity =>
            {
                entity.ToTable("teams");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
            });

            // Match table mapping
            modelBuilder.Entity<Match>(entity =>
            {
                entity.ToTable("matches");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.TournamentId).HasColumnName("tournament_id");
                entity.Property(e => e.TeamAId).HasColumnName("team_a_id");
                entity.Property(e => e.TeamBId).HasColumnName("team_b_id");
                entity.Property(e => e.ScheduledAt).HasColumnName("ScheduledAt");
                entity.Property(e => e.ScoreA).HasColumnName("score_a");
                entity.Property(e => e.ScoreB).HasColumnName("score_b");
            });

            // Match foreign keys (TeamA and TeamB)
            modelBuilder.Entity<Match>()
                .HasOne(m => m.TeamA)
                .WithMany()
                .HasForeignKey(m => m.TeamAId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.TeamB)
                .WithMany()
                .HasForeignKey(m => m.TeamBId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Tournament)
                .WithMany(t => t.Matches)
                .HasForeignKey(m => m.TournamentId);

            //  Explicit Many-to-Many via TournamentTeam
            modelBuilder.Entity<TournamentTeam>()
                .ToTable("TournamentTeams")
                .HasKey(tt => new { tt.TournamentId, tt.TeamId });

            modelBuilder.Entity<TournamentTeam>()
                .HasOne(tt => tt.Tournament)
                .WithMany(t => t.TournamentTeams)
                .HasForeignKey(tt => tt.TournamentId);

            modelBuilder.Entity<TournamentTeam>()
                .HasOne(tt => tt.Team)
                .WithMany(t => t.TournamentTeams)
                .HasForeignKey(tt => tt.TeamId);
        }
    }
}
