import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTicketExamplePayload as examplePayload } from "../../examplePayloads/tickets";
import { createTicketInputs as inputs } from "../../inputs/tickets";
import type { CreateTicketResponse } from "../../interfaces/tickets";
export const createTicket = action({
  display: {
    label: "Create Ticket",
    description: "Create a new ticket.",
  },
  perform: async (
    context,
    { connection, ticketTimestamps, additionalFields, ...body },
  ) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).post<CreateTicketResponse>("/tickets", {
      ...body,
      ...ticketTimestamps,
      ...additionalFields,
    });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
