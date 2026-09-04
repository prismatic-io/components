import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { downloadExtractRunFileContentExamplePayload } from "../../examplePayloads";
import { downloadExtractRunFileContentInputs } from "../../inputs";
import { downloadExtractRunFileContentOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const downloadExtractRunFileContent = action({
  display: {
    label: "Download Extract Run File Content",
    description: "Download the actual file content from an extract run.",
  },
  inputs: downloadExtractRunFileContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: downloadExtractRunFileContentOutputSchema,
  }),
  examplePayload: downloadExtractRunFileContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data, headers } = await client.get(
        `/extracts/${params.extractGuid}/runs/${params.extractRunGuid}/files/${params.runFileAssociationGuid}/content`,
        { responseType: "arraybuffer" },
      );
      const buffer = Buffer.from(data);
      const base64Content = buffer.toString("base64");
      return {
        data: {
          content: base64Content,
          contentType: headers["content-type"] || "application/octet-stream",
          filename:
            headers["content-disposition"]?.match(/filename="(.+)"/)?.[1] ||
            "extract_file",
          size: buffer.length,
        },
      };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Download Extract Run File Content",
      );
    }
  },
});
