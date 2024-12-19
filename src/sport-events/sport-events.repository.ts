import { SportEvents } from './sport-events.model';

export interface ISportEventsStateRepository {
  getSportEvents(): SportEvents;

  getRelevantSportEvents(): SportEvents;

  setSportEvents(sportEvents: SportEvents): void;
}

export class SportEventsStateRepository implements ISportEventsStateRepository {
  private sportEventsState: SportEvents = {};

  public getSportEvents(): SportEvents {
    return this.sportEventsState;
  }

  // Getting rid of events with the `status=REMOVED`
  public getRelevantSportEvents(): SportEvents {
    return Object.values(this.sportEventsState)
      .filter((event) => event.status !== 'REMOVED')
      .reduce((acc, event) => ({ ...acc, [event.id]: event }), {});
  }

  public setSportEvents(sportEvents: SportEvents): void {
    this.sportEventsState = sportEvents;
  }
}

export const sportEventsStateRepository = new SportEventsStateRepository();
