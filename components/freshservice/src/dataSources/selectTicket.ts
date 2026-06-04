import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectTicketInputs as inputs } from "../inputs/dataSources";
import type { Ticket } from "../types/dataSourceTypes";
import { getListData } from "../util";

export const selectTicket = dataSource({
  display: {
    label: "Select Ticket",
    description: "Select a ticket from a list of tickets.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, filter }) => {
    const client = createFreshserviceClient(connection, false);

    const { data } = await getListData<Ticket, "tickets">(
      client,
      `/tickets`,
      "tickets",
      true,
      {
        filter,
      },
    );

    const objects = (data.tickets || []).map<Element>(({ id, subject }) => ({
      key: util.types.toString(id),
      label: subject,
    }));

    return { result: objects };
  },
});
