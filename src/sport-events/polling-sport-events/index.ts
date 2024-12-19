import { getSportEventsMappings } from '../clients/mappings-client';
import { getCurrentSportEventsState } from '../clients/raw-state-client';
import { decodeMappings, decodeSportEventsState } from '../sport-events.mapper';
import { sportEventsStateRepository } from '../sport-events.repository';

const pollingInterval = process.env.POLLING_INTERVAL
  ? Number(process.env.POLLING_INTERVAL)
  : 1000;

const handleSportEvents = async () => {
  const sportEventsEncoded = await getCurrentSportEventsState();
  const mappingsEncoded = await getSportEventsMappings();

  const mappingsDecoded = decodeMappings(mappingsEncoded);
  const sportEventsDecoded = decodeSportEventsState(
    sportEventsEncoded,
    mappingsDecoded
  );

  const sportEventsState = sportEventsDecoded.reduce(
    (acc, event) => ({ ...acc, [event.id]: event }),
    {}
  );
  sportEventsStateRepository.setSportEvents(sportEventsState);
};

export const startPollingSportEvents = async () => {
  console.log('Start polling retrieving sport events');
  const intervalId = setInterval(handleSportEvents, pollingInterval);

  return () => {
    clearInterval(intervalId);
  };
};
