import { IncomingMessage, ServerResponse } from 'http';
import { getCurrentSportEvents } from './sport-events.service';

export const getClientState = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const sportEvents = await getCurrentSportEvents();

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(sportEvents));
};

export const sportEventsRoutes = {
  '/client/state': {
    GET: getClientState,
  },
};
