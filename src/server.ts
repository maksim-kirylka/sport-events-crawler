import http, { IncomingMessage, ServerResponse } from 'node:http';
import { sportEventsRoutes } from './sport-events/sport-events.controller';

const applicationRoutes = {
  ...sportEventsRoutes,
};

// Running a simple Node.js server to simplify things
export const startServer = (
  onServerStart?: () => Promise<void>,
  onServerClose?: () => Promise<void>
): http.Server => {
  const server = http.createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      console.log(
        `Get current sport events request received - url: '${req.url}', method: '${req.method}'`
      );
      if (
        req.url &&
        req.method &&
        typeof applicationRoutes?.[req.url]?.[req.method] === 'function'
      ) {
        await applicationRoutes[req.url]?.[req.method]?.(req, res);
      } else {
        console.warn(
          `No handlers found for the request - url: '${req.url}', method: '${req.method}'`
        );
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
      }
    }
  );

  const port = process.env.CRAWLER_APPLICATION_PORT || 8080;
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    onServerStart?.();
  });

  server.on('close', () => {
    console.log('Server is closing. Performing cleanup...');
    onServerClose?.();
  });

  return server;
};
