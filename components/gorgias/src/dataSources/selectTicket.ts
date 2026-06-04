import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTicketInputs as inputs } from "../inputs/tickets";
import type { ListTicketsResponse } from "../interfaces/tickets";
import { selectTicketExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { fetchAllWithPagination } from "../utils/fetchAllWithPagination";

export const selectTicket = dataSource({
  display: {
    label: "Select Ticket",
    description: "Select a ticket from a list of tickets.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection, ...configVars }) => {
    const client = createClient({
      connection,
      debug: false,
    });

    const { data } = await fetchAllWithPagination<ListTicketsResponse>({
      client,
      configVars,
      endpoint: "/tickets",
    });

    const result = data.data.map<Element>((ticket) => ({
      label: ticket.subject ?? ticket.excerpt,
      key: util.types.toString(ticket.id),
    }));

    return {
      result,
    };
  },
  inputs,
  examplePayload,
});
