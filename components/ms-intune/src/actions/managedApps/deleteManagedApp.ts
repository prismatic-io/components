import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteManagedAppExamplePayload } from "../../examplePayloads";
import { deleteManagedAppInputs } from "../../inputs";
export const deleteManagedApp = action({
  display: {
    label: "Delete Managed App",
    description: "Deletes an App.",
  },
  perform: async (context, { connection, mobileAppId }) => {
    const client = createClient(connection, context.debug.enabled, true);
    const { data } = await client.delete(
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}`,
    );
    return {
      data,
    };
  },
  inputs: deleteManagedAppInputs,
  examplePayload: deleteManagedAppExamplePayload,
});
