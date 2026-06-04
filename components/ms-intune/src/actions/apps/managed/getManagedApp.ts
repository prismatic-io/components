import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import getManagedAppInputs from "../../../inputs/apps/managed/getManagedAppInputs";
import { connection } from "../../../inputs/general";
import { getManagedAppExamplePayload } from "../../../examplePayloads";

export const getManagedApp = action({
  display: {
    label: "Get Managed App",
    description: "Read properties and relationships of an App object.",
  },
  perform: async (context, { connection, appId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/deviceAppManagement/mobileApps/${appId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getManagedAppInputs,
  },
  examplePayload: getManagedAppExamplePayload,
});
