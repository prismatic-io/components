import { action } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getFileContentExamplePayload } from "../../examplePayloads";
import { getFileContentInputs } from "../../inputs";
import { handleArenaError } from "../../util";
export const getFileContent = action({
  display: {
    label: "Get File Content",
    description:
      "Download file content by its GUID from Arena PLM system. Returns the binary content as a Buffer.",
  },
  inputs: getFileContentInputs,
  examplePayload: getFileContentExamplePayload,
  perform: async (context, { connection, fileGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Downloading file content from Arena", {
        fileGuid,
      });
      const { data, headers } = await client.get(`/files/${fileGuid}/content`, {
        responseType: "arraybuffer",
      });
      context.logger.info("File content downloaded successfully", {
        fileGuid,
        contentType: headers["content-type"],
        contentLength: headers["content-length"],
      });
      const buffer = Buffer.from(data);
      return {
        data: buffer,
        contentType: String(
          headers["content-type"] || "application/octet-stream",
        ),
      };
    } catch (error) {
      handleArenaError(error, context.logger, `Get File Content (${fileGuid})`);
    }
  },
});
