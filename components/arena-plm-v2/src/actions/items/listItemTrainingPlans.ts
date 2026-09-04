import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemTrainingPlansExamplePayload } from "../../examplePayloads";
import { listItemTrainingPlansInputs } from "../../inputs";
import { querySchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listItemTrainingPlans = action({
  display: {
    label: "List Item Training Plans",
    description: "Retrieve training plans associated with an item.",
  },
  inputs: listItemTrainingPlansInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: querySchema,
  }),
  examplePayload: listItemTrainingPlansExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/items/${util.types.toString(params.itemGuid)}/trainingplans`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Item Training Plans");
    }
  },
});
