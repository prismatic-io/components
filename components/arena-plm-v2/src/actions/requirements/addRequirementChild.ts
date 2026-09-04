import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addRequirementChildExamplePayload } from "../../examplePayloads";
import { addRequirementChildInputs } from "../../inputs";
import { requirementListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addRequirementChild = action({
  display: {
    label: "Add Requirement Child",
    description: "Add a child requirement to a requirement.",
  },
  inputs: addRequirementChildInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementListSchema,
  }),
  examplePayload: addRequirementChildExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.post(
        `/requirements/${params.requirementGuid}/children`,
        { requirement: { guid: params.childRequirementGuid } },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Requirement Child");
    }
  },
});
