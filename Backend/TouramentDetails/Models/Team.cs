using System.Collections.Generic;

namespace TournamentFixtures.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ManagerName { get; set; }
        public string ContactNo { get; set; }

        public ICollection<TournamentTeam> TournamentTeams { get; set; }
    }
}