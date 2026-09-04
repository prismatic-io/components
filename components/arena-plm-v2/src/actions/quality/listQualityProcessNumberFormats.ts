import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessNumberFormatsExamplePayload } from "../../examplePayloads";
import { listQualityProcessNumberFormatsInputs } from "../../inputs";
import { listQualityProcessNumberFormatsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessNumberFormats = action({
  display: {
    label: "List Quality Process Number Formats",
    description:
      "List number formats for quality processes from Arena PLM system.",
  },
  inputs: listQualityProcessNumberFormatsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityProcessNumberFormatsOutputSchema,
  }),
  examplePayload: listQualityProcessNumberFormatsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        "/settings/qualityprocesses/numberformats",
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Quality Process Number Formats",
      );
    }
  },
});
