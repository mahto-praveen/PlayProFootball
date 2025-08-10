using Microsoft.AspNetCore.Mvc;
using TournamentDetails.DTOs;
using TournamentDetails.Services;

namespace TournamentFixtures.Controllers
{
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly IMatchService _svc;
        public MatchesController(IMatchService svc) => _svc = svc;

        [HttpGet("api/tournaments/{tournamentId}/matches")]
        public Task<IEnumerable<MatchDto>> GetFixtures(long tournamentId)
            => _svc.GetFixturesAsync(tournamentId);

        [HttpPost("api/tournaments/{tournamentId}/matches")]
        public Task<MatchDto> Create(long tournamentId, [FromBody] CreateMatchDto dto)
            => _svc.CreateMatchAsync(tournamentId, dto);

        [HttpPut("api/matches/{matchId}")]
        public Task<MatchDto> Update(long matchId, [FromBody] UpdateMatchDto dto)
            => _svc.UpdateMatchAsync(matchId, dto);

        [HttpGet("api/tournaments/{tournamentId}/standings")]
        public Task<IEnumerable<StandingDto>> Standings(long tournamentId)
            => _svc.GetStandingsAsync(tournamentId);
    }
}