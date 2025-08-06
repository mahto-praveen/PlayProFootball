using TournamentFixtures.Models;

public class TournamentTeam
{
    public long TournamentId { get; set; }
    public Tournament Tournament { get; set; }

    public int TeamId { get; set; }
    public Team Team { get; set; }
}
