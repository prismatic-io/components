import { dataSource, type Element } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { selectFolderInputs } from "../inputs";
import type { FolderListResponse } from "../types/folder";

export const selectFolder = dataSource({
  display: {
    label: "Select Folder",
    description: "Select a document folder.",
  },
  inputs: selectFolderInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);

    const { data } = await client.get<FolderListResponse>(
      "/docs/folders/metadata",
    );

    const result = data.map<Element>((el) => ({
      label: `${el.name} (${el.folderType})`,
      key: el.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
