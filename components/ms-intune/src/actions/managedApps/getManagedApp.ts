import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getManagedAppExamplePayload } from "../../examplePayloads";
import { getManagedAppInputs } from "../../inputs";
export const getManagedApp = action({
  display: {
    label: "Get Managed App",
    description: "Read properties and relationships of an App object.",
  },
  perform: async (context, { connection, appId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`${ENDPOINTS.MOBILE_APPS}/${appId}`);
    return {
      data,
    };
  },
  inputs: getManagedAppInputs,
  examplePayload: getManagedAppExamplePayload,
});
