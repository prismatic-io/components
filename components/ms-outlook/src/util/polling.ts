import type { Connection } from "@prismatic-io/spectral";
import type { Message } from "@microsoft/microsoft-graph-types";
import type { HttpClient } from "@prismatic-io/spectral/http";
import type {
  MessageChange,
  MessageChangesObject,
  MessagesWindow,
  MessagesWindowParams,
  PaginatedResponse,
  PollingCursor,
  PollingState,
  PollingStream,
  PollingWindowRequest,
} from "../types";
import { createClient } from "../client";
import {
  MESSAGES_DEFAULT_ORDERBY,
  POLL_PAGE_SIZE,
  POLL_UNBATCHED_MAX_PAGES,
  POLLING_ENDPOINTS,
  WATERMARK_SKEW_MARGIN_MS,
} from "../constants";
import { computeEndpointBasedOnConnection } from "./connection";

const toWholeSecond = (value: string | number | Date): string => {
  const date = new Date(value);
  date.setUTCMilliseconds(0);
  return date.toISOString();
};

const modifiedStamp = (message: Message): string | undefined => {
  const parsed = message.lastModifiedDateTime
    ? Date.parse(message.lastModifiedDateTime)
    : Number.NaN;
  return Number.isNaN(parsed) ? undefined : toWholeSecond(parsed);
};

const safeHorizon = (now: Date): string => toWholeSecond(now.getTime() - WATERMARK_SKEW_MARGIN_MS);

const fetchMessagesWindow = async (
  client: HttpClient,
  connection: Connection,
  { position, horizonISO, folderId, pageSize, maxPages }: MessagesWindowParams,
): Promise<MessagesWindow> => {
  const endpoint = computeEndpointBasedOnConnection(
    connection,
    folderId ? POLLING_ENDPOINTS.MAIL_FOLDER_MESSAGES(folderId) : POLLING_ENDPOINTS.MESSAGES,
  );

  const messages: Message[] = [];
  let { watermark } = position;
  let boundaryIds = [...position.boundaryIds];

  const take = (rows: Message[]) => {
    for (const row of rows) {
      const stamp = modifiedStamp(row);
      if (stamp === undefined) {
        messages.push(row);
        continue;
      }
      if (stamp < watermark) continue;
      const id = row.id ?? "";
      if (stamp === watermark) {
        if (boundaryIds.includes(id)) continue;
        boundaryIds.push(id);
      } else {
        watermark = stamp;
        boundaryIds = [id];
      }
      messages.push(row);
    }
  };

  let drained = false;
  for (let page = 0; page < maxPages && !drained; page++) {
    const startWatermark = watermark;
    const startCount = boundaryIds.length;
    let { data } = await client.get<PaginatedResponse<Message>>(endpoint, {
      params: {
        $filter: `lastModifiedDateTime ge ${watermark} and lastModifiedDateTime le ${horizonISO}`,
        $orderby: MESSAGES_DEFAULT_ORDERBY,
        $top: pageSize,
      },
    });
    take(data.value ?? []);

    const noProgress = watermark === startWatermark && boundaryIds.length === startCount;
    if (data["@odata.nextLink"] && (noProgress || boundaryIds.length >= pageSize)) {
      const stalledAt = watermark;
      while (data["@odata.nextLink"] && watermark === stalledAt) {
        ({ data } = await client.get<PaginatedResponse<Message>>(data["@odata.nextLink"]));
        take(data.value ?? []);
      }
    }
    drained = !data["@odata.nextLink"];
  }
  return { messages, position: { watermark, boundaryIds }, drained };
};

const pollWindowBounds = (batching: boolean): { pageSize: number; maxPages: number } => ({
  pageSize: POLL_PAGE_SIZE,
  maxPages: batching ? 1 : POLL_UNBATCHED_MAX_PAGES,
});

export const readPollingWindow = async (
  connection: Connection,
  { position, folderId, skipFetch, batching, debug, now }: PollingWindowRequest,
): Promise<MessagesWindow> => {
  const horizonISO = safeHorizon(now);
  if (skipFetch) {
    return {
      messages: [],
      position:
        horizonISO > position.watermark ? { watermark: horizonISO, boundaryIds: [] } : position,
      drained: true,
    };
  }
  return fetchMessagesWindow(createClient(connection, debug), connection, {
    position,
    horizonISO,
    folderId,
    ...pollWindowBounds(batching),
  });
};

export const resolvePollingStart = (
  state: PollingState,
  lookBackDate: string | undefined,
  now: Date,
): { sinceDate: Date; isBackfill: boolean } => {
  const seedSince = lookBackDate ? new Date(lookBackDate) : now;
  return {
    sinceDate: state.lastPolledAt ? new Date(state.lastPolledAt) : seedSince,
    isBackfill: state.backfillActive === true || (!state.lastPolledAt && Boolean(lookBackDate)),
  };
};

export const resolvePollingStream = (
  state: PollingState,
  incoming: Partial<PollingCursor> | undefined,
  folderId: string | undefined,
  sinceDate: Date,
): PollingStream => {
  const resumable = (held: Partial<PollingCursor> | PollingState): boolean =>
    typeof held.watermark === "string" && (held.folderId ?? undefined) === folderId;
  const held = incoming && resumable(incoming) ? incoming : resumable(state) ? state : undefined;
  if (held?.watermark) {
    return {
      position: {
        watermark: toWholeSecond(held.watermark),
        boundaryIds: Array.isArray(held.boundaryIds) ? held.boundaryIds : [],
      },
      classifySince: held.classifySince ?? state.lastPolledAt ?? held.watermark,
    };
  }
  return {
    position: { watermark: toWholeSecond(sinceDate), boundaryIds: [] },
    classifySince: sinceDate.toISOString(),
  };
};

export const resolveMessageChanges = (data: MessageChangesObject | undefined): MessageChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): MessageChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): MessageChange => ({ changeType: "updated", record }),
    ),
  ];
};

export const partitionMessagesByTimestamp = (
  messages: import("@microsoft/microsoft-graph-types").Message[],
  since: Date,
): {
  created: import("@microsoft/microsoft-graph-types").Message[];
  updated: import("@microsoft/microsoft-graph-types").Message[];
} => {
  const created: import("@microsoft/microsoft-graph-types").Message[] = [];
  const updated: import("@microsoft/microsoft-graph-types").Message[] = [];
  for (const message of messages) {
    const createdValue = message.createdDateTime;
    const createdDate = typeof createdValue === "string" ? new Date(createdValue) : null;
    const isNew =
      createdDate !== null && !Number.isNaN(createdDate.getTime()) && createdDate > since;
    if (isNew) created.push(message);
    else updated.push(message);
  }
  return { created, updated };
};
