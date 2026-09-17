import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { getTicketInputs as inputs } from "../../inputs";
import { ticketOutputSchema } from "../../outputSchemas";
export const getTicket = action({
  display: {
    label: "Get Ticket",
    description: "Retrieves details of a ticket by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, ticketId, additionalQueryParams }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/tickets/${ticketId}`, {
      params: additionalQueryParams,
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketOutputSchema,
  }),
  inputs,
  examplePayload,
});
