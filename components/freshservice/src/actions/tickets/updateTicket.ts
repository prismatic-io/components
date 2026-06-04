import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { updateTicketInputs as inputs } from "../../inputs/tickets";

export const updateTicket = action({
  display: {
    label: "Update Ticket",
    description: "Updates an existing ticket.",
  },
  perform: async (
    context,
    {
      connection,
      ticketId,
      priority,
      status,
      source,
      bypassMandatory,
      ticketsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const payload = {
      priority,
      status,
      source,
      ...ticketsAdditionalFields,
    };

    const { data } = await client.put(`/tickets/${ticketId}`, payload, {
      params: {
        bypass_mandatory: bypassMandatory,
      },
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
