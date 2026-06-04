import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { MESSAGES } from "../../constants";
import { deleteTicketInputs } from "../../inputs/tickets";
import { successEmptyExamplePayload as examplePayload } from "../../examplePayloads/shared";

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
