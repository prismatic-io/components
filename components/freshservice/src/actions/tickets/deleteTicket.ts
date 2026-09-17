import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteTicketInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
export const deleteTicket = action({
  display: {
    label: "Delete Ticket",
    description: "Deletes a ticket by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, ticketId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(`/tickets/${ticketId}`);
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
