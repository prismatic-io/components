import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementTemplateAttributesExamplePayload } from "../../examplePayloads";
import { listRequirementTemplateAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementTemplateAttributes = action({
  display: {
    label: "List Requirement Template Attributes",
    description: "List all attributes for a specific requirement template.",
  },
  inputs: listRequirementTemplateAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listRequirementTemplateAttributesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        includePossibleValues: params.includePossibleValues,
        creatableOnly: params.creatableOnly,
        editableOnly: params.editableOnly,
        searchableOnly: params.searchableOnly,
      };
      const { data } = await client.get(
        `/settings/requirements/templates/${params.templateGuid}/attributes`,
        { params: queryParams },
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Requirement Template Attributes",
      );
    }
  },
});
