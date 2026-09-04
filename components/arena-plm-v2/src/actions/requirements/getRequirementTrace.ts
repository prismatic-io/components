import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequirementTraceExamplePayload } from "../../examplePayloads";
import { getRequirementTraceInputs } from "../../inputs";
import { requirementTraceSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequirementTrace = action({
  display: {
    label: "Get Requirement Trace",
    description: "Get a specific trace link for a requirement.",
  },
  inputs: getRequirementTraceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementTraceSchema,
  }),
  examplePayload: getRequirementTraceExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/trace/${params.traceLinkGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Requirement Trace");
    }
  },
});
