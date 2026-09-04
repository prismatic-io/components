import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequirementParentExamplePayload } from "../../examplePayloads";
import { getRequirementParentInputs } from "../../inputs";
import { requirementListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequirementParent = action({
  display: {
    label: "Get Requirement Parent",
    description: "Get parent requirements for a requirement.",
  },
  inputs: getRequirementParentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementListSchema,
  }),
  examplePayload: getRequirementParentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/parent`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Requirement Parent");
    }
  },
});
