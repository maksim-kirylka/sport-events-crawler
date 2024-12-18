import { IncomingMessage, ServerResponse } from 'http';
import { getCurrentSportEvents } from './sport-events.service';
import { SportEvents } from './sport-events.model';

export const getSportEventsState = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  const sportEvents = await getCurrentSportEvents();

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(sportEvents));
};

export const sportEventsRoutes = {
  '/client/state': {
    GET: getSportEventsState,
  },
};
