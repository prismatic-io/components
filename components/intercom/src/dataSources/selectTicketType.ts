import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTicketTypeInputs } from "../inputs";
import type { TicketType } from "../interfaces";

export const selectTicketType = dataSource({
  display: {
    label: "Select Ticket Type",
    description: "A Picklist of Intercom ticket types",
  },
  dataSourceType: "picklist",
  inputs: selectTicketTypeInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { data: ticketTypes },
    } = await client.get<{ data: TicketType[] }>("/ticket_types");

    const result = (ticketTypes || []).map(
      ({ id, name }: TicketType): Element => {
        return {
          label: name,
          key: id,
        };
      },
    );

    return {
      result,
    };
  },
});
