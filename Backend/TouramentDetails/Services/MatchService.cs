using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TournamentDetails.Data;
using TournamentDetails.DTOs;
using TournamentDetails.Models;
using TournamentDetails.Utils;

namespace TournamentDetails.Services
{
    public class MatchService : IMatchService
    {
        private readonly AppDbContext _db;

        public MatchService(AppDbContext db) => _db = db;

        private string GetWinnerName(Match match)
        {
            if (match.ScoreA > match.ScoreB) return match.TeamA?.Name;
            if (match.ScoreB > match.ScoreA) return match.TeamB?.Name;
            return "Draw";
        }

        public async Task<IEnumerable<MatchDto>> GetFixturesAsync(long tournamentId)
        {
            var matches = await _db.Matches
                .Include(m => m.TeamA)
                .Include(m => m.TeamB)
                .Where(m => m.TournamentId == tournamentId)
                .ToListAsync();

            return matches.Select(m => new MatchDto(
                m.Id,
                m.TeamAId,
                m.TeamA?.Name,
                m.TeamBId,
                m.TeamB?.Name,
                m.ScheduledAt,
                m.MatchType ?? "Unknown",
                m.Stadium ?? "",
                m.ScoreA ?? 0,
                m.ScoreB ?? 0,
                m.Status ?? "UPCOMING",
                GetWinnerName(m)
            ));
        }

        public async Task<MatchDto> CreateMatchAsync(long tournamentId, CreateMatchDto dto)
        {
            var match = new Match
            {
                TournamentId = tournamentId,
                TeamAId = dto.TeamAId,
                TeamBId = dto.TeamBId,
                ScheduledAt = dto.ScheduledAt,
                Stadium = dto.Stadium,
                MatchType = dto.MatchType,
                Status = "UPCOMING",
                ScoreA = 0,
                ScoreB = 0
            };

            _db.Matches.Add(match);
            await _db.SaveChangesAsync();

            await _db.Entry(match).Reference(m => m.TeamA).LoadAsync();
            await _db.Entry(match).Reference(m => m.TeamB).LoadAsync();

            return new MatchDto(
                match.Id,
                match.TeamAId,
                match.TeamA?.Name,
                match.TeamBId,
                match.TeamB?.Name,
                match.ScheduledAt,
                match.MatchType ?? "Unknown",
                match.Stadium ?? "",
                match.ScoreA ?? 0,
                match.ScoreB ?? 0,
                match.Status ?? "UPCOMING",
                GetWinnerName(match)
            );
        }

        public async Task<MatchDto> UpdateMatchAsync(long matchId, UpdateMatchDto dto)
        {
            var match = await _db.Matches
                .Include(m => m.TeamA)
                .Include(m => m.TeamB)
                .FirstOrDefaultAsync(m => m.Id == matchId)
                ?? throw new KeyNotFoundException("Match not found");

            match.ScoreA = dto.ScoreA;
            match.ScoreB = dto.ScoreB;
            match.Status = dto.Status;

            await _db.SaveChangesAsync();

            return new MatchDto(
                match.Id,
                match.TeamAId,
                match.TeamA?.Name,
                match.TeamBId,
                match.TeamB?.Name,
                match.ScheduledAt,
                match.MatchType ?? "Unknown",
                match.Stadium ?? "",
                match.ScoreA ?? 0,
                match.ScoreB ?? 0,
                match.Status ?? "UPCOMING",
                GetWinnerName(match)
            );
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
