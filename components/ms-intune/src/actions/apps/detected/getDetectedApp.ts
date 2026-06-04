import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import getDetectedAppInputs from "../../../inputs/apps/detected/getDetectedAppInputs";
import { getDetectedAppExamplePayload } from "../../../examplePayloads";

export const getDetectedApp = action({
  display: {
    label: "Get Detected App",
    description:
      "Read properties and relationships of the Detected Apps object.",
  },
  perform: async (context, { connection, detectedAppId }) => {
    const client = createClient(connection, context.debug.enabled, true);

    const { data } = await client.get(
      `/deviceManagement/detectedApps/${detectedAppId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getDetectedAppInputs,
  },
  examplePayload: getDetectedAppExamplePayload,
});
