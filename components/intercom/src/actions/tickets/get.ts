import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTicketResponse } from "../../examplePayloads";
import { connectionInput, idInput } from "../../inputs";

export const getTicket = action({
  display: {
    label: "Retrieve a ticket",
    description: "Retrieve a ticket by ID",
  },
  inputs: {
    ticketId: {
      ...idInput,
      label: "Ticket ID",
      comments: "ID of the ticket to retrieve.",
      required: true,
      example: "5ba682d23d7cf92bef87bfd4",
      placeholder: "5ba682d23d7cf92bef87bfd4",
      dataSource: "selectTicket",
    },
    connection: connectionInput,
  },
  perform: async (context, { connection, ticketId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/tickets/${ticketId}`);
    return { data };
  },
  examplePayload: {
    data: getTicketResponse,
  },
});
