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

        public async Task<IEnumerable<MatchDto>> GetFixturesAsync(long tournamentId)
        {
            return await _db.Matches
                .Include(m => m.TeamA)
                .Include(m => m.TeamB)
                .Include(m => m.WinnerTeam)
                .Where(m => m.TournamentId == tournamentId)
                .Select(m => new MatchDto(
                    m.Id,
                    m.TeamAId,
                    m.TeamA.Name,
                    m.TeamBId,
                    m.TeamB.Name,
                    m.ScheduledAt,
                    m.MatchType ?? "Unknown",
                    m.Stadium ?? "",
                    m.ScoreA,
                    m.ScoreB,
                    m.Status ?? "UPCOMING",
                    m.WinnerTeamId,
                    m.WinnerTeam != null ? m.WinnerTeam.Name : null
                ))
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
                Stadium = dto.Stadium,
                MatchType = dto.MatchType,
                Status = "UPCOMING",
                ScoreA = 0,
                ScoreB = 0,
                WinnerTeamId = 0
            };


            _db.Matches.Add(match);
            await _db.SaveChangesAsync();

            return await MapToDto(match.Id);
        }

        public async Task<MatchDto> UpdateMatchAsync(long matchId, UpdateMatchDto dto)
        {
            var match = await _db.Matches
                .Include(m => m.TeamA)
                .Include(m => m.TeamB)
                .Include(m => m.WinnerTeam)
                .FirstOrDefaultAsync(m => m.Id == matchId)
                ?? throw new KeyNotFoundException("Match not found");

            match.ScoreA = dto.ScoreA;
            match.ScoreB = dto.ScoreB;
            match.Status = dto.Status;

            // Allow 0 to mean draw (no winner)
            match.WinnerTeamId = dto.WinnerTeamId == 0 ? null : dto.WinnerTeamId;

            await _db.SaveChangesAsync();

            return await MapToDto(matchId);
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

        private async Task<MatchDto> MapToDto(long matchId)
        {
            var m = await _db.Matches
                .Include(x => x.TeamA)
                .Include(x => x.TeamB)
                .Include(x => x.WinnerTeam)
                .FirstAsync(x => x.Id == matchId);

            return new MatchDto(
                m.Id,
                m.TeamAId,
                m.TeamA.Name,
                m.TeamBId,
                m.TeamB.Name,
                m.ScheduledAt,
                m.MatchType ?? "Unknown",
                m.Stadium ?? "",
                m.ScoreA,
                m.ScoreB,
                m.Status ?? "UPCOMING",
                m.WinnerTeamId,
                m.WinnerTeam != null ? m.WinnerTeam.Name : null
            );
        }
    }
}
