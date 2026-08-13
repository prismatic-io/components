import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteDetectedAppExamplePayload } from "../../examplePayloads";
import { deleteDetectedAppInputs } from "../../inputs";
export const deleteDetectedApp = action({
  display: {
    label: "Delete Detected App",
    description: "Deletes a Detected App.",
  },
  perform: async (context, { connection, detectedAppId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `${ENDPOINTS.DETECTED_APPS}/${detectedAppId}`,
    );
    return {
      data,
    };
  },
  inputs: deleteDetectedAppInputs,
  examplePayload: deleteDetectedAppExamplePayload,
});
