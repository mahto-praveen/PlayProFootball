namespace TournamentDetails.DTOs
{
    public record UpdateMatchDto(
        int? ScoreA,
        int? ScoreB,
        string Status,
        string Stadium,       
        string MatchType,     
        int? WinnerTeamId     
    );
}
