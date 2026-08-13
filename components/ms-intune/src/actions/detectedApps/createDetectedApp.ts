import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, ODATA_TYPES } from "../../constants";
import { createDetectedAppExamplePayload } from "../../examplePayloads";
import { createDetectedAppInputs } from "../../inputs";
export const createDetectedApp = action({
  display: {
    label: "Create Detected App",
    description: "Create a new Detected Apps object.",
  },
  perform: async (
    context,
    {
      connection,
      displayName,
      version,
      sizeInByte,
      deviceCount,
      publisher,
      platform,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      "@odata.type": ODATA_TYPES.DETECTED_APP,
      displayName,
      version,
      sizeInByte,
      deviceCount,
      publisher,
      platform,
    };
    const { data } = await client.post(ENDPOINTS.DETECTED_APPS, payload);
    return {
      data,
    };
  },
  inputs: createDetectedAppInputs,
  examplePayload: createDetectedAppExamplePayload,
});
