import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateRequirementTraceExamplePayload } from "../../examplePayloads";
import { updateRequirementTraceInputs } from "../../inputs";
import { requirementTraceSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateRequirementTrace = action({
  display: {
    label: "Update Requirement Trace",
    description: "Update an existing trace link for a requirement.",
  },
  inputs: updateRequirementTraceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementTraceSchema,
  }),
  examplePayload: updateRequirementTraceExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: Record<string, unknown> = {};
      if (params.relationshipTypeGuid)
        requestPayload.relationshipType = {
          guid: params.relationshipTypeGuid,
        };
      if (params.suspected != null)
        requestPayload.suspected = util.types.toBool(params.suspected);
      const { data } = await client.put(
        `/requirements/${params.requirementGuid}/trace/${params.traceLinkGuid}`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Requirement Trace");
    }
  },
});
