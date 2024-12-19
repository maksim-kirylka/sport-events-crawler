import { SportEvents } from './sport-events.model';
import { sportEventsStateRepository } from './sport-events.repository';

export const getCurrentSportEvents = async (): Promise<SportEvents> => {
  return sportEventsStateRepository.getRelevantSportEvents();
};
