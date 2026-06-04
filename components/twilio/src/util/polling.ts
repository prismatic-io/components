import type { Connection } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import type { TwilioMessage } from "../types";

const MAX_POLL_LIMIT = 10000;
const POLL_PAGE_SIZE = 100;











export const fetchMessagesSince = async (
  connection: Connection,
  dateSentAfter: Date,
  debug: boolean,
  from?: string,
  to?: string,
): Promise<{ messages: TwilioMessage[]; truncated: boolean }> => {
  const client = createAuthorizedClient(connection, debug);
  const messages = await client.messages.list({
    dateSentAfter,
    ...(from && { from }),
    ...(to && { to }),
    pageSize: POLL_PAGE_SIZE,
    limit: MAX_POLL_LIMIT,
  });
  return {
    messages: messages.map((m) => m.toJSON()) as TwilioMessage[],
    truncated: messages.length >= MAX_POLL_LIMIT,
  };
};
