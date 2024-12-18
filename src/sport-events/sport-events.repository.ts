interface ISportEventsStateRepository {
  getSportEvents(): { [key: string]: object };

  setSportEvents(sportEvents: { [key: string]: object }): void;
}

export class SportEventsStateRepository implements ISportEventsStateRepository {
  private sportEventsState: { [key: string]: object };

  public getSportEvents(): { [key: string]: object } {
    return this.sportEventsState;
  }

  public setSportEvents(sportEvents: { [key: string]: object }): void {
    this.sportEventsState = sportEvents;
  }
}
