import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTicketMessageInputs as inputs } from "../../inputs/ticketMessages";
import type { CreateTicketMessageResponse } from "../../interfaces/ticketMessages";
import { createTicketMessageExamplePayload as examplePayload } from "../../examplePayloads/ticketMessages";

export const createTicketMessage = action({
  display: {
    label: "Create Ticket Message",
    description: "Create a message for a ticket.",
  },
  perform: async (context, { connection, ticket_id, action, ...body }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).post<CreateTicketMessageResponse>(
      `/tickets/${ticket_id}/messages`,
      body,
      { params: action },
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
