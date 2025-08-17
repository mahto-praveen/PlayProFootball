using System;

namespace TournamentDetails.DTOs
{
    public record CreateMatchDto(
        int TeamAId,
        int TeamBId,
        DateTime ScheduledAt,
        string Stadium,       
        string MatchType      
    );
}
