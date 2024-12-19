import { buildUrl } from './simulation-api';

export const getCurrentSportEventsState = async (): Promise<string> => {
  try {
    const url = buildUrl('/state');
    console.log('Retrieving raw sport events state', url);

    const response = await fetch(url);
    const rawSportEvents = await response.json();

    console.log('Retrieved sport events', rawSportEvents);

    return rawSportEvents.odds;
  } catch (error: unknown) {
    console.error('Unexpected error while retrieving raw sport events', error);
    throw error;
  }
};
