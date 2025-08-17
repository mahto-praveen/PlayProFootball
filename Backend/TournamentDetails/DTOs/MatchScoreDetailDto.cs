namespace TournamentDetails.DTOs
{
    public record MatchScoreDetailDto(
        long ScoreId,
        long MatchId,
        long TournamentId,
        int TeamId,
        int GoalsScored,
        int Passes,
        int Fouls,
        int Offside,
        int YellowCards,
        int RedCards
    );
}
