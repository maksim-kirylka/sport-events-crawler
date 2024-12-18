# README SOLUTION

## Implementation plan

1. Add Docker file and extend docker-compose file
2. Build the application structure (controllers, services, repositories, external API clients) and define all the functions/methods to be ready to call from tests
3. Build the server and expose an endpoint `/client/state`
4. Come up with data types the application is going to work with (SportEvent, Mapping)
5. Write tests in the TDD fashion
6. Implement the repository layer that's supposed to persist data (in-memory)
7. Implement client(s) that:

- Consumes data from the simulation API using `/api/state` endpoint
  - parse response
- Fetches mappings from the simulation API using `/api/mappings` endpoint
  - parse response
  - combine and build data based on responses from the simulation and mappings APIs
- Persists combined data in the internal application state (repository)

8. Implement polling mechanism to get simulation sport events data every second

9. Implement an endpoint `/client/state` returning the current application's state in JSON

- Implement server that listens to API requests from clients
- Implement a controller that interacts with the service layer
- Implement a service that interacts with the repository layer

## Running server

1. `npm i`
2. `docker-compose build`
3. `docker-compose up` (or `docker-compose watch` for development)
