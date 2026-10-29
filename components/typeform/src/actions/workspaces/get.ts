import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, id } from "../../inputs";
import { fetchData } from "../../util";
import type { Workspace } from "../../interfaces/workspace";
import { getWorkspaceResponse } from "../../examplePayloads/workspaces";

export const getWorkspace = action({
  display: {
    label: "Get Workspace",
    description: "Retrieve a workspace.",
  },
  inputs: {
    id: {
      ...id,
      label: "Workspace Id",
      comments: "The workspace Id to retrieve.",
      dataSource: "selectWorkspaces",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchData<Workspace>(client, `/workspaces/${id}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getWorkspaceResponse,
  },
});
