import { IncomingMessage, ServerResponse } from 'http';
import { getCurrentSportEvents } from './sport-events.service';

export const getSportEventsState = async (
  _req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const sportEvents = await getCurrentSportEvents();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(sportEvents));
  } catch (error: unknown) {
    const err = error as Error;
    console.log('Unexpected error retrieving sport events', error);

    const responseError = {
      status: 500,
      message: 'Internal Server Error',
      description: err.message,
    };

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseError));
  }
};

export const sportEventsRoutes = {
  '/client/state': {
    GET: getSportEventsState,
  },
};
