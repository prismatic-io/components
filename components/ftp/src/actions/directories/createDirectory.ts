import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDirectoryExamplePayload } from "../../examplePayloads";
import { createDirectoryInputs } from "../../inputs";
export const createDirectory = action({
  display: {
    label: "Create Directory",
    description:
      "Creates a new directory. When Include Subfolders is enabled, recursively creates any missing directories in the path.",
  },
  perform: async (context, { connection, path, recursive }) => {
    const client = await createClient(connection, context.debug.enabled);
    try {
      if (recursive) {
        await client.ensureDir(path);
      } else {
        await client.send(`MKD ${path}`);
      }
      return { data: path };
    } finally {
      client.close();
    }
  },
  inputs: createDirectoryInputs,
  examplePayload: createDirectoryExamplePayload,
});
export default createDirectory;
