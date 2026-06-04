import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { accountId, connection } from "../inputs";
import { fetchAllData } from "../util";
import type { Workspace } from "../interfaces/workspace";
import { selectWorkspaceExample as selectWorkspaceAccountExample } from "../examplePayloads/datasources";

export const selectAccountWorkspaces = dataSource({
  display: {
    label: "Select Account Workspaces",
    description: "Allow a user to select one of their account workspaces",
  },
  inputs: {
    accountId,
    connection,
  },
  perform: async (_context, { connection, accountId }) => {
    const client = createClient(connection, false);
    const { data } = await fetchAllData<Workspace>(
      client,
      `/accounts/${accountId}/workspaces`,
      {},
      true,
    );
    const result = data.items.map<Element>((workspace) => ({
      label: workspace.name,
      key: workspace.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectWorkspaceAccountExample,
  },
});
