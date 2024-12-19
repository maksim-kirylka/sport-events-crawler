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

    const updatedState = repository.getSportEvents();

    expect(updatedState).toEqual(sportEvents);

    repository.setSportEvents({});

    expect(updatedState).toEqual({});
  });
});
