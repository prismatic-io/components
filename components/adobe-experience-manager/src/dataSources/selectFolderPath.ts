import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import { DEFAULT_DAM_ROOT } from "../constants";
import { selectFolderPathExamplePayload } from "../examplePayloads";
import { selectFolderPathInputs } from "../inputs";
import { compareElementLabels, walkFolderTree } from "../utils";

export const selectFolderPath = dataSource({
  display: {
    label: "Select Folder Path",
    description:
      "Select an asset folder path from /content/dam and the folders under it.",
  },
  inputs: selectFolderPathInputs,
  examplePayload: selectFolderPathExamplePayload,
  perform: async (_context, { connection }) => {
    const client = createAemClient(connection, false);
    const { folders } = await walkFolderTree(client, DEFAULT_DAM_ROOT, {
      collectAssets: false,
    });
    const paths = new Set([DEFAULT_DAM_ROOT]);
    for (const folder of folders) {
      if (folder.path) paths.add(folder.path);
    }
    const result = [...paths]
      .map<Element>((path) => ({ label: path, key: path }))
      .sort(compareElementLabels);
    return { result };
  },
  dataSourceType: "picklist",
});
