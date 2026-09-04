import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeHistoryExamplePayload } from "../../examplePayloads";
import { listChangeHistoryInputs } from "../../inputs";
import { listChangeHistoryOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeHistory = action({
  display: {
    label: "List Change History",
    description: "Retrieve the history of a specific change.",
  },
  inputs: listChangeHistoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeHistoryOutputSchema,
  }),
  examplePayload: listChangeHistoryExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/history`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Change History");
    }
  },
});
