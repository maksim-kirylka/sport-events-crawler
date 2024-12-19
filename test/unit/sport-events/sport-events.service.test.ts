import { beforeEach, describe, it, expect, vi } from 'vitest';
import { sportEvents } from '../../mocks/sport-events';
import { getCurrentSportEvents } from '../../../src/sport-events/sport-events.service';
import { sportEventsStateRepository } from '../../../src/sport-events/sport-events.repository';

vi.mock('../../../src/sport-events/sport-events.repository', () => ({
  sportEventsStateRepository: {
    getSportEvents: vi.fn(),
  },
}));

describe('getCurrentSportEvents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the current sport events state excluding removed sport events', async () => {
    vi.mocked(sportEventsStateRepository.getSportEvents).mockReturnValue(
      sportEvents
    );
    const activeSportEvents = Object.keys(sportEvents)
      .filter((key) => sportEvents[key].status !== 'REMOVED')
      .reduce((acc, key) => ({ ...acc, [key]: sportEvents[key] }), {});

    const expected = await getCurrentSportEvents();

    expect(sportEventsStateRepository.getSportEvents).toHaveBeenCalledTimes(1);

    expect(expected).toEqual(activeSportEvents);
  });
});
