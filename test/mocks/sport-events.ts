import { SportEvents } from '../../src/sport-events/sport-events.model';

export const relevantSportEvents: SportEvents = {
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
  '4eccf850-571f-4e18-8cb3-2c9e3afade7a': {
    id: '4eccf850-571f-4e18-8cb3-2c9e3afade7a',
    status: 'PRE',
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
        name: 'Milan',
      },
      AWAY: {
        type: 'AWAY',
        name: 'Marseille',
      },
    },
    competition: 'UEFA Champions League',
  },
};

export const sportEvents: SportEvents = {
  ...relevantSportEvents,
  '5eccf850-571f-4e18-8cb3-2c9e3afade7c': {
    id: '5eccf850-571f-4e18-8cb3-2c9e3afade7c',
    status: 'REMOVED',
    scores: {
      CURRENT: {
        type: 'CURRENT',
        home: '1',
        away: '2',
      },
    },
    startTime: '2024-03-04T10:36:07.812Z',
    sport: 'FOOTBALL',
    competitors: {
      HOME: {
        type: 'HOME',
        name: 'Roma',
      },
      AWAY: {
        type: 'AWAY',
        name: 'Nantes',
      },
    },
    competition: 'UEFA Champions League',
  },
};
