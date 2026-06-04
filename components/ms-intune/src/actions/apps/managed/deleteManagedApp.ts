import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import deleteManagedAppInputs from "../../../inputs/apps/managed/deleteManagedAppInputs";

export const deleteManagedApp = action({
  display: {
    label: "Delete Managed App",
    description: "Deletes an App.",
  },
  perform: async (context, { connection, mobileAppId }) => {
    const client = createClient(connection, context.debug.enabled, true);
    const { data } = await client.delete(
      `/deviceAppManagement/mobileApps/${mobileAppId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...deleteManagedAppInputs,
  },
  examplePayload: { data: {} },
});
