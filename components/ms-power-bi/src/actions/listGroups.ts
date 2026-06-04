import { action } from "@prismatic-io/spectral";
import { connection, skipToken, top } from ".././inputs";
import { createClient } from "../client";
import { listGroupsExamplePayload } from "../examplePayloads";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Returns a list of workspaces the user has access to",
  },
  perform: async (context, params) => {
    const client = createClient({ connection: params.connection }, context.debug.enabled);
    const { data } = await client.get("/groups", {
      params: { $top: params.top, $skipToken: params.skipToken },
    });

    return {
      data,
    };
  },
  inputs: { connection, skipToken, top },
  examplePayload: listGroupsExamplePayload,
});

export default listGroups;
