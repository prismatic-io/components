import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTicketMessageExamplePayload as examplePayload } from "../../examplePayloads/ticketMessages";
import { createTicketMessageInputs as inputs } from "../../inputs/ticketMessages";
import type { CreateTicketMessageResponse } from "../../interfaces/ticketMessages";
export const createTicketMessage = action({
  display: {
    label: "Create Ticket Message",
    description: "Create a message for a ticket.",
  },
  perform: async (
    context,
    { connection, ticket_id, messageTimestamps, additionalFields, ...body },
  ) => {
    const { action: actionParam, ...additionalFieldsBody } = additionalFields;
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).post<CreateTicketMessageResponse>(
      `/tickets/${ticket_id}/messages`,
      {
        ...body,
        ...messageTimestamps,
        ...additionalFieldsBody,
      },
      { params: { action: actionParam } },
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
