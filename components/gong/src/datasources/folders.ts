import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, workspaceId } from "../inputs";

interface Folders {
  requestId: string;
  folders: {
    id: string;
    name: string;
    parentFolderId: string;
    createdBy: string;
    updated: number;
  }[];
}

export const folders = dataSource({
  display: {
    label: "Select Folder",
    description: "Select a folder from your Gong workspace",
  },
  inputs: {
    connection,
    workspaceId: {
      ...workspaceId,
      required: true,
      dataSource: undefined,
    },
  },
  perform: async (_context, { connection, workspaceId }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<Folders>(`/v2/library/folders`, {
      params: {
        workspaceId,
      },
    });

    const result = data.folders.map<Element>((folder) => ({
      label: folder.name,
      key: folder.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Sales Onboarding", key: "3843152912968920037" }],
  },
});
