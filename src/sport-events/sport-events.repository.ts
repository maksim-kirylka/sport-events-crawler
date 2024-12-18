import { SportEvents } from './sport-events.model';

interface ISportEventsStateRepository {
  getSportEvents(): SportEvents;

  setSportEvents(sportEvents: SportEvents): void;
}

export class SportEventsStateRepository implements ISportEventsStateRepository {
  private sportEventsState: SportEvents = {
    '3eccf850-571f-4e18-8cb3-2c9e3afade7b': {
      id: '3eccf850-571f-4e18-8cb3-2c9e3afade7b',
      status: 'LIVE',
      scores: {
        CURRENT: {
          type: 'CURRENT',
          home: '0',
          away: '0',
        },
      },
      startTime: '2024-03-04T10:36:07.812Z',
      sport: 'FOOTBALL',
      competitors: {
        HOME: {
          type: 'HOME',
          name: 'Juventus',
        },
        AWAY: {
          type: 'AWAY',
          name: 'Paris Saint-Germain',
        },
      },
      competition: 'UEFA Champions League',
    },
  };

  public getSportEvents(): SportEvents {
    return this.sportEventsState;
  }

  public setSportEvents(sportEvents: SportEvents): void {
    this.sportEventsState = sportEvents;
  }
}

export const sportEventsStateRepository = new SportEventsStateRepository();
