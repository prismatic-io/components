import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { MESSAGES } from "../../constants";
import { successEmptyExamplePayload as examplePayload } from "../../examplePayloads/shared";
import { deleteTicketInputs } from "../../inputs/tickets";
export const deleteTicket = action({
  display: {
    label: "Delete Ticket",
    description: "Delete a ticket.",
  },
  perform: async (context, { connection, id }) => {
    await createClient({
      connection,
      debug: context.debug.enabled,
    }).delete(`/tickets/${id}`);
    return {
      data: { message: MESSAGES.SUCCESS },
    };
  },
  inputs: deleteTicketInputs,
  examplePayload,
});
