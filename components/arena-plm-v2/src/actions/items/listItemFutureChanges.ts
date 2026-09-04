import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemFutureChangesExamplePayload } from "../../examplePayloads";
import { listItemFutureChangesInputs } from "../../inputs";
import { listItemFutureChangesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listItemFutureChanges = action({
  display: {
    label: "List Item Future Changes",
    description: "Retrieve future changes that will affect this item.",
  },
  inputs: listItemFutureChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemFutureChangesOutputSchema,
  }),
  examplePayload: listItemFutureChangesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/items/${util.types.toString(params.itemGuid)}/futurechanges`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Item Future Changes");
    }
  },
});
