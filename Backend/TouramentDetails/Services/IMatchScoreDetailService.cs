using System.Collections.Generic;
using System.Threading.Tasks;
using TournamentDetails.DTOs;

namespace TournamentDetails.Services
{
    public interface IMatchScoreDetailService
    {
        Task<IEnumerable<MatchScoreDetailDto>> GetByMatchIdAsync(long matchId);
        Task<MatchScoreDetailDto> CreateAsync(MatchScoreDetailDto scoreDto);
        Task<bool> DeleteAsync(long scoreId);
    }
}
