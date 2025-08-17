using System.Collections.Generic;
using System.Threading.Tasks;
using TournamentDetails.DTOs;

namespace TournamentDetails.Services
{
    public interface IMatchService
    {
        Task<IEnumerable<MatchDto>> GetFixturesAsync(long tournamentId);
        Task<MatchDto> CreateMatchAsync(long tournamentId, CreateMatchDto dto);
        Task<MatchDto> UpdateMatchAsync(long matchId, UpdateMatchDto dto);
        Task<IEnumerable<StandingDto>> GetStandingsAsync(long tournamentId);
    }
}