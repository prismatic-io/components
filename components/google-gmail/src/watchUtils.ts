import { gmail_v1 } from "@googleapis/gmail";
import Gmail = gmail_v1.Gmail;






export const createWatchFn = async (
  client: Gmail,
  userId: string,
  topicName: string,
  labelIds: string[] = [],
): Promise<gmail_v1.Schema$WatchResponse> => {
  const requestBody: gmail_v1.Schema$WatchRequest = {
    topicName,
  };

  if (labelIds.length > 0) {
    requestBody.labelIds = labelIds;
  }

  const { data } = await client.users.watch({
    userId,
    requestBody,
  });

  if (!data.historyId || !data.expiration) {
    throw new Error("Gmail watch response missing historyId or expiration");
  }

  return data;
};







export const parseWatchExpiration = (expiration: string): Date => {
  return new Date(Number(expiration));
};
