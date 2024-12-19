const url = process.env.RTC_SIMULATION_API_URL;
const port = process.env.RTC_SIMULATION_API_PORT;
const rootPath = process.env.RTC_SIMULATION_ROOT_PATH;

export const buildUrl = (path: string) => `${url}:${port}${rootPath}${path}`;
