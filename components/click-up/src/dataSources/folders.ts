import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { foldersExamplePayload } from "../examplePayloads";
import { foldersInputs } from "../inputs";
import type { GetFoldersResponse } from "../types";
export const folders = dataSource({
  display: {
    label: "Select Folder",
    description: "Select a folder from a space.",
  },
  perform: async (_context, { connection, spaceId }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetFoldersResponse>(
      `/space/${spaceId}/folder`,
    );
    const options = data.folders.map<Element>((folder) => {
      return { label: folder.name, key: folder.id };
    });
    return { result: options };
  },
  inputs: foldersInputs,
  examplePayload: foldersExamplePayload,
  dataSourceType: "picklist",
});
