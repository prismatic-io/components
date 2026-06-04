import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import updateDetectedAppInputs from "../../../inputs/apps/detected/updateDetectedAppInputs";
import { updateDetectedAppExamplePayload } from "../../../examplePayloads";




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
      "@odata.type": "#microsoft.graph.detectedApp",
      displayName,
      version,
      sizeInByte,
      deviceCount,
      publisher,
      platform,
    };
    const { data } = await client.patch(
      `/deviceManagement/detectedApps/${detectedAppId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateDetectedAppInputs,
  },
  examplePayload: updateDetectedAppExamplePayload,
});
