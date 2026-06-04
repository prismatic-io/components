import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getMobileAppExamplePayload } from "../../examplePayloads";
import { mobileAppId } from "../../inputs/mobileApps/general";

export const getMobileApp = action({
  display: {
    label: "Get Mobile App",
    description: "Retrieve a single mobile app.",
  },
  perform: async (context, { connection, mobileAppId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/deviceAppManagement/mobileApps/${mobileAppId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    mobileAppId,
  },
  examplePayload: getMobileAppExamplePayload,
});
