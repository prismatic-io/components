import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getQualityProcessByGuidExamplePayload } from "../../examplePayloads";
import { getQualityProcessByGuidInputs } from "../../inputs";
import { qualityProcessListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getQualityProcessByGuid = action({
  display: {
    label: "Get Quality Process by GUID",
    description:
      "Returns a Quality Process object with a specific GUID from Arena PLM system.",
  },
  inputs: getQualityProcessByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityProcessListSchema,
  }),
  examplePayload: getQualityProcessByGuidExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/qualityprocesses/${params.qualityProcessGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Quality Process by GUID");
    }
  },
});
