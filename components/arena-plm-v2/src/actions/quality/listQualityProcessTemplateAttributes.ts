import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessTemplateAttributesExamplePayload } from "../../examplePayloads";
import { listQualityProcessTemplateAttributesInputs } from "../../inputs";
import { listQualityProcessTemplateAttributesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessTemplateAttributes = action({
  display: {
    label: "List Quality Process Template Attributes",
    description:
      "List all attributes for a specific quality process template from Arena PLM system.",
  },
  inputs: listQualityProcessTemplateAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityProcessTemplateAttributesOutputSchema,
  }),
  examplePayload: listQualityProcessTemplateAttributesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        includePossibleValues: params.includePossibleValues,
        creatableOnly: params.creatableOnly,
        editableOnly: params.editableOnly,
        searchableOnly: params.searchableOnly,
        includeDeleted: params.includeDeleted,
      };
      const { data } = await client.get(
        `/settings/qualityprocesses/templates/${params.templateGuid}/attributes`,
        { params: queryParams },
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Quality Process Template Attributes",
      );
    }
  },
});
