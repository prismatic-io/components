import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { MESSAGES } from "../../constants";
import { deleteTicketCustomFieldInputs as inputs } from "../../inputs/tickets";
import { successEmptyExamplePayload as examplePayload } from "../../examplePayloads/shared";

export const deleteTicketCustomField = action({
  display: {
    label: "Delete Ticket Custom Field",
    description: "Delete a ticket's custom field value.",
  },
  perform: async (context, { connection, ticket_id, id }) => {
    await createClient({
      connection,
      debug: context.debug.enabled,
    }).delete(`/tickets/${ticket_id}/custom-fields/${id}`);

    return {
      data: { message: MESSAGES.SUCCESS },
    };
  },
  inputs,
  examplePayload,
});
