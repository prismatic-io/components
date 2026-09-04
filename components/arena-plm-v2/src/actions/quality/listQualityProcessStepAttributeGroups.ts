import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessStepAttributeGroupsExamplePayload } from "../../examplePayloads";
import { listQualityProcessStepAttributeGroupsInputs } from "../../inputs";
import { attributeGroupFullSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessStepAttributeGroups = action({
  display: {
    label: "List Quality Process Step Attribute Groups",
    description:
      "List attribute groups for quality process steps from Arena PLM system.",
  },
  inputs: listQualityProcessStepAttributeGroupsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeGroupFullSchema,
  }),
  examplePayload: listQualityProcessStepAttributeGroupsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        "/settings/qualityprocesses/steps/attributegroups",
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Quality Process Step Attribute Groups",
      );
    }
  },
});
