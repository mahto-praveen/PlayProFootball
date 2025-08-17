using System.Collections.Generic;
using System.Linq;
using TournamentDetails.DTOs;
using TournamentDetails.Models;

namespace TournamentDetails.Utils
{
    public static class StandingsCalculator
    {
        public static IEnumerable<StandingDto> Calculate(IEnumerable<Match> matches)
        {
            var table = new Dictionary<int, StandingDto>();
            void Ensure(int id, string name)
            {
                if (!table.ContainsKey(id))
                    table[id] = new StandingDto(id, name, 0, 0, 0, 0, 0, 0, 0);
            }

            foreach (var m in matches)
            {
                Ensure(m.TeamAId, m.TeamA.Name);
                Ensure(m.TeamBId, m.TeamB.Name);

                var a = table[m.TeamAId];
                var b = table[m.TeamBId];
                int gfA = m.ScoreA ?? 0;
                int gfB = m.ScoreB ?? 0;

                a = a with { Played = a.Played + 1, GoalsFor = a.GoalsFor + gfA, GoalsAgainst = a.GoalsAgainst + gfB };
                b = b with { Played = b.Played + 1, GoalsFor = b.GoalsFor + gfB, GoalsAgainst = b.GoalsAgainst + gfA };

                if (gfA > gfB)
                {
                    a = a with { Won = a.Won + 1, Points = a.Points + 3 };
                    b = b with { Lost = b.Lost + 1 };
                }
                else if (gfB > gfA)
                {
                    b = b with { Won = b.Won + 1, Points = b.Points + 3 };
                    a = a with { Lost = a.Lost + 1 };
                }
                else
                {
                    a = a with { Drawn = a.Drawn + 1, Points = a.Points + 1 };
                    b = b with { Drawn = b.Drawn + 1, Points = b.Points + 1 };
                }

                table[m.TeamAId] = a;
                table[m.TeamBId] = b;
            }

            return table.Values
                .OrderByDescending(s => s.Points)
                .ThenByDescending(s => s.GoalsFor - s.GoalsAgainst);
        }
    }
}