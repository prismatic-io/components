import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { commonListInputs, connection } from "../../inputs";
import { fetchAllData } from "../../util";
import type { Workspace } from "../../interfaces/workspace";
import { listWorkspacesResponse } from "../../examplePayloads/workspaces";

export const listWorkspaces = action({
  display: {
    label: "List Workspaces",
    description: "Retrieve all workspaces the user has access to.",
  },
  inputs: {
    connection,
    ...commonListInputs,
  },
  perform: async (
    context,
    { connection, page, pageSize, search, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await fetchAllData<Workspace>(
      client,
      "/workspaces",
      {
        search,
        page,
        page_size: pageSize,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listWorkspacesResponse,
  },
});
