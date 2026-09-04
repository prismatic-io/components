import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addRequirementQualityExamplePayload } from "../../examplePayloads";
import { addRequirementQualityInputs } from "../../inputs";
import { addRequirementQualityOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addRequirementQuality = action({
  display: {
    label: "Add Requirement Quality",
    description: "Link a quality process to a requirement.",
  },
  inputs: addRequirementQualityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addRequirementQualityOutputSchema,
  }),
  examplePayload: addRequirementQualityExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const qualityPayload: Record<string, unknown> = {
        guid: params.qualityGuid,
      };
      if (params.stepGuid) {
        qualityPayload.step = { guid: params.stepGuid };
      }
      const { data } = await client.post(
        `/requirements/${params.requirementGuid}/quality`,
        { quality: qualityPayload },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Requirement Quality");
    }
  },
});
