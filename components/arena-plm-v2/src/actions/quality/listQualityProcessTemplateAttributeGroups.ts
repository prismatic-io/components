import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessTemplateAttributeGroupsExamplePayload } from "../../examplePayloads";
import { listQualityProcessTemplateAttributeGroupsInputs } from "../../inputs";
import { listQualityProcessTemplateAttributeGroupsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessTemplateAttributeGroups = action({
  display: {
    label: "List Quality Process Template Attribute Groups",
    description:
      "List attribute groups for a specific quality process template from Arena PLM system.",
  },
  inputs: listQualityProcessTemplateAttributeGroupsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityProcessTemplateAttributeGroupsOutputSchema,
  }),
  examplePayload: listQualityProcessTemplateAttributeGroupsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/settings/qualityprocesses/templates/${params.templateGuid}/attributegroups`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Quality Process Template Attribute Groups",
      );
    }
  },
});
