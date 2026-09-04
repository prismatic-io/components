import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addItemToRequestExamplePayload } from "../../examplePayloads";
import { addItemToRequestInputs } from "../../inputs";
import { requestItemSchema } from "../../outputSchemas";
import type { RequestItemCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addItemToRequest = action({
  display: {
    label: "Add Item to Request",
    description: "Add an item to a request in Arena PLM system.",
  },
  inputs: addItemToRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestItemSchema,
  }),
  examplePayload: addItemToRequestExamplePayload,
  perform: async (context, { connection, requestGuid, itemGuid, notes }) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: RequestItemCreateVo = {
        item: { guid: itemGuid },
      };
      if (notes) {
        requestPayload.notes = notes;
      }
      context.logger.info(`Adding item ${itemGuid} to request ${requestGuid}`);
      const { data } = await client.post(
        `/requests/${requestGuid}/items`,
        requestPayload,
      );
      context.logger.info(
        `Successfully added item to request: ${data?.guid || "N/A"}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Add Item to Request");
    }
  },
});
