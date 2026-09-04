import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { downloadFileContentExamplePayload } from "../../examplePayloads";
import { downloadFileContentInputs } from "../../inputs";
import { downloadFileContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const downloadFileContent = action({
  display: {
    label: "Download File Content",
    description: "Download file content by its GUID.",
  },
  inputs: downloadFileContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: downloadFileContentOutputSchema,
  }),
  examplePayload: downloadFileContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Downloading file content for file ${params.fileGuid}`,
      );
      const { data, headers } = await client.get(
        `/files/${params.fileGuid}/content`,
        {
          responseType: "arraybuffer",
        },
      );
      context.logger.info(
        `Successfully downloaded file content for ${params.fileGuid}`,
      );
      const buffer = Buffer.from(data);
      const base64Content = buffer.toString("base64");
      return {
        data: {
          content: base64Content,
          contentType: headers["content-type"] || "application/octet-stream",
          filename:
            headers["content-disposition"]?.match(/filename="(.+)"/)?.[1] ||
            "downloaded_file",
          size: buffer.length,
        },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Download File Content");
    }
  },
});
