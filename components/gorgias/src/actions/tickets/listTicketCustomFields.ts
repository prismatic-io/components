import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTicketCustomFieldsInputs as inputs } from "../../inputs/tickets";
import type { ListTicketCustomFieldsResponse } from "../../interfaces/tickets";
import { listTicketCustomFieldsExamplePayload as examplePayload } from "../../examplePayloads/tickets";

export const listTicketCustomFields = action({
  display: {
    label: "List Ticket Custom Fields",
    description: "List all custom fields for a ticket.",
  },
  perform: async (context, { connection, ticket_id }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).get<ListTicketCustomFieldsResponse>(
      `/tickets/${ticket_id}/custom-fields`,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
