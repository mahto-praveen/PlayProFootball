using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TournamentDetails.Data;
using TournamentDetails.DTOs;
using TournamentDetails.Models;
using TournamentDetails.Services;

namespace TournamentDetails.Services
{
    public class MatchScoreDetailService : IMatchScoreDetailService
    {
        private readonly AppDbContext _context;

        public MatchScoreDetailService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MatchScoreDetailDto>> GetByMatchIdAsync(long matchId)
        {
            return await _context.MatchScoreDetails
                .Where(msd => msd.MatchId == matchId)
                .Select(msd => new MatchScoreDetailDto(
                    msd.ScoreId,
                    msd.MatchId,
                    msd.TournamentId,
                    msd.TeamId,
                    msd.GoalsScored,
                    msd.Passes,
                    msd.Fouls,
                    msd.Offside,
                    msd.YellowCards,
                    msd.RedCards
                ))
                .ToListAsync();
        }

        public async Task<MatchScoreDetailDto> CreateAsync(MatchScoreDetailDto dto)
        {
            var entity = new MatchScoreDetail
            {
                MatchId = dto.MatchId,
                TournamentId = dto.TournamentId,
                TeamId = dto.TeamId,
                GoalsScored = dto.GoalsScored,
                Passes = dto.Passes,
                Fouls = dto.Fouls,
                Offside = dto.Offside,
                YellowCards = dto.YellowCards,
                RedCards = dto.RedCards
            };

            _context.MatchScoreDetails.Add(entity);
            await _context.SaveChangesAsync();

            dto = dto with { ScoreId = entity.ScoreId }; // update with generated ID
            return dto;
        }

        public async Task<bool> DeleteAsync(long scoreId)
        {
            var entity = await _context.MatchScoreDetails.FindAsync(scoreId);
            if (entity == null) return false;

            _context.MatchScoreDetails.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
