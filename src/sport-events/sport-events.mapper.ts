import {
  CompetitorType,
  SportCompetition,
  SportEvent,
  SportEventStatus,
} from './sport-events.model';

export const decodeMappings = (mappings: string): Record<string, string> => {
  return mappings
    .split(';')
    .map((mapping) => mapping.split(':'))
    .reduce((acc, [id, data]) => ({ ...acc, [id]: data }), {});
};

export const decodeSportEventsState = (
  odds: string,
  decodedMappings: Record<string, string>
): SportEvent[] => {
  const events = odds
    .split('\n')
    .filter(Boolean)
    .map((eventData: string) => {
      const [
        eventId,
        sportId,
        competitionId,
        startTime = '',
        homeCompetitorId,
        awayCompetitorId,
        sportEventStatusId,
        scoresDecoded = '',
      ] = eventData.split(',');

      const scores = scoresDecoded
        .split('|')
        .filter(Boolean)
        .map((score) => score.split('@'))
        .map(([period, score]) => {
          const [home, away] = score.split(':');
          return [period, home, away];
        })
        .reduce((acc, [period, home, away]) => {
          const type = decodedMappings[period];
          acc[type] = { type, home, away };
          return acc;
        }, {});

      return {
        id: eventId,
        status: decodedMappings[sportEventStatusId] as SportEventStatus,
        scores,
        startTime: startTime ? new Date(parseInt(startTime)).toISOString() : '',
        sport: decodedMappings[sportId] as SportCompetition,
        competitors: {
          HOME: {
            type: 'HOME' as CompetitorType,
            name: decodedMappings[homeCompetitorId],
          },
          AWAY: {
            type: 'AWAY' as CompetitorType,
            name: decodedMappings[awayCompetitorId],
          },
        },
        competition: decodedMappings[competitionId],
      };
    });

  return events;
};
