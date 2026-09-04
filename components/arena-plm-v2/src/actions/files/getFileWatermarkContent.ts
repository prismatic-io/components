import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getFileWatermarkContentExamplePayload } from "../../examplePayloads";
import { getFileWatermarkContentInputs } from "../../inputs";
import { getFileWatermarkContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getFileWatermarkContent = action({
  display: {
    label: "Get File Watermark Content",
    description: "Get watermark content for a file.",
  },
  inputs: getFileWatermarkContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFileWatermarkContentOutputSchema,
  }),
  examplePayload: getFileWatermarkContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data, headers } = await client.get(
        `/files/${params.fileGuid}/watermarkcontent`,
        {
          responseType: "arraybuffer",
        },
      );
      const buffer = Buffer.from(data);
      const base64Content = buffer.toString("base64");
      return {
        data: {
          content: base64Content,
          contentType: headers["content-type"] || "application/octet-stream",
          filename:
            headers["content-disposition"]?.match(/filename="(.+)"/)?.[1] ||
            "watermark_file",
          size: buffer.length,
        },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get File Watermark Content");
    }
  },
});
