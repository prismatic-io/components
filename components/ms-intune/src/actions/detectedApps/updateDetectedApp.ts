import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, ODATA_TYPES } from "../../constants";
import { updateDetectedAppExamplePayload } from "../../examplePayloads";
import { updateDetectedAppInputs } from "../../inputs";
export const updateDetectedApp = action({
  display: {
    label: "Update Detected App",
    description: "Update the properties of a Detected Apps object.",
  },
  perform: async (
    context,
    {
      connection,
      detectedAppId,
      displayName,
      version,
      sizeInByte,
      deviceCount,
      publisher,
      platform,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, true);
    const payload = {
      "@odata.type": ODATA_TYPES.DETECTED_APP,
      displayName,
      version,
      sizeInByte,
      deviceCount,
      publisher,
      platform,
    };
    const { data } = await client.patch(
      `${ENDPOINTS.DETECTED_APPS}/${detectedAppId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: updateDetectedAppInputs,
  examplePayload: updateDetectedAppExamplePayload,
});
