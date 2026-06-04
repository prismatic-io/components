import type { gmail_v1 } from "@googleapis/gmail";

export const getStartHistoryId = async (
  client: gmail_v1.Gmail,
  userId: string,
): Promise<string | undefined> => {
  const res = await client.users.messages.list({
    userId,
    maxResults: 1,
  });
  const messageId = res.data.messages?.[0]?.id;

  if (!messageId) {
    return undefined;
  }

  const msg = await client.users.messages.get({
    userId,
    id: messageId,
    format: "metadata",
  });
  return msg.data.historyId;
};
