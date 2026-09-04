import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementQualityExamplePayload } from "../../examplePayloads";
import { listRequirementQualityInputs } from "../../inputs";
import { referencedQualityListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementQuality = action({
  display: {
    label: "List Requirement Quality",
    description: "List all quality processes linked to a requirement.",
  },
  inputs: listRequirementQualityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: referencedQualityListSchema,
  }),
  examplePayload: listRequirementQualityExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/quality`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirement Quality");
    }
  },
});
