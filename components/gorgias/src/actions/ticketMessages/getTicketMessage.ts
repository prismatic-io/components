import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTicketMessageInputs as inputs } from "../../inputs/ticketMessages";
import type { GetTicketMessageResponse } from "../../interfaces/ticketMessages";
import { getTicketMessageExamplePayload as examplePayload } from "../../examplePayloads/ticketMessages";

export const getTicketMessage = action({
  display: {
    label: "Get Ticket Message",
    description: "Retrieve a message.",
  },
  perform: async (context, { connection, ticket_id, id }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).get<GetTicketMessageResponse>(`tickets/${ticket_id}/messages/${id}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
