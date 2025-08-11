using System;

namespace TournamentDetails.Models
{
    public class Match
    {
        public long Id { get; set; }
        public long TournamentId { get; set; }
        public Tournament Tournament { get; set; }

        public int TeamAId { get; set; }
        public Team TeamA { get; set; }

        public int TeamBId { get; set; }
        public Team TeamB { get; set; }

        public DateTime ScheduledAt { get; set; }
        public string Stadium { get; set; }         

        public string MatchType { get; set; }       

        public int? ScoreA { get; set; }
        public int? ScoreB { get; set; }
        public string Status { get; set; }

    }
}
