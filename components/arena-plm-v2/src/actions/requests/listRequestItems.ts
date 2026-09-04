import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestItemsExamplePayload } from "../../examplePayloads";
import { listRequestItemsInputs } from "../../inputs";
import { listRequestItemsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestItems = action({
  display: {
    label: "List Request Items",
    description:
      "List all items associated with a request in Arena PLM system.",
  },
  inputs: listRequestItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequestItemsOutputSchema,
  }),
  examplePayload: listRequestItemsExamplePayload,
  perform: async (context, { connection, requestGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching items for request: ${requestGuid}`);
      const { data } = await client.get(`/requests/${requestGuid}/items`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} items for request`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Items");
    }
  },
});
