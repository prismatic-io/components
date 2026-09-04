import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getRequirementExamplePayload } from "../../examplePayloads";
import { getRequirementInputs } from "../../inputs";
import { requirementSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getRequirement = action({
  display: {
    label: "Get Requirement",
    description: "Get details of a specific requirement by GUID.",
  },
  inputs: getRequirementInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementSchema,
  }),
  examplePayload: getRequirementExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Requirement");
    }
  },
});
