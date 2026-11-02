import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import { DEFAULT_DAM_ROOT } from "../constants";
import { selectFolderExamplePayload } from "../examplePayloads";
import { selectFolderInputs } from "../inputs";
import { compareElementLabels, walkFolderTree } from "../utils";

export const selectFolder = dataSource({
  display: {
    label: "Select Folder",
    description: "Select an asset folder from the folders under /content/dam.",
  },
  inputs: selectFolderInputs,
  examplePayload: selectFolderExamplePayload,
  perform: async (_context, { connection }) => {
    const client = createAemClient(connection, false);
    const { folders } = await walkFolderTree(client, DEFAULT_DAM_ROOT, {
      collectAssets: false,
    });
    const result = folders
      .filter((folder) => folder.folderId)
      .map<Element>((folder) => ({
        label:
          folder.path ?? folder.name ?? util.types.toString(folder.folderId),
        key: util.types.toString(folder.folderId),
      }))
      .sort(compareElementLabels);
    return { result };
  },
  dataSourceType: "picklist",
});
