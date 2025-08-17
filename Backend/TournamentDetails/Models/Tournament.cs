using System;
using System.Collections.Generic;

namespace TournamentDetails.Models
{
    public class Tournament
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int StateId { get; set; }
        public string City { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Type { get; set; }
        public int? Oid { get; set; }
        public bool IsPublished { get; set; }
        public DateTime? RegistrationDeadline { get; set; }

        public ICollection<TournamentTeam> TournamentTeams { get; set; }
        public ICollection<Match> Matches { get; set; }
    }
}