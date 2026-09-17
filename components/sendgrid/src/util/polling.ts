import type { Client } from "@sendgrid/client";
import {
  MESSAGES_ENDPOINT,
  MESSAGES_MAX_LIMIT,
  OVERLAP_MS,
  POLL_WINDOW_STEP_MS,
  RETENTION_WINDOW_MS,
} from "../constants";
import type {
  FetchMessagesInWindowResult,
  MessagesResponse,
  PollingChangesObject,
  PollingState,
  SendgridRecordChange,
} from "../types/polling";
export function computePollWindow(
  pollState: PollingState | undefined,
  nowMs: number = Date.now(),
  lookBackDate?: string,
): {
  fromIso: string;
  toIso: string;
} {
  const retentionFloorMs = nowMs - RETENTION_WINDOW_MS;
  const persistedMs = pollState?.lastPolledAt
    ? Date.parse(pollState.lastPolledAt)
    : Number.NaN;
  let fromMs: number;
  if (Number.isFinite(persistedMs)) {
    fromMs = Math.max(persistedMs, retentionFloorMs);
  } else if (lookBackDate) {
    fromMs = Math.max(Date.parse(lookBackDate), retentionFloorMs);
  } else {
    fromMs = retentionFloorMs;
  }
  const toMs = Math.min(fromMs + POLL_WINDOW_STEP_MS, nowMs - OVERLAP_MS);
  return {
    fromIso: new Date(fromMs).toISOString(),
    toIso: new Date(toMs).toISOString(),
  };
}
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
export function resolvePollingRecordChanges(
  data: PollingChangesObject | undefined,
): SendgridRecordChange[] {
  const { created, updated } = data ?? {};
  const changes: SendgridRecordChange[] = [];
  for (const record of created ?? []) {
    changes.push({ changeType: "created", record });
  }
  for (const record of updated ?? []) {
    changes.push({ changeType: "updated", record });
  }
  return changes;
}
