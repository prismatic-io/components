import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import deleteDetectedAppInputs from "../../../inputs/apps/detected/deleteDetectedAppInputs";




export const deleteDetectedApp = action({
  display: {
    label: "Delete Detected App",
    description: "Deletes a Detected App.",
  },
  perform: async (context, { connection, detectedAppId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/deviceManagement/detectedApps/${detectedAppId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...deleteDetectedAppInputs,
  },
  examplePayload: { data: {} },
});
