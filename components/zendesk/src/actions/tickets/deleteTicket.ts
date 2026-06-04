import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { ticketId, connectionInput } from "../../inputs";
import { successMessagePayload } from "../../examplePayloads";

import { SUCCESS_MESSAGE } from "../../constants";

export const deleteTicket = action({
  display: {
    label: "Delete Ticket",
    description: "Delete a ticket by ID.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    await client.tickets.delete(util.types.toInt(params.ticketId));

    return {
      data: SUCCESS_MESSAGE,
    };
  },
  inputs: {
    ticketId,
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: successMessagePayload,
  },
});
