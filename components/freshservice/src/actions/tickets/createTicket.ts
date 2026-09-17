import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { createTicketInputs as inputs } from "../../inputs";
import { ticketOutputSchema } from "../../outputSchemas";
export const createTicket = action({
  display: {
    label: "Create Ticket",
    description: "Creates a new ticket in Freshservice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      description,
      subject,
      email,
      priority,
      status,
      ccEmails,
      workspaceId,
      ticketsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      description,
      subject,
      email,
      priority,
      status,
      cc_emails: ccEmails,
      workspace_id: workspaceId,
      ...ticketsAdditionalFields,
    };
    const { data } = await client.post(`/tickets`, payload);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketOutputSchema,
  }),
  inputs,
  examplePayload,
});
