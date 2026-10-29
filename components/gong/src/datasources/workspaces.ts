import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";

interface Workspace {
  requestId: string;
  workspaces: {
    id: string;
    name: string;
    description: string;
  }[];
}

export const workspaces = dataSource({
  display: {
    label: "Select Workspace",
    description: "Select a workspace from your Gong account",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<Workspace>("/v2/workspaces");
    const result = data.workspaces.map<Element>((workspace) => ({
      label: workspace.name,
      key: workspace.id.toString(),
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Sales Onboarding", key: "3843152912968920037" }],
  },
});
