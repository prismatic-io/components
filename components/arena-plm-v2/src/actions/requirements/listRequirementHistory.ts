import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementHistoryExamplePayload } from "../../examplePayloads";
import { listRequirementHistoryInputs } from "../../inputs";
import { querySchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementHistory = action({
  display: {
    label: "List Requirement History",
    description: "Get the change history for a requirement.",
  },
  inputs: listRequirementHistoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: querySchema,
  }),
  examplePayload: listRequirementHistoryExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/history`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirement History");
    }
  },
});
