import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addTicketItemExamplePayload } from "../../examplePayloads";
import { addTicketItemInputs } from "../../inputs";
import { ticketItemSchema } from "../../outputSchemas";
import type { TicketItemCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addTicketItem = action({
  display: {
    label: "Add Ticket Item",
    description: "Link an item to a ticket in Arena PLM system.",
  },
  inputs: addTicketItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketItemSchema,
  }),
  examplePayload: addTicketItemExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: TicketItemCreateVo = {
        item: { guid: params.itemGuid },
      };
      if (
        params.latestRevisionAssociation !== null &&
        params.latestRevisionAssociation !== undefined
      ) {
        requestPayload.latestRevisionAssociation = util.types.toBool(
          params.latestRevisionAssociation,
        );
      }
      const { data } = await client.post(
        `/tickets/${params.ticketGuid}/items`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Ticket Item");
    }
  },
});
