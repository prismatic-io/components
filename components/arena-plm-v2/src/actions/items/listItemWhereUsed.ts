import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemWhereUsedExamplePayload } from "../../examplePayloads";
import { listItemWhereUsedInputs } from "../../inputs";
import { listItemWhereUsedOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listItemWhereUsed = action({
  display: {
    label: "List Item Where Used",
    description:
      "Retrieve upper assembly information where the item is used as a BOM component.",
  },
  inputs: listItemWhereUsedInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemWhereUsedOutputSchema,
  }),
  examplePayload: listItemWhereUsedExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/items/${util.types.toString(params.itemGuid)}/whereused`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Item Where Used");
    }
  },
});
