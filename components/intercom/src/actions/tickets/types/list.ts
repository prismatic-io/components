import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listTicketTypesResponse } from "../../../examplePayloads";
import { connectionInput } from "../../../inputs";

export const listTicketTypes = action({
  display: {
    label: "List Ticket Types",
    description: "Get a list of all ticket types for a workspace.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/ticket_types");
    return { data };
  },
  examplePayload: {
    data: listTicketTypesResponse,
  },
});
