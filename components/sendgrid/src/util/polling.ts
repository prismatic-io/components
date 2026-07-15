import type { Client } from "@sendgrid/client";
import { MESSAGES_ENDPOINT, MESSAGES_MAX_LIMIT } from "../constants";
import type {
  FetchMessagesInWindowResult,
  MessagesResponse,
} from "../types/polling";
export async function fetchMessagesInWindow(
  client: Client,
  fromIso: string,
  toIso: string,
): Promise<FetchMessagesInWindowResult> {
  const query = `last_event_time BETWEEN TIMESTAMP "${fromIso}" AND TIMESTAMP "${toIso}"`;
  try {
    const [_response, body] = await client.request({
      method: "GET",
      url: MESSAGES_ENDPOINT,
      qs: {
        query,
        limit: MESSAGES_MAX_LIMIT,
      },
    });
    const records = (body as MessagesResponse)?.messages ?? [];
    return {
      records,
      truncated: records.length === MESSAGES_MAX_LIMIT,
    };
  } catch (error) {
    const status = (
      error as {
        code?: number;
      }
    )?.code;
    if (status === 401 || status === 403) {
      throw new Error(
        "SendGrid returned an authorization error while querying the Email Activity Feed. " +
          "Verify the API key has the 'Email Activity' permission and that the account has " +
          "the paid Email Activity History add-on enabled. " +
          "See https://www.twilio.com/docs/sendgrid/ui/account-and-settings/email-activity-feed.",
      );
    }
    throw error;
  }
}
