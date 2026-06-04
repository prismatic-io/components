import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  appId,
  attributeDescription,
  attributeName,
  connectionInput,
} from "../../inputs";

export const updateApp = action({
  display: {
    label: "Update App",
    description: "Updates the information for a specific app.",
  },
  perform: async (
    context,
    { connection, appId, attributeDescription, attributeName },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.put(`/apps/${appId}`, {
      attributes: {
        description: attributeDescription || undefined,
        name: attributeName || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    appId,
    attributeName,
    attributeDescription,
  },
});
