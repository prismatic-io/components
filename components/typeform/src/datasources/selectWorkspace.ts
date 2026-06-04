import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import { fetchAllData } from "../util";
import type { Workspace } from "../interfaces/workspace";
import { selectWorkspaceExample } from "../examplePayloads/datasources";

export const selectWorkspaces = dataSource({
  display: {
    label: "Select Workspaces",
    description: "Allow a user to select one of their workspaces",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await fetchAllData<Workspace>(
      client,
      `/workspaces`,
      {},
      true,
    );
    const result = data.items.map<Element>(({ name, id }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectWorkspaceExample,
  },
});
