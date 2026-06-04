import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import createDetectedAppInputs from "../../../inputs/apps/detected/createDetectedAppInputs";
import { createDetectedAppExamplePayload } from "../../../examplePayloads";





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
      "@odata.type": "#microsoft.graph.detectedApp",
      displayName,
      version,
      sizeInByte,
      deviceCount,
      publisher,
      platform,
    };
    const { data } = await client.post(
      "/deviceManagement/detectedApps",
      payload,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createDetectedAppInputs,
  },
  examplePayload: createDetectedAppExamplePayload,
});
