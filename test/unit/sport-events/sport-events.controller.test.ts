import { beforeEach, describe, it, expect, vi } from 'vitest';
import { IncomingMessage, ServerResponse } from 'http';
import { getSportEventsState } from '../../../src/sport-events/sport-events.controller';
import * as sportEventsService from '../../../src/sport-events/sport-events.service';
import { sportEvents } from '../../mocks/sport-events';

describe('sport-events api tests', () => {
  describe('getSportEventsState - /client/state', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return sport events excluding removed sport events', async () => {
      const mockReq = {} as IncomingMessage;
      const mockRes = {
        writeHead: vi.fn(),
        end: vi.fn(),
      } as unknown as ServerResponse;

      const mockGetCurrentSportEvents = vi
        .spyOn(sportEventsService, 'getCurrentSportEvents')
        .mockResolvedValue(sportEvents);

      const activeSportEvents = Object.keys(sportEvents)
        .filter((key) => sportEvents[key].status !== 'REMOVED')
        .reduce((acc, key) => ({ ...acc, [key]: sportEvents[key] }), {});

      await getSportEventsState(mockReq, mockRes);

      expect(mockGetCurrentSportEvents).toHaveBeenCalledTimes(1);
      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      });

      expect(mockRes.end).toHaveBeenCalledWith(
        JSON.stringify(activeSportEvents)
      );
    });

    it('should return empty sport events when no events available', async () => {
      const mockReq = {} as IncomingMessage;
      const mockRes = {
        writeHead: vi.fn(),
        end: vi.fn(),
      } as unknown as ServerResponse;

      const mockGetCurrentSportEvents = vi
        .spyOn(sportEventsService, 'getCurrentSportEvents')
        .mockResolvedValue({});

      await getSportEventsState(mockReq, mockRes);

      expect(mockGetCurrentSportEvents).toHaveBeenCalledTimes(1);
      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      });
      expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({}));
    });

    it('should throw Unauthorized error when the error received from the service', async () => {
      const unauthorizedError = new Error('Unauthorized');
      const mockReq = {} as IncomingMessage;
      const mockRes = {
        writeHead: vi.fn(),
        end: vi.fn(),
      } as unknown as ServerResponse;

      const mockGetCurrentSportEvents = vi
        .spyOn(sportEventsService, 'getCurrentSportEvents')
        .mockRejectedValue(unauthorizedError);

      await getSportEventsState(mockReq, mockRes);

      expect(mockGetCurrentSportEvents).toHaveBeenCalledTimes(1);
      expect(mockRes.writeHead).toHaveBeenCalledWith(401, {
        'Content-Type': 'application/json',
      });
      expect(mockRes.end).toHaveBeenCalledWith(
        JSON.stringify({ error: 'Unauthorized' })
      );
    });
  });
});