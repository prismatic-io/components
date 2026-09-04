import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getQualityProcessStepAttributeGroupByGuidExamplePayload } from "../../examplePayloads";
import { getQualityProcessStepAttributeGroupByGuidInputs } from "../../inputs";
import { attributeGroupFullSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getQualityProcessStepAttributeGroupByGuid = action({
  display: {
    label: "Get Quality Process Step Attribute Group by GUID",
    description:
      "Get details of a specific attribute group for quality process steps by GUID from Arena PLM system.",
  },
  inputs: getQualityProcessStepAttributeGroupByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeGroupFullSchema,
  }),
  examplePayload: getQualityProcessStepAttributeGroupByGuidExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/settings/qualityprocesses/steps/attributegroups/${params.attributeGroupGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Quality Process Step Attribute Group by GUID",
      );
    }
  },
});
