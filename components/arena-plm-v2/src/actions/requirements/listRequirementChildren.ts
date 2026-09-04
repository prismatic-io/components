import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementChildrenExamplePayload } from "../../examplePayloads";
import { listRequirementChildrenInputs } from "../../inputs";
import { requirementListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementChildren = action({
  display: {
    label: "List Requirement Children",
    description: "Get child requirements for a requirement.",
  },
  inputs: listRequirementChildrenInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementListSchema,
  }),
  examplePayload: listRequirementChildrenExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = { view: params.view };
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/children`,
        { params: queryParams },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirement Children");
    }
  },
});
