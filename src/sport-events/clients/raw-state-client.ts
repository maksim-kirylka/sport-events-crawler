export const getCurrentSportEventsState = async (
  url: string
): Promise<string> => {
  try {
    const response = await fetch(url);
    const rawSportEvents = await response.json();

    return rawSportEvents.odds;
  } catch (error: unknown) {
    console.error('Unexpected error while retrieving raw sport events', error);
    throw error;
  }
};
