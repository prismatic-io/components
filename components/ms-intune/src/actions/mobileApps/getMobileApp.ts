import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getMobileAppExamplePayload } from "../../examplePayloads";
import { getMobileAppInputs } from "../../inputs";
export const getMobileApp = action({
  display: {
    label: "Get Mobile App",
    description: "Retrieve a single mobile app.",
  },
  perform: async (context, { connection, mobileAppId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}`,
    );
    return {
      data,
    };
  },
  inputs: getMobileAppInputs,
  examplePayload: getMobileAppExamplePayload,
});
