import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTicketInputs as inputs } from "../../inputs/tickets";
import type { CreateTicketResponse } from "../../interfaces/tickets";
import { createTicketExamplePayload as examplePayload } from "../../examplePayloads/tickets";

export const createTicket = action({
  display: {
    label: "Create Ticket",
    description: "Create a new ticket.",
  },
  perform: async (context, { connection, ...body }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).post<CreateTicketResponse>("/tickets", body);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
