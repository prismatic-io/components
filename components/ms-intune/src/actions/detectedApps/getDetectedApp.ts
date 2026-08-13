import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getDetectedAppExamplePayload } from "../../examplePayloads";
import { getDetectedAppInputs } from "../../inputs";
export const getDetectedApp = action({
  display: {
    label: "Get Detected App",
    description:
      "Read properties and relationships of the Detected Apps object.",
  },
  perform: async (context, { connection, detectedAppId }) => {
    const client = createClient(connection, context.debug.enabled, true);
    const { data } = await client.get(
      `${ENDPOINTS.DETECTED_APPS}/${detectedAppId}`,
    );
    return {
      data,
    };
  },
  inputs: getDetectedAppInputs,
  examplePayload: getDetectedAppExamplePayload,
});
