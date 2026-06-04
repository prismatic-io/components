import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createGeminiClient } from "../client";
import { selectFileExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { selectFileInputs } from "../inputs/dataSources";

export const selectFile = dataSource({
  display: {
    label: "Select File",
    description: "Select a file from the list of available files.",
  },
  inputs: selectFileInputs,
  perform: async (context, { connection }) => {
    const client = createGeminiClient(connection);
    const listedFiles = await client.files.list();

    const files = [];
    let fileArray = listedFiles.page;
    while (true) {
      for (const file of fileArray) {
        files.push(file);
      }
      if (!listedFiles.hasNextPage()) {
        break;
      }
      fileArray = await listedFiles.nextPage();
    }

    const result = files
      .map<Element>((file) => ({
        label: util.types.toString(file.displayName || file.name),
        key: util.types.toString(file.name),
      }))
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
