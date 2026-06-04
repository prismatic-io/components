import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTicketResponse } from "../../examplePayloads";
import {
  companyId,
  connectionInput,
  contactId,
  ticketAttributes,
  ticketTypeId,
} from "../../inputs";

export const createTicket = action({
  display: {
    label: "Create Ticket",
    description: "Create a new Ticket",
  },
  inputs: {
    ticketTypeId,
    contactId,
    companyId,
    ticketAttributes,
    connection: connectionInput,
  },
  perform: async (
    context,
    { connection, companyId, contactId, ticketAttributes, ticketTypeId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/tickets", {
      ticket_type_id: ticketTypeId,
      contacts: [{ id: contactId }],
      company_id: companyId,
      ticketAttributes,
    });
    return { data };
  },
  examplePayload: { data: createTicketResponse },
});
