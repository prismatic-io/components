import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeItemsExamplePayload } from "../../examplePayloads";
import { listChangeItemsInputs } from "../../inputs";
import { listChangeItemsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeItems = action({
  display: {
    label: "List Change Items",
    description:
      "Returns all Change Affected Items included in a change with a given GUID. The response includes inventory disposition and information about each view of each item, including whether it is included in the change and whether it contains modifications to the working revision.",
  },
  inputs: listChangeItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeItemsOutputSchema,
  }),
  examplePayload: listChangeItemsExamplePayload,
  perform: async (context, { connection, changeGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Getting change items from Arena", {
        changeGuid: changeGuid,
      });
      const { data, status } = await client.get(`/changes/${changeGuid}/items`);
      context.logger.info("Change items retrieved successfully", {
        changeGuid: changeGuid,
        itemCount: data.results?.length || 0,
        statusCode: status,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "List Change Items");
    }
  },
});
