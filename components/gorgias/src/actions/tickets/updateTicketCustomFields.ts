import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateTicketCustomFieldsInputs as inputs } from "../../inputs/tickets";
import type { UpdateTicketCustomFieldsResponse } from "../../interfaces/tickets";
import { updateTicketCustomFieldsExamplePayload as examplePayload } from "../../examplePayloads/tickets";

export const updateTicketCustomFields = action({
  display: {
    label: "Update Ticket Custom Fields",
    description: "Update a ticket's custom fields values.",
  },
  perform: async (context, { connection, ticket_id, custom_fields }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).put<UpdateTicketCustomFieldsResponse>(
      `/tickets/${ticket_id}/custom-fields`,
      custom_fields,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
