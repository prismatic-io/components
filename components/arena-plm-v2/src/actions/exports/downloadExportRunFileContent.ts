import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { downloadExportRunFileContentExamplePayload } from "../../examplePayloads";
import { downloadExportRunFileContentInputs } from "../../inputs";
import { downloadExportRunFileContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const downloadExportRunFileContent = action({
  display: {
    label: "Download Export Run File Content",
    description: "Download the actual content of a file from an export run.",
  },
  inputs: downloadExportRunFileContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: downloadExportRunFileContentOutputSchema,
  }),
  examplePayload: downloadExportRunFileContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Downloading content for file ${params.fileGuid} from export run ${params.exportRunGuid}`,
      );
      const { data, headers } = await client.get(
        `/exports/${params.exportGuid}/runs/${params.exportRunGuid}/files/${params.fileGuid}/content`,
        { responseType: "arraybuffer" },
      );
      context.logger.info("Successfully downloaded export run file content");
      const buffer = Buffer.from(data);
      const base64Content = buffer.toString("base64");
      return {
        data: {
          content: base64Content,
          contentType: headers["content-type"] || "application/octet-stream",
          filename:
            headers["content-disposition"]?.match(/filename="(.+)"/)?.[1] ||
            "export_file",
          size: buffer.length,
        },
      };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Download Export Run File Content",
      );
    }
  },
});
