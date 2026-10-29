import { action } from "@prismatic-io/spectral";
import { getUnauthorizedClient } from "../../client";
import { listConnectionsInputs } from "../../inputs";
import { listConnectionsExamplePayload } from "../../examplePayloads";

export const listConnections = action({
  display: {
    label: "List Connections",
    description: "List all connections.",
  },
  perform: async (context, params) => {
    const client = getUnauthorizedClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/connections");
    return { data };
  },
  inputs: listConnectionsInputs,
  examplePayload: listConnectionsExamplePayload,
});
