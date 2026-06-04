import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateTicketInputs as inputs } from "../../inputs/tickets";
import type { UpdateTicketResponse } from "../../interfaces/tickets";
import { updateTicketExamplePayload as examplePayload } from "../../examplePayloads/tickets";

export const updateTicket = action({
  display: {
    label: "Update Ticket",
    description: "Update a ticket.",
  },
  perform: async (context, { connection, id, ...body }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).put<UpdateTicketResponse>(`/tickets/${id}`, body);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
