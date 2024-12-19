import { getSportEventsMappings } from '../clients/mappings-client';
import { getCurrentSportEventsState } from '../clients/raw-state-client';

const pollingInterval = process.env.POLLING_INTERVAL
  ? Number(process.env.POLLING_INTERVAL)
  : 1000;

const handleSportEvents = async () => {
  const sportEventsEncoded = await getCurrentSportEventsState();
  const mappingsEncoded = await getSportEventsMappings();
};

export const startPollingSportEvents = async () => {
  console.log('Start polling retrieving sport events');
  const intervalId = setInterval(handleSportEvents, pollingInterval);

  return () => {
    clearInterval(intervalId);
  };
};
