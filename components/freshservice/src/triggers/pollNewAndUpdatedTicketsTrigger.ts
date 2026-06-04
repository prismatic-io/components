import { pollingTrigger } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { MAX_ITEMS_PER_PAGE } from "../constants";
import { connection, showNewRecords, showUpdatedRecords } from "../inputs";
import { cleanLinkHeader } from "../util";

interface Ticket {
  id: number;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

interface PollingState {
  lastPolledAt?: string;
}

export const pollNewAndUpdatedTicketsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Tickets",
    description:
      "Checks for new and updated tickets in Freshservice on a configured schedule.",
  },
  inputs: {
    connection,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt: string = pollState.lastPolledAt || now;

    context.logger.debug(
      `Polling Freshservice tickets from: ${lastPolledAt} to ${now}`,
    );

    const client = createFreshserviceClient(
      params.connection,
      context.debug.enabled,
    );

    const allTickets: Ticket[] = [];

    const firstResponse = await client.get("/tickets", {
      params: {
        updated_since: lastPolledAt,
        per_page: MAX_ITEMS_PER_PAGE,
      },
    });

    const firstPage: Ticket[] = firstResponse.data.tickets || [];
    allTickets.push(...firstPage);

    let nextLink: string | null = firstResponse.headers.link
      ? cleanLinkHeader(firstResponse.headers.link)
      : null;

    while (nextLink) {
      const { data: nextData, headers: nextHeaders } =
        await client.get(nextLink);
      const nextPage: Ticket[] = nextData.tickets || [];
      allTickets.push(...nextPage);
      nextLink = nextHeaders.link ? cleanLinkHeader(nextHeaders.link) : null;
    }

    const lastPolledDate = new Date(lastPolledAt);

    const created: Ticket[] = [];
    const updated: Ticket[] = [];

    for (const ticket of allTickets) {
      if (new Date(ticket.created_at) > lastPolledDate) {
        created.push(ticket);
      } else {
        updated.push(ticket);
      }
    }

    const filteredCreated = params.showNewRecords ? created : [];
    const filteredUpdated = params.showUpdatedRecords ? updated : [];

    const changes = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: filteredCreated,
            updated: filteredUpdated,
          },
        },
      },
      polledNoChanges: changes === 0,
    };
  },
});
