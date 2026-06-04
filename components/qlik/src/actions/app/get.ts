import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAppExamplePayload } from "../../examplePayloads";
import { appId, connectionInput } from "../../inputs";

export const getApp = action({
  display: {
    label: "Get App",
    description: "Retrieves information for a specific app.",
  },
  examplePayload: getAppExamplePayload,
  perform: async (context, { connection, appId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/apps/${appId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    appId,
  },
});
