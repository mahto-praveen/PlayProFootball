namespace TournamentDetails.Models
{
    public class MatchScoreDetail
    {
        public long ScoreId { get; set; }

        public long MatchId { get; set; }
        public Match Match { get; set; }

        public long TournamentId { get; set; }
        public Tournament Tournament { get; set; }

        public int TeamId { get; set; }
        public Team Team { get; set; }

        public int GoalsScored { get; set; }
        public int Passes { get; set; }
        public int Fouls { get; set; }
        public int Offside { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
    }
}
