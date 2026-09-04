import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemHistoryExamplePayload } from "../../examplePayloads";
import { listItemHistoryInputs } from "../../inputs";
import { listItemHistoryOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listItemHistory = action({
  display: {
    label: "List Item History",
    description: "Retrieve the complete history of changes made to an item.",
  },
  inputs: listItemHistoryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemHistoryOutputSchema,
  }),
  examplePayload: listItemHistoryExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/items/${util.types.toString(params.itemGuid)}/history`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Item History");
    }
  },
});
