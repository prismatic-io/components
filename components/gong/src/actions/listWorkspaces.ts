import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";

export const listWorkspaces = action({
  display: {
    label: "List Workspaces",
    description: "Returns a list of all workspaces including their details.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/workspaces`);
    return { data };
  },
  inputs: {
    connection,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      workspaces: [
        {
          id: "623457276584334",
          name: "Some Workspace",
          description: "This is one of our workspaces",
        },
      ],
    },
  },
});
