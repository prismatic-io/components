import { action, input, util } from "@prismatic-io/spectral";
import { connect } from "../../client";
import { listDirectoryExamplePayload } from "../../examplePayloads";
import { connection, verbose } from "../../inputs";

const path = input({
  label: "Path",
  placeholder: "Enter directory path",
  type: "string",
  required: true,
  comments: "The full path of the directory on the FTP server to list.",
  example: "/path/to/directory",
  clean: util.types.toString,
});

const listDirectory = action({
  display: {
    label: "List Directory",
    description: "List the contents of a directory",
  },
  perform: async (_context, { connection, verbose, path }) => {
    const client = await connect(connection, verbose);
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
  inputs: { connection, verbose, path },
  examplePayload: listDirectoryExamplePayload,
});

export default listDirectory;
