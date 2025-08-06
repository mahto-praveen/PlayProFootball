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
        public TeamsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IEnumerable<TeamDto>> GetTeams(long tournamentId)
        {
            var t = await _db.Tournaments.Include(t => t.Teams)
                           .FirstOrDefaultAsync(t => t.Id == tournamentId)
                       ?? throw new KeyNotFoundException("Tournament not found");
            return t.Teams.Select(x => new TeamDto(x.Id, x.Name, x.ManagerName, x.ContactNo));
        }

        [HttpPost]
        public async Task<TeamDto> AddTeam(long tournamentId, [FromBody] TeamDto dto)
        {
            var tournament = await _db.Tournaments.Include(t => t.Teams)
                                     .FirstOrDefaultAsync(t => t.Id == tournamentId)
                                 ?? throw new KeyNotFoundException("Tournament not found");
            var team = new Team { Name = dto.Name, ManagerName = dto.ManagerName, ContactNo = dto.ContactNo };
            _db.Teams.Add(team);
            tournament.Teams.Add(team);
            await _db.SaveChangesAsync();
            return new TeamDto(team.Id, team.Name, team.ManagerName, team.ContactNo);
        }

        [HttpDelete("{teamId}")]
        public async Task RemoveTeam(long tournamentId, int teamId)
        {
            var tournament = await _db.Tournaments.Include(t => t.Teams)
                                     .FirstOrDefaultAsync(t => t.Id == tournamentId)
                                 ?? throw new KeyNotFoundException("Tournament not found");
            var team = tournament.Teams.FirstOrDefault(x => x.Id == teamId)
                       ?? throw new KeyNotFoundException("Team not found in tournament");
            tournament.Teams.Remove(team);
            await _db.SaveChangesAsync();
        }
    }
}