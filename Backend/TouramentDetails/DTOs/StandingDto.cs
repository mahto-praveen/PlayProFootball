namespace TournamentFixtures.DTOs
{
    public record StandingDto(
        int TeamId,
        string TeamName,
        int Played,
        int Won,
        int Drawn,
        int Lost,
        int GoalsFor,
        int GoalsAgainst,
        int Points);
}