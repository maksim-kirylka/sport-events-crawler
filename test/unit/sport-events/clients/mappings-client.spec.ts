import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { getSportEventsMappings } from '../../../../src/sport-events/clients/mappings-client';
import { buildUrl } from '../../../../src/sport-events/clients/simulation-api';

describe('getSportEventsMappings client', () => {
  const url = buildUrl('/mappings');

  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call fetcher function when retrieving mappings and return encoded data', async () => {
    const encodedMappings =
      '1654eaa2-4df3-4353-a971-8869797afcca:Real Madrid;f65aee22-588f-43f8-b836-af53a4324cb1:Barcelona;5b7ed712-36e8-4f14-9615-e3e001c31d2c:Manchester United;a1a4283d-b257-41a2-be16-094705bc377c:Liverpool;2f150d1f-22ae-4308-8177-890f195e31da:Bayern Munich';

    vi.mocked(global.fetch).mockResolvedValueOnce({
      json: async () => ({ mappings: encodedMappings }),
    } as Response);

    const response = await getSportEventsMappings();

    expect(response).toBe(encodedMappings);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });

  it('should throw an error when simulation API gives an error', async () => {
    const error = new Error('Internal Server Error');
    vi.mocked(global.fetch).mockRejectedValueOnce(error);

    await expect(() => getSportEventsMappings()).rejects.toThrow(error);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
});
