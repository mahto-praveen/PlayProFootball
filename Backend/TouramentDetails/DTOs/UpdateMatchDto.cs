namespace TournamentFixtures.DTOs
{
    public record UpdateMatchDto(
        int? ScoreA,
        int? ScoreB,
        string Status);
}