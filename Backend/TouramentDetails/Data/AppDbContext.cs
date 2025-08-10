using Microsoft.EntityFrameworkCore;
using TournamentDetails.Models;

namespace TournamentDetails.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<TournamentTeam> TournamentTeams { get; set; }
        public DbSet<MatchScoreDetail> MatchScoreDetails { get; set; }  

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

            // Team table mapping
            modelBuilder.Entity<Team>(entity =>
            {
                entity.ToTable("teams");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.ManagerName).HasColumnName("managerName");
                entity.Property(e => e.ContactNo).HasColumnName("contactNo");
            });

            // Match table mapping with new fields
            modelBuilder.Entity<Match>(entity =>
            {
                entity.ToTable("matches");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.TournamentId).HasColumnName("TournamentId");
                entity.Property(e => e.TeamAId).HasColumnName("TeamAId");
                entity.Property(e => e.TeamBId).HasColumnName("TeamBId");
                entity.Property(e => e.ScheduledAt).HasColumnName("ScheduledAt");
                entity.Property(e => e.Stadium).HasColumnName("Stadium");           
                entity.Property(e => e.MatchType).HasColumnName("MatchType");       
                entity.Property(e => e.ScoreA).HasColumnName("ScoreA");
                entity.Property(e => e.ScoreB).HasColumnName("ScoreB");
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.WinnerTeamId).HasColumnName("WinnerTeamId"); 
            });

            // Foreign key for WinnerTeamId
            modelBuilder.Entity<Match>()
                .HasOne(m => m.WinnerTeam)
                .WithMany()
                .HasForeignKey(m => m.WinnerTeamId)
                .OnDelete(DeleteBehavior.Restrict);

            // Foreign keys for TeamA and TeamB
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

            // Foreign key for Tournament in Match
            modelBuilder.Entity<Match>()
                .HasOne(m => m.Tournament)
                .WithMany(t => t.Matches)
                .HasForeignKey(m => m.TournamentId);

            // MatchScoreDetail table mapping (new)
            modelBuilder.Entity<MatchScoreDetail>(entity =>
            {
                entity.ToTable("match_score_details");
                entity.HasKey(e => e.ScoreId);

                entity.Property(e => e.ScoreId).HasColumnName("ScoreId");
                entity.Property(e => e.MatchId).HasColumnName("MatchId");
                entity.Property(e => e.TournamentId).HasColumnName("TournamentId");
                entity.Property(e => e.TeamId).HasColumnName("TeamId");
                entity.Property(e => e.GoalsScored).HasColumnName("GoalsScored");
                entity.Property(e => e.Passes).HasColumnName("Passes");
                entity.Property(e => e.Fouls).HasColumnName("Fouls");
                entity.Property(e => e.Offside).HasColumnName("Offside");
                entity.Property(e => e.YellowCards).HasColumnName("YellowCards");
                entity.Property(e => e.RedCards).HasColumnName("RedCards");

                entity.HasOne(msd => msd.Match)
                    .WithMany()
                    .HasForeignKey(msd => msd.MatchId);

                entity.HasOne(msd => msd.Tournament)
                    .WithMany()
                    .HasForeignKey(msd => msd.TournamentId);

                entity.HasOne(msd => msd.Team)
                    .WithMany()
                    .HasForeignKey(msd => msd.TeamId);
            });

            // TournamentTeam many-to-many mapping
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
