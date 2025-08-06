using System;

namespace TournamentFixtures.DTOs
{
    public record CreateMatchDto(
        int TeamAId,
        int TeamBId,
        DateTime ScheduledAt);
}