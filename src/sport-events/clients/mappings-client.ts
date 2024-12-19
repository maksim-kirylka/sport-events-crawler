import { buildUrl } from './simulation-api';

export const getSportEventsMappings = async () => {
  try {
    const url = buildUrl('/mappings');
    console.log('Retrieving sport events mappings', url);

    const response = await fetch(url);
    const mappings = await response.json();

    console.log('Retrieved mappings', mappings);

    return mappings.mappings;
  } catch (error: unknown) {
    console.error('Unexpected error while retrieving mappings', error);
    throw error;
  }
};
