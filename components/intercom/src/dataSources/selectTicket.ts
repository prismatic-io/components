import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTicketInputs } from "../inputs";
import type { Pages, Ticket } from "../interfaces";

export const selectTicket = dataSource({
  display: {
    label: "Select Ticket",
    description: "A Picklist of Intercom open tickets",
  },
  dataSourceType: "picklist",
  inputs: selectTicketInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    let startingAfter: string | undefined;
    const allTickets: Ticket[] = [];
    do {
      const { data } = await client.post<{
        tickets: Ticket[];
        pages: Pages | null;
      }>("/tickets/search", {
        query: {
          field: "open",
          operator: "=",
          value: true,
        },
        pagination: {
          per_page: 50,
          starting_after: startingAfter,
        },
      });
      allTickets.push(...(data.tickets || []));
      startingAfter = data.pages?.next?.starting_after;
    } while (startingAfter);

    const result = allTickets.map((ticket: Ticket): Element => {
      const label =
        ticket.ticket_attributes?._default_title_ ||
        `Ticket ${ticket.ticket_id}`;

      return {
        label,
        key: ticket.id,
      };
    });

    return {
      result,
    };
  },
});
