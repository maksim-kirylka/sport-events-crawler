import { beforeEach, describe, it, expect, vi } from 'vitest';
import { relevantSportEvents } from '../../mocks/sport-events';
import { getCurrentSportEvents } from '../../../src/sport-events/sport-events.service';
import { sportEventsStateRepository } from '../../../src/sport-events/sport-events.repository';

vi.mock('../../../src/sport-events/sport-events.repository', () => ({
  sportEventsStateRepository: {
    getSportEvents: vi.fn(),
    getRelevantSportEvents: vi.fn(),
  },
}));

describe('getCurrentSportEvents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the current sport events state excluding removed sport events', async () => {
    vi.mocked(
      sportEventsStateRepository.getRelevantSportEvents
    ).mockReturnValue(relevantSportEvents);

    const expected = await getCurrentSportEvents();

    expect(
      sportEventsStateRepository.getRelevantSportEvents
    ).toHaveBeenCalledTimes(1);

    expect(expected).toEqual(relevantSportEvents);
  });
});
