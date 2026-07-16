import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTicketExamplePayload as examplePayload } from "../../examplePayloads/tickets";
import { getTicketInputs as inputs } from "../../inputs/tickets";
import type { GetTicketResponse } from "../../interfaces/tickets";
export const getTicket = action({
  display: {
    label: "Get Ticket",
    description: "Retrieve a ticket.",
  },
  perform: async (context, { connection, id, ...configVars }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).get<GetTicketResponse>(`/tickets/${id}`, {
      params: configVars,
      paramsSerializer: { indexes: null },
    });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
