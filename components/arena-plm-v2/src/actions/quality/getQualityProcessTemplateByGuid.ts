import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getQualityProcessTemplateByGuidExamplePayload } from "../../examplePayloads";
import { getQualityProcessTemplateByGuidInputs } from "../../inputs";
import { qualityTemplateSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getQualityProcessTemplateByGuid = action({
  display: {
    label: "Get Quality Process Template by GUID",
    description:
      "Get details of a specific quality process template by GUID from Arena PLM system.",
  },
  inputs: getQualityProcessTemplateByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityTemplateSchema,
  }),
  examplePayload: getQualityProcessTemplateByGuidExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/settings/qualityprocesses/templates/${params.templateGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Quality Process Template by GUID",
      );
    }
  },
});
