import { beforeEach, describe, it, expect, vi } from 'vitest';
import {
  decodeMappings,
  decodeSportEventsState,
} from '../../../src/sport-events/sport-events.mapper';
import { decodedMappings } from '../../mocks/mappings';

describe('Sport events mappers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('decodeMappings', () => {
    it('should return an empty object when given an empty string', () => {
      const mappings = '';
      const decoded = decodeMappings(mappings);

      expect(decoded).toEqual({});
    });

    it('should decode mappings correctly', () => {
      const mappings = `317652c6-5804-407e-815c-98cd4ff9f47d:Real Madrid;5e379a6c-15f9-4c16-86dd-266e8fa73711:Barcelona;46d3e410-923e-4ba3-89a6-1ddf2e8d7e82:Manchester United;98a4ccfd-55eb-49f3-b1a1-43b4913b27df:Liverpool;`;
      const expected = {
        '317652c6-5804-407e-815c-98cd4ff9f47d': 'Real Madrid',
        '5e379a6c-15f9-4c16-86dd-266e8fa73711': 'Barcelona',
        '46d3e410-923e-4ba3-89a6-1ddf2e8d7e82': 'Manchester United',
        '98a4ccfd-55eb-49f3-b1a1-43b4913b27df': 'Liverpool',
      };

      const decoded = decodeMappings(mappings);

      expect(decoded).toEqual(expected);
    });
  });

  describe('decodeSportEventsState', () => {
    it('should return an empty SportEvents object for empty inputs', () => {
      const odds = '';
      const mappings = {};

      const decoded = decodeSportEventsState(odds, mappings);

      expect(decoded).toEqual([]);
    });

    it('should decode sport events state correctly', () => {
      const odds =
        '5405c790-6c8a-41f6-9080-01799a11549a,5c1a17cf-1676-42da-8e4a-30191c6bc5f6,320b327f-b5fb-4baa-9fb2-3cd962e50d16,1734554967143,1654eaa2-4df3-4353-a971-8869797afcca,a1a4283d-b257-41a2-be16-094705bc377c,c9d1092b-8f2e-4fe4-8b80-b996bbe35730,69c59243-68dc-4663-8b62-c228f27812c0@8:8|ad07a6c0-5dc3-4d9d-8407-ffe653fdf4f5@4:5|2850942c-5553-4f48-af8f-10274cfa0077@4:3\nf5b75b6d-7be3-4399-9cc1-27c6d250683f,5c1a17cf-1676-42da-8e4a-30191c6bc5f6,320b327f-b5fb-4baa-9fb2-3cd962e50d16,1734554957862,57401195-28c2-4b6b-b440-92b4f5e6054c,f65aee22-588f-43f8-b836-af53a4324cb1,c9d1092b-8f2e-4fe4-8b80-b996bbe35730,69c59243-68dc-4663-8b62-c228f27812c0@10:9|ad07a6c0-5dc3-4d9d-8407-ffe653fdf4f5@8:5|2850942c-5553-4f48-af8f-10274cfa0077@2:4';
      const decoded = decodeSportEventsState(odds, decodedMappings);

      const expected = [
        {
          id: '5405c790-6c8a-41f6-9080-01799a11549a',
          status: 'LIVE',
          scores: {
            CURRENT: { type: 'CURRENT', home: '8', away: '8' },
            PERIOD_1: { type: 'PERIOD_1', home: '4', away: '5' },
            PERIOD_2: { type: 'PERIOD_2', home: '4', away: '3' },
          },
          startTime: '2024-12-18T20:49:27.143Z',
          sport: 'FOOTBALL',
          competitors: {
            HOME: {
              type: 'HOME',
              name: 'Real Madrid',
            },
            AWAY: {
              type: 'AWAY',
              name: 'Liverpool',
            },
          },
          competition: 'UEFA Champions League',
        },
        {
          id: 'f5b75b6d-7be3-4399-9cc1-27c6d250683f',
          status: 'LIVE',
          scores: {
            CURRENT: { type: 'CURRENT', home: '10', away: '9' },
            PERIOD_1: { type: 'PERIOD_1', home: '8', away: '5' },
            PERIOD_2: { type: 'PERIOD_2', home: '2', away: '4' },
          },
          startTime: '2024-12-18T20:49:17.862Z',
          sport: 'FOOTBALL',
          competitors: {
            HOME: {
              type: 'HOME',
              name: 'Juventus',
            },
            AWAY: {
              type: 'AWAY',
              name: 'Barcelona',
            },
          },
          competition: 'UEFA Champions League',
        },
      ];

      expect(decoded).toEqual(expected);
    });
  });
});
