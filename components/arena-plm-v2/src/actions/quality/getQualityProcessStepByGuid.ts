import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getQualityProcessStepByGuidExamplePayload } from "../../examplePayloads";
import { getQualityProcessStepByGuidInputs } from "../../inputs";
import { qualityProcessStepSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getQualityProcessStepByGuid = action({
  display: {
    label: "Get Quality Process Step by GUID",
    description:
      "Returns a Quality Process Step object with a given GUID for a Quality Process with a given GUID from Arena PLM system.",
  },
  inputs: getQualityProcessStepByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityProcessStepSchema,
  }),
  examplePayload: getQualityProcessStepByGuidExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        includeEmptyAdditionalAttributes:
          params.includeEmptyAdditionalAttributes,
      };
      const { data } = await client.get(
        `/qualityprocesses/${params.qualityProcessGuid}/steps/${params.stepGuid}`,
        { params: queryParams },
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Quality Process Step by GUID",
      );
    }
  },
});
