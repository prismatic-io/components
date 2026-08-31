import type { Connection } from "@prismatic-io/spectral";
import { createStripeClient } from "../client";
import type { StripeEvent } from "../types";
const MAX_POLL_PAGES = 100;
const POLL_PAGE_SIZE = 100;
export const fetchEventsSince = async (
  connection: Connection,
  createdGte: number,
  types: string[] | undefined,
): Promise<{
  events: StripeEvent[];
  truncated: boolean;
}> => {
  const client = createStripeClient({ stripeConnection: connection });
  const events: StripeEvent[] = [];
  let startingAfter: string | undefined;
  let pages = 0;
  let hasMore = true;
  while (hasMore && pages < MAX_POLL_PAGES) {
    const result = await client.events.list({
      created: { gte: createdGte },
      ...(types && types.length > 0 && { types }),
      limit: POLL_PAGE_SIZE,
      ...(startingAfter && { starting_after: startingAfter }),
    });
    events.push(...(result.data as unknown as StripeEvent[]));
    hasMore = result.has_more;
    if (hasMore && result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
    pages++;
  }
  return { events, truncated: hasMore };
};
