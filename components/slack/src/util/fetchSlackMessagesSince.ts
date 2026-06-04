import type { Connection } from "@prismatic-io/spectral";
import { createOauthClient } from "../client";
import type { SlackMessage } from "../types";

const MAX_POLL_PAGES = 100;
const PAGE_SIZE = 200;










export const fetchSlackMessagesSince = async (
  connection: Connection,
  channel: string,
  oldest: string
): Promise<{ messages: SlackMessage[]; truncated: boolean }> => {
  const client = await createOauthClient({ slackConnection: connection });
  if (!client) {
    throw new Error("Failed to initialize Slack client for polling.");
  }
  const messages: SlackMessage[] = [];
  let cursor: string | undefined;
  let pages = 0;
  let hasMore = true;
  while (hasMore && pages < MAX_POLL_PAGES) {
    const result = await client.conversations.history({
      channel,
      oldest,
      limit: PAGE_SIZE,
      ...(cursor && { cursor }),
    });
    messages.push(...((result.messages ?? []) as SlackMessage[]));
    cursor = result.response_metadata?.next_cursor;
    hasMore = Boolean(result.has_more && cursor);
    pages++;
  }
  return { messages, truncated: hasMore };
};
