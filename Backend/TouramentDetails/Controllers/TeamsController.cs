using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TournamentFixtures.Data;
using TournamentFixtures.DTOs;
using TournamentFixtures.Models;

namespace TournamentFixtures.Controllers
{
    [ApiController]
    [Route("api/tournaments/{tournamentId}/teams")]
    public class TeamsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TeamsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<TeamDto>> GetTeams(long tournamentId)
        {
            var tournament = await _db.Tournaments
                .Include(t => t.TournamentTeams)
                    .ThenInclude(tt => tt.Team)
                .FirstOrDefaultAsync(t => t.Id == tournamentId)
                ?? throw new KeyNotFoundException("Tournament not found");

            return tournament.TournamentTeams
                .Select(tt => tt.Team)
                .Select(x => new TeamDto(x.Id, x.Name, x.ManagerName, x.ContactNo));
        }

        [HttpPost]
        public async Task<TeamDto> AddTeam(long tournamentId, [FromBody] TeamDto dto)
        {
            var tournament = await _db.Tournaments
                .Include(t => t.TournamentTeams)
                .FirstOrDefaultAsync(t => t.Id == tournamentId)
                ?? throw new KeyNotFoundException("Tournament not found");

            var team = new Team
            {
                Name = dto.Name,
                ManagerName = dto.ManagerName,
                ContactNo = dto.ContactNo
            };

            _db.Teams.Add(team);
            await _db.SaveChangesAsync(); // Save to get Team.Id

            var tournamentTeam = new TournamentTeam
            {
                TournamentId = tournamentId,
                TeamId = team.Id
            };

            _db.Set<TournamentTeam>().Add(tournamentTeam);
            await _db.SaveChangesAsync();

            return new TeamDto(team.Id, team.Name, team.ManagerName, team.ContactNo);
        }

        [HttpDelete("{teamId}")]
        public async Task RemoveTeam(long tournamentId, int teamId)
        {
            var tt = await _db.Set<TournamentTeam>()
                .FirstOrDefaultAsync(x => x.TournamentId == tournamentId && x.TeamId == teamId)
                ?? throw new KeyNotFoundException("Team not found in tournament");

            _db.Set<TournamentTeam>().Remove(tt);
            await _db.SaveChangesAsync();
        }
    }
}
