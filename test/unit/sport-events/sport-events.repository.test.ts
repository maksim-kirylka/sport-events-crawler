import { beforeEach, describe, it, expect, vi } from 'vitest';
import {
  ISportEventsStateRepository,
  SportEventsStateRepository,
} from '../../../src/sport-events/sport-events.repository';
import { sportEvents } from '../../mocks/sport-events';

describe('SportEventsStateRepository', () => {
  let repository: ISportEventsStateRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    repository = new SportEventsStateRepository();
  });

  it('should return the initial sport events state with getSportEvents', () => {
    const initialState = repository.getSportEvents();

    expect(initialState).toEqual({});
  });

  it('should update the sport events state with setSportEvents', () => {
    repository.setSportEvents(sportEvents);

    const events = repository.getSportEvents();

    expect(events).toEqual(sportEvents);

    repository.setSportEvents({});
    const newEvents = repository.getSportEvents();

    expect(newEvents).toEqual({});
  });

  it('should return all the sport events besides ones with status REMOVED', () => {
    repository.setSportEvents(sportEvents);

    const activeSportEvents = repository.getRelevantSportEvents();
    const expected = Object.keys(sportEvents)
      .filter((key) => sportEvents[key].status !== 'REMOVED')
      .reduce((acc, key) => ({ ...acc, [key]: sportEvents[key] }), {});

    expect(activeSportEvents).toEqual(expected);
  });
});
