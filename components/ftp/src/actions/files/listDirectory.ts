import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDirectoryExamplePayload } from "../../examplePayloads";
import { listDirectoryInputs } from "../../inputs";
export const listDirectory = action({
  display: {
    label: "List Directory",
    description: "Lists the contents of a directory.",
  },
  perform: async (context, { connection, path }) => {
    const client = await createClient(connection, context.debug.enabled);
    try {
      await client.cd(path);
      const contents = await client.list();
      const data = contents.map((file) => ({
        ...file,
        isDirectory: file.isDirectory,
        isFile: file.isFile,
        isSymbolicLink: file.isSymbolicLink,
      }));
      return { data };
    } finally {
      client.close();
    }
  },
  inputs: listDirectoryInputs,
  examplePayload: listDirectoryExamplePayload,
});
export default listDirectory;
