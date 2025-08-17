using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TournamentDetails.DTOs;
using TournamentDetails.Services;

namespace TournamentDetails.Controllers
{
    [ApiController]
    [Route("api/matches/{matchId}/scores")]
    public class MatchScoreDetailController : ControllerBase
    {
        private readonly IMatchScoreDetailService _scoreService;

        public MatchScoreDetailController(IMatchScoreDetailService scoreService)
        {
            _scoreService = scoreService;
        }

        // GET: api/matches/1/scores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchScoreDetailDto>>> GetMatchScores(long matchId)
        {
            var scores = await _scoreService.GetByMatchIdAsync(matchId);
            return Ok(scores);
        }

        // POST: api/matches/1/scores
        [HttpPost]
        public async Task<ActionResult<MatchScoreDetailDto>> CreateMatchScore(long matchId, [FromBody] MatchScoreDetailDto dto)
        {
            if (matchId != dto.MatchId)
                return BadRequest("Match ID in URL and body do not match.");

            var created = await _scoreService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetMatchScores), new { matchId = dto.MatchId }, created);
        }

        // DELETE: api/matches/1/scores/5
        [HttpDelete("{scoreId}")]
        public async Task<IActionResult> DeleteScore(long scoreId)
        {
            var deleted = await _scoreService.DeleteAsync(scoreId);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
