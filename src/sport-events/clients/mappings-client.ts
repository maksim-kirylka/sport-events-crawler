export const getSportEventsMappings = async (url: string) => {
  try {
    const response = await fetch(url);
    const mappings = await response.json();

    return mappings.mappings;
  } catch (error: unknown) {
    console.error('Unexpected error while retrieving mappings', error);
    throw error;
  }
};
