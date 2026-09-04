import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addRequirementTraceExamplePayload } from "../../examplePayloads";
import { addRequirementTraceInputs } from "../../inputs";
import { requirementTraceSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addRequirementTrace = action({
  display: {
    label: "Add Requirement Trace",
    description: "Add a new trace link to a requirement.",
  },
  inputs: addRequirementTraceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementTraceSchema,
  }),
  examplePayload: addRequirementTraceExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: Record<string, unknown> = {
        direction: params.direction,
      };
      if (params.objectType) requestPayload.objectType = params.objectType;
      if (params.relationshipTypeGuid)
        requestPayload.relationshipType = {
          guid: params.relationshipTypeGuid,
        };
      if (params.itemGuid) requestPayload.item = { guid: params.itemGuid };
      if (params.targetRequirementGuid)
        requestPayload.requirement = { guid: params.targetRequirementGuid };
      const { data } = await client.post(
        `/requirements/${params.requirementGuid}/trace`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Requirement Trace");
    }
  },
});
