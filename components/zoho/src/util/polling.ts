import type { ActionContext } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import {
  DEFAULT_PER_PAGE,
  DEFAULT_POLLING_SORT_FIELD,
  DEFAULT_POLLING_SORT_ORDER,
} from "../constants";
import type {
  BooksChangesObject,
  BooksRecordChange,
  CRMChangesObject,
  CRMPollingCursor,
  CRMPollingState,
  CRMRecord,
  CRMRecordChange,
  CRMWindowParams,
  PollingState,
} from "../types";
import { toZohoTimestamp } from "./general";
const REJECTED_PAGE_TOKEN_CODES = [
  "EXPIRED_VALUE",
  "TOKEN_BOUND_DATA_MISMATCH",
];
export const resolvePollingStart = (
  state: PollingState,
  lookBackDate: string | undefined,
  now: Date,
): {
  sinceDate: Date;
  isBackfill: boolean;
} => {
  const held = state.lastPolledAt ?? state.lastUpdated;
  return {
    sinceDate: held ? new Date(held) : new Date(lookBackDate || now),
    isBackfill:
      state.backfillActive === true || (!held && Boolean(lookBackDate)),
  };
};
export const resolveCRMStream = (
  state: CRMPollingState,
  incoming: CRMPollingCursor | undefined,
  now: Date,
): {
  pageToken?: string;
  streamStartedAt: Date;
  restartedStream: boolean;
} => {
  const held = incoming ?? state;
  const resumable = Boolean(held.pageToken) && Boolean(held.streamStartedAt);
  return {
    pageToken: resumable ? held.pageToken : undefined,
    streamStartedAt: resumable ? new Date(held.streamStartedAt as string) : now,
    restartedStream: resumable && held.restartedStream === true,
  };
};
export const fetchCRMStreamWindow = async (
  context: ActionContext,
  {
    connection,
    recordType,
    fields,
    sinceDate,
    pageToken,
    restartedStream,
    maxPages,
  }: CRMWindowParams,
): Promise<{
  records: CRMRecord[];
  nextPageToken?: string;
  restarted: boolean;
}> => {
  const client = createClient(
    connection,
    ClientType.CRM,
    context.debug.enabled,
  );
  const headers = {
    "If-Modified-Since": toZohoTimestamp(sinceDate.toISOString()),
  };
  const fetchPage = async (token?: string) => {
    const params = {
      fields: fields.join(","),
      per_page: DEFAULT_PER_PAGE,
      sort_by: DEFAULT_POLLING_SORT_FIELD,
      sort_order: DEFAULT_POLLING_SORT_ORDER,
      ...(token ? { page_token: token } : {}),
    };
    try {
      const { data } = await client.get(`/${recordType}`, { params, headers });
      return data as {
        data: CRMRecord[];
        info?: {
          next_page_token?: string;
        };
      };
    } catch (error) {
      if (
        (
          error as {
            response?: {
              status?: number;
            };
          }
        )?.response?.status === 304
      ) {
        return { data: [] };
      }
      throw error;
    }
  };
  let token = pageToken;
  let held = Boolean(pageToken);
  let restarted = false;
  let records: CRMRecord[] = [];
  for (let page = 0; page < maxPages; page++) {
    let body: Awaited<ReturnType<typeof fetchPage>>;
    try {
      body = await fetchPage(token);
    } catch (error) {
      if (!token || !isRejectedPageToken(error)) throw error;
      const code = (
        error as {
          response: {
            data: {
              code: string;
            };
          };
        }
      ).response.data.code;
      if (!held || (restartedStream && code !== "EXPIRED_VALUE")) {
        throw new Error(
          `Zoho rejected the page_token ${held ? "of a stream that was already restarted" : "issued in this poll"} (${code}); the continuation request parameters may differ from the first request`,
          { cause: error },
        );
      }
      context.logger.warn(
        `Zoho rejected the held page_token for ${recordType} (${code}); restarting the stream from ${sinceDate.toISOString()}`,
      );
      token = undefined;
      restarted = true;
      records = [];
      body = await fetchPage();
    }
    held = false;
    records.push(...body.data);
    token = body.info?.next_page_token;
    if (!token) break;
  }
  return { records, nextPageToken: token, restarted };
};
export const buildCRMPollingCursor = (
  pageToken: string | undefined,
  streamStartedAt: Date,
  restartedStream: boolean,
): CRMPollingCursor | null =>
  pageToken
    ? {
        pageToken,
        streamStartedAt: streamStartedAt.toISOString(),
        ...(restartedStream ? { restartedStream } : {}),
      }
    : null;
export const buildCRMPollingState = (
  next: CRMPollingCursor | null,
  streamStartedAt: Date,
  sinceDate: Date,
  isBackfill: boolean,
): CRMPollingState => ({
  ...(next ? next : {}),
  lastPolledAt: (next ? sinceDate : streamStartedAt).toISOString(),
  ...(isBackfill && next ? { backfillActive: true } : {}),
});
export const resolveCRMRecordChanges = (
  data: CRMChangesObject | undefined,
): CRMRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): CRMRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): CRMRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const resolveBooksRecordChanges = (
  data: BooksChangesObject | undefined,
): BooksRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): BooksRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): BooksRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const isRejectedPageToken = (error: unknown): boolean => {
  const response = (
    error as {
      response?: {
        status?: number;
        data?: {
          code?: string;
        };
      };
    }
  )?.response;
  return (
    response?.status === 400 &&
    REJECTED_PAGE_TOKEN_CODES.includes(response.data?.code ?? "")
  );
};
