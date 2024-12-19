import { startServer } from './server';
import { startPollingSportEvents } from './sport-events/polling-sport-events';

let unsubscribe = () => {};

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const onServerStart = async () => {
  await wait(5000);
  unsubscribe = await startPollingSportEvents();
};

const onServerClose = async () => {
  unsubscribe();
};

startServer(onServerStart, onServerClose);
