import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteTicketInputs as inputs } from "../../inputs/tickets";

export const deleteTicket = action({
  display: {
    label: "Delete Ticket",
    description: "Deletes a ticket by ID.",
  },
  perform: async (context, { connection, ticketId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    await client.delete(`/tickets/${ticketId}`);

    return SUCCESS_RESPONSE;
  },
  inputs,
  examplePayload,
});
