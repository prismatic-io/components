import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectWorkspaceInputs as inputs } from "../inputs/dataSources";
import type { Workspace } from "../types/dataSourceTypes";
import { getListData } from "../util";

export const selectWorkspace = dataSource({
  display: {
    label: "Select Workspace",
    description: "Select a workspace from a list of workspaces.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, false);

    const { data } = await getListData<Workspace, "workspaces">(
      client,
      `/workspaces`,
      "workspaces",
      true,
      {},
    );

    const objects = (data.workspaces || []).map<Element>(({ id, name }) => ({
      key: util.types.toString(id),
      label: name,
    }));

    return { result: objects };
  },
});
