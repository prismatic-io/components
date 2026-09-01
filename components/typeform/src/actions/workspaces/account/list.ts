import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { commonListInputs, connection, accountId } from "../../../inputs";
import { fetchAllData } from "../../../util";
import type { Workspace } from "../../../interfaces/workspace";
import { listAccountWorkspacesResponse } from "../../../examplePayloads/workspaces";
export const listAccountWorkspaces = action({
  display: {
    label: "List Account Workspaces",
    description:
      "Retrieve all workspaces you have access to within the specific account.",
  },
  inputs: {
    connection,
    accountId,
    ...commonListInputs,
  },
  perform: async (context, { connection, pagination, fetchAll, accountId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await fetchAllData<Workspace>(
      client,
      `/accounts/${accountId}/workspaces`,
      {
        search: pagination.search,
        page: pagination.page,
        page_size: pagination.pageSize,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listAccountWorkspacesResponse,
  },
});
