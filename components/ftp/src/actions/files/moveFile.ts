import { action, input, util } from "@prismatic-io/spectral";
import { connect } from "../../client";
import { moveFileExamplePayload } from "../../examplePayloads";
import { connection, verbose } from "../../inputs";

const sourcePath = input({
  label: "Source Path",
  placeholder: "Enter source file path",
  type: "string",
  required: true,
  comments: "The current path of the file on the FTP server to move.",
  example: "/my/starting/path.txt",
  clean: util.types.toString,
});

const destinationPath = input({
  label: "Destination Path",
  placeholder: "Enter destination file path",
  type: "string",
  required: true,
  comments: "The new path where the file will be moved on the FTP server.",
  example: "/my/destination/path.txt",
  clean: util.types.toString,
});

export const moveFile = action({
  display: {
    label: "Move File",
    description: "Moves a file on an FTP server.",
  },
  perform: async (
    _context,
    { connection, verbose, sourcePath, destinationPath },
  ) => {
    const client = await connect(connection, verbose);
    try {
      await client.rename(sourcePath, destinationPath);
    } finally {
      client.close();
    }

    return null;
  },
  inputs: {
    connection,
    verbose,
    sourcePath,
    destinationPath,
  },
  examplePayload: moveFileExamplePayload,
});

export default moveFile;
