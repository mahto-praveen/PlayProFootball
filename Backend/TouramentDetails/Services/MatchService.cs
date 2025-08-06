using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TournamentFixtures.Data;
using TournamentFixtures.DTOs;
using TournamentFixtures.Models;
using TournamentFixtures.Utils;

namespace TournamentFixtures.Services
{
    public class MatchService : IMatchService
    {
        private readonly AppDbContext _db;

        public MatchService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<MatchDto>> GetFixturesAsync(long tournamentId)
        {
            return await _db.Matches
                .Where(m => m.TournamentId == tournamentId)
                .Select(m => new MatchDto(
                    m.Id, m.TeamAId, m.TeamBId, m.ScheduledAt, m.ScoreA, m.ScoreB, m.Status))
                .ToListAsync();
        }

        public async Task<MatchDto> CreateMatchAsync(long tournamentId, CreateMatchDto dto)
        {
            var match = new Match
            {
                TournamentId = tournamentId,
                TeamAId = dto.TeamAId,
                TeamBId = dto.TeamBId,
                ScheduledAt = dto.ScheduledAt,
                Status = "UPCOMING"
            };
            _db.Matches.Add(match);
            await _db.SaveChangesAsync();
            return new MatchDto(match.Id, match.TeamAId, match.TeamBId, match.ScheduledAt, match.ScoreA, match.ScoreB, match.Status);
        }

        public async Task<MatchDto> UpdateMatchAsync(long matchId, UpdateMatchDto dto)
        {
            var match = await _db.Matches.FindAsync(matchId) ??
                throw new KeyNotFoundException("Match not found");

            match.ScoreA = dto.ScoreA;
            match.ScoreB = dto.ScoreB;
            match.Status = dto.Status;
            await _db.SaveChangesAsync();

            return new MatchDto(match.Id, match.TeamAId, match.TeamBId, match.ScheduledAt, match.ScoreA, match.ScoreB, match.Status);
        }

        public async Task<IEnumerable<StandingDto>> GetStandingsAsync(long tournamentId)
        {
            var matches = await _db.Matches
                .Include(m => m.TeamA)
                .Include(m => m.TeamB)
                .Where(m => m.TournamentId == tournamentId && m.Status == "COMPLETED")
                .ToListAsync();

            return StandingsCalculator.Calculate(matches);
        }
    }
}