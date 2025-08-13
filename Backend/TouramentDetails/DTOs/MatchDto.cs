namespace TournamentDetails.DTOs
{
    public record MatchDto(
    long Id,
    long TeamAId,
    string TeamAName,
    long TeamBId,
    string TeamBName,
    DateTime ScheduledAt,
    string MatchType,
    string Stadium,
    int ScoreA,
    int ScoreB,
    string Status,
    string WinnerName
);

}
