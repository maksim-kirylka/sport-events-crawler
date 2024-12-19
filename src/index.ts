import { startServer } from './server';
import { startPollingSportEvents } from './sport-events/polling-sport-events';

let unsubscribe = () => {};

const onServerStart = async () => {
  unsubscribe = await startPollingSportEvents();
};

const onServerClose = async () => {
  unsubscribe();
};

startServer(onServerStart, onServerClose);
