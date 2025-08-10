namespace TournamentDetails.DTOs
{
    public record MatchDto(
        long Id,
        int TeamAId,
        string TeamAName,
        int TeamBId,
        string TeamBName,
        DateTime ScheduledAt,
        string MatchType,
        string Stadium,
        int? ScoreA,
        int? ScoreB,
        string Status,
        int? WinnerTeamId,
        string? WinnerTeamName
    );
}
