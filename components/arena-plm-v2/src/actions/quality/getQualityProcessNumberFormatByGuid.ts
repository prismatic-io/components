import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getQualityProcessNumberFormatByGuidExamplePayload } from "../../examplePayloads";
import { getQualityProcessNumberFormatByGuidInputs } from "../../inputs";
import { numberSequenceCompactSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getQualityProcessNumberFormatByGuid = action({
  display: {
    label: "Get Quality Process Number Format by GUID",
    description:
      "Get details of a specific quality process number format by GUID from Arena PLM system.",
  },
  inputs: getQualityProcessNumberFormatByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: numberSequenceCompactSchema,
  }),
  examplePayload: getQualityProcessNumberFormatByGuidExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/settings/qualityprocesses/numberformats/${params.guid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Quality Process Number Format by GUID",
      );
    }
  },
});
