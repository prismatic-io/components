import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequirementTemplateExamplePayload } from "../../examplePayloads";
import { getRequirementTemplateInputs } from "../../inputs";
import { verifyTemplateSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequirementTemplate = action({
  display: {
    label: "Get Requirement Template",
    description: "Get details of a specific requirement template.",
  },
  inputs: getRequirementTemplateInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: verifyTemplateSchema,
  }),
  examplePayload: getRequirementTemplateExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/settings/requirements/templates/${params.requirementTemplateGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Requirement Template");
    }
  },
});
