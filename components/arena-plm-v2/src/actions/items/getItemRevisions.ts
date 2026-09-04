import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getItemRevisionsExamplePayload } from "../../examplePayloads";
import { getItemRevisionsInputs } from "../../inputs";
import { getItemRevisionsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getItemRevisions = action({
  display: {
    label: "Get Item Revisions",
    description:
      "Retrieve all version information (working, effective, past revisions) of an item.",
  },
  inputs: getItemRevisionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getItemRevisionsOutputSchema,
  }),
  examplePayload: getItemRevisionsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/items/${util.types.toString(params.itemGuid)}/revisions`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Item Revisions");
    }
  },
});
