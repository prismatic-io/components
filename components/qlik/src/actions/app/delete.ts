import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAppExamplePayload } from "../../examplePayloads";
import { appId, connectionInput } from "../../inputs";

export const deleteApp = action({
  display: {
    label: "Delete App",
    description: "Deletes a specific app.",
  },
  examplePayload: deleteAppExamplePayload,
  perform: async (context, { connection, appId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/apps/${appId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    appId,
  },
});
