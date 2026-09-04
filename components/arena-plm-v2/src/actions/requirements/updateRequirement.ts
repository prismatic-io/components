import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateRequirementExamplePayload } from "../../examplePayloads";
import { updateRequirementInputs } from "../../inputs";
import { requirementSchema } from "../../outputSchemas";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateRequirement = action({
  display: {
    label: "Update Requirement",
    description: "Update an existing requirement.",
  },
  inputs: updateRequirementInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementSchema,
  }),
  examplePayload: updateRequirementExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: Record<string, unknown> = {
        title: params.title,
        description: params.description,
        priority: params.priority,
        assignee: params.assigneeGuid
          ? { guid: params.assigneeGuid }
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
      const queryParams = { setnull: params.setNull };
      const { data } = await client.put(
        `/requirements/${params.requirementGuid}`,
        requestPayload,
        { params: queryParams },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Requirement");
    }
  },
});
