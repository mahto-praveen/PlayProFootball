using System;

namespace TournamentFixtures.DTOs
{
    public record MatchDto(
        long Id,
        int TeamAId,
        int TeamBId,
        DateTime ScheduledAt,
        int? ScoreA,
        int? ScoreB,
        string Status);
}