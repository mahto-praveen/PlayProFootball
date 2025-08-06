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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map Tournament entity to existing 'tournament' table and columns
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

            // Configure Teams many-to-many
            modelBuilder.Entity<Tournament>()
                .HasMany(t => t.Teams)
                .WithMany(t => t.Tournaments)
                .UsingEntity(j => j.ToTable("TournamentTeams"));

            // Configure Matches one-to-many
            modelBuilder.Entity<Tournament>()
                .HasMany(t => t.Matches)
                .WithOne(m => m.Tournament)
                .HasForeignKey(m => m.TournamentId);

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
        }
    }
}