import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { getTicketInputs as inputs } from "../../inputs/tickets";

export const getTicket = action({
  display: {
    label: "Get Ticket",
    description: "Retrieves details of a ticket by ID.",
  },
  perform: async (context, { connection, ticketId, additionalQueryParams }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/tickets/${ticketId}`, {
      params: additionalQueryParams,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
