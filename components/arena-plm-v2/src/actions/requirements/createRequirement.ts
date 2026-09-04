import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createRequirementExamplePayload } from "../../examplePayloads";
import { createRequirementInputs } from "../../inputs";
import { requirementSchema } from "../../outputSchemas";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createRequirement = action({
  display: {
    label: "Create Requirement",
    description: "Create a new requirement in Arena PLM.",
  },
  inputs: createRequirementInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementSchema,
  }),
  examplePayload: createRequirementExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: Record<string, unknown> = {
        title: params.title,
        template: params.templateGuid
          ? { guid: params.templateGuid }
          : undefined,
        description: params.description,
        priority: params.priority,
        assignee: params.assigneeGuid
          ? { guid: params.assigneeGuid }
          : undefined,
        number: params.number,
        numberSequencePrefix: params.numberSequencePrefix
          ? { value: params.numberSequencePrefix }
          : undefined,
      };
      requestPayload.additionalAttributes = resolveAdditionalAttributes(
        {
          additionalAttributeJson: params.additionalAttributeJson,
          additionalAttributes: params.additionalAttributes,
          attributeDefinitions: params.attributeDefinitions,
        },
        context,
      );
      const { data } = await client.post("/requirements", requestPayload);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Requirement");
    }
  },
});
