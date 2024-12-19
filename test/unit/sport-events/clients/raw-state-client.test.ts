import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { getCurrentSportEventsState } from '../../../../src/sport-events/clients/raw-state-client';

describe('getCurrentSportEventsState client', () => {
  const url = 'https://api.example.com/api/state';

  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call fetcher function when retrieving raw sport events and return encoded data', async () => {
    const encoded =
      '995e0722-4118-4f8e-a517-82f6ea240673,c0a1f678-dbe5-4cc8-aa52-8c822dc65267,7ee17545-acd2-4332-869b-1bef06cfaec8,1709900432183,29190088-763e-4d1c-861a-d16dbfcf858c,3cd8eeee-a57c-48a3-845f-93b561a95782,ac68a563-e511-4776-b2ee-cd395c7dc424,\n4bb7b78f-6a23-43d0-a61a-1341f03f64e0,c0a1f678-dbe5-4cc8-aa52-8c822dc65267,194e22c6-53f3-4f36-af06-53f168ebeee8,1709900380135,d6fdf482-8151-4651-92c2-16e9e8ea4b8b,b582b685-e75c-4139-8274-d19f078eabef,7fa4e60c-71ad-4e76-836f-5c2bc6602156,e2d12fef-ae82-4a35-b389-51edb8dc664e@1:2|6c036000-6dd9-485d-97a1-e338e6a32a51@1:2\nfd903e06-9a7d-423d-8869-1c060cc0b62d,c0a1f678-dbe5-4cc8-aa52-8c822dc65267,7ee17545-acd2-4332-869b-1bef06cfaec8,1709900348483,a950b22c-989b-402f-a1ac-70df8f102e27,5dbdb683-c15f-4d79-a348-03cf2861b954,7fa4e60c-71ad-4e76-836f-5c2bc6602156,e2d12fef-ae82-4a35-b389-51edb8dc664e@1:3|6c036000-6dd9-485d-97a1-e338e6a32a51@1:3\n449a2d53-4845-4a59-9596-4206f2504656,c0a1f678-dbe5-4cc8-aa52-8c822dc65267,7ee17545-acd2-4332-869b-1bef06cfaec8,1709900494110,f0c6f8b4-8fbc-4022-95b3-c68bca32adb9,33ff69aa-c714-470c-b90d-d3883c95adce,ac68a563-e511-4776-b2ee-cd395c7dc424,\n4c6d6c9d-2b47-433d-b2ad-a82cff214805,c0a1f678-dbe5-4cc8-aa52-8c822dc65267,28cb12c0-2542-4790-b66b-e51b9cb30c76,1709900417851,4df1b17c-3bfe-4bbb-8b60-12661c2bb190,7229b223-03d6-4285-afbf-243671088a20,ac68a563-e511-4776-b2ee-cd395c7dc424,\nb874daa4-0ee2-4030-83ac-8bf70100dbb6,c72cbbc8-bac9-4cb7-a305-9a8e7c011817,28cb12c0-2542-4790-b66b-e51b9cb30c76,1709900404465,44bc5cb3-19c0-4f35-8ac6-100cfecf70f1,98841461-0442-4dbb-ae53-2e039bbecad2,7fa4e60c-71ad-4e76-836f-5c2bc6602156,e2d12fef-ae82-4a35-b389-51edb8dc664e@0:0|6c036000-6dd9-485d-97a1-e338e6a32a51@0:0\na32247cb-70a7-4d7b-a69d-37a98a512687,c72cbbc8-bac9-4cb7-a305-9a8e7c011817,194e22c6-53f3-4f36-af06-53f168ebeee8,1709900431402,9012f4c9-1d9c-4137-a60d-94b853972c7e,3138f71d-16f2-46b6-9812-d62e3fa6f981,ac68a563-e511-4776-b2ee-cd395c7dc424,\naf5d53e6-b108-48ce-b3e9-fce1c94af6c4,c72cbbc8-bac9-4cb7-a305-9a8e7c011817,7ee17545-acd2-4332-869b-1bef06cfaec8,1709900352422,259ba76d-189f-420f-be50-0aac633c2153,6acec751-8fc4-4c44-8798-1182699869d0,7fa4e60c-71ad-4e76-836f-5c2bc6602156,e2d12fef-ae82-4a35-b389-51edb8dc664e@1:1|6c036000-6dd9-485d-97a1-e338e6a32a51@1:1|2db8bc38-b46d-4bd9-9218-6f8dbe083517@0:0\n1e9d8eee-e6a7-44c2-ad21-45f6f6d0f646,c72cbbc8-bac9-4cb7-a305-9a8e7c011817,c3215a44-efdb-49fb-9f01-85b26c57bbd4,1709900497047,d34032e0-0e81-4166-8ced-dd8fd6222fcb,e476746c-869d-4aa5-a292-587730514aae,ac68a563-e511-4776-b2ee-cd395c7dc424,\nb2ec3d30-e156-42dd-9074-61681eecd382,c72cbbc8-bac9-4cb7-a305-9a8e7c011817,7ee17545-acd2-4332-869b-1bef06cfaec8,1709900423377,d3fa6d41-af8c-45d1-848c-891ca86731f1,b98bab75-53d3-494e-a3a9-b9d1dd1fb458,ac68a563-e511-4776-b2ee-cd395c7dc424,';

    vi.mocked(global.fetch).mockResolvedValueOnce({
      json: async () => ({ odds: encoded }),
    } as Response);

    const response = await getCurrentSportEventsState(url);

    expect(response).toBe(encoded);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });

  it('should throw an error when simulation API gives an error', async () => {
    const error = new Error('Internal Server Error');
    vi.mocked(global.fetch).mockRejectedValueOnce(error);

    await expect(() => getCurrentSportEventsState(url)).rejects.toThrow(error);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
});
