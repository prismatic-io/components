import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessStepAttributesExamplePayload } from "../../examplePayloads";
import { listQualityProcessStepAttributesInputs } from "../../inputs";
import { attributeDefinitionFullRepListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessStepAttributes = action({
  display: {
    label: "List Quality Process Step Attributes",
    description:
      "List all attributes for quality process steps from Arena PLM system.",
  },
  inputs: listQualityProcessStepAttributesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attributeDefinitionFullRepListSchema,
  }),
  examplePayload: listQualityProcessStepAttributesExamplePayload,
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
        "/settings/qualityprocesses/steps/attributes",
        {
          params: queryParams,
        },
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Quality Process Step Attributes",
      );
    }
  },
});
