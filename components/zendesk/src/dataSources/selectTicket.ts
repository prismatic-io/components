import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { selectTicketExamplePayload } from "../examplePayloads";
import { selectTicketInputs } from "../inputs";
import { byElementLabel } from "../util";
export const selectTicket = dataSource({
  display: {
    label: "Select Ticket",
    description: "Select a ticket from the Zendesk account.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = createClient({
      zendeskConnection,
    });
    const result = await client.tickets.list();
    return {
      result: result
        .map<Element>((ticket) => ({
          label: `${ticket.id} - ${ticket.subject}`,
          key: util.types.toString(ticket.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectTicketInputs,
  dataSourceType: "picklist",
  examplePayload: selectTicketExamplePayload,
});
