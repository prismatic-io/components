import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listWorkspacesExamplePayload as examplePayload } from "../../examplePayloads";
import { listWorkspacesInputs as inputs } from "../../inputs/workspaces";
import { getListData } from "../../util";
export const listWorkspaces = action({
  display: {
    label: "List Workspaces",
    description: "Returns a list of all workspaces.",
  },
  perform: async (
    context,
    { connection, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    const { data } = await getListData(
      client,
      `/workspaces`,
      "workspaces",
      fetchAll,
      {
        ...additionalQueryParams,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
