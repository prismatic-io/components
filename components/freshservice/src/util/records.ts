import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_ITEMS_PER_PAGE } from "../constants";
import type {
  FreshserviceChangesObject,
  FreshserviceRecord,
  FreshserviceRecordChange,
  TicketPaginationState,
} from "../types";
const cleanLinkHeader = (linkHeader: string) => {
  const cleanLink = linkHeader.replace(/<|>/g, "").replace(/; rel="next"/g, "");
  return cleanLink;
};
export const getListData = async <T, K extends string>(
  client: HttpClient,
  endpoint: string,
  attribute: string,
  options: {
    fetchAll: boolean;
    params: Record<string, unknown>;
  },
): Promise<{
  data: {
    [P in K]: T[];
  };
  nextLink: string | null;
}> => {
  const { fetchAll } = options;
  const params: Record<string, unknown> = { ...options.params };
  if (fetchAll) {
    params.per_page = MAX_ITEMS_PER_PAGE;
    params.page = undefined;
  }
  const { data, headers } = await client.get(endpoint, {
    params,
  });
  const itemsData = { [attribute]: data[attribute] as T[] } as {
    [P in K]: T[];
  };
  let nextLink = headers.link ? cleanLinkHeader(headers.link) : null;
  if (!fetchAll) {
    return { data: itemsData, nextLink };
  }
  while (nextLink) {
    const { data: nextData, headers: nextHeaders } = await client.get(nextLink);
    itemsData[attribute as keyof typeof itemsData] = itemsData[
      attribute as keyof typeof itemsData
    ].concat((nextData[attribute] as T[]) ?? []);
    nextLink = nextHeaders.link ? cleanLinkHeader(nextHeaders.link) : null;
  }
  return { data: itemsData, nextLink: null };
};
const fetchTicketPage = async (
  client: HttpClient,
  windowStart: string,
  page: number,
): Promise<{
  records: FreshserviceRecord[];
  hasNextPage: boolean;
}> => {
  const { data, nextLink } = await getListData<FreshserviceRecord, "tickets">(
    client,
    "/tickets",
    "tickets",
    {
      fetchAll: false,
      params: {
        updated_since: windowStart,
        per_page: MAX_ITEMS_PER_PAGE,
        page,
      },
    },
  );
  return { records: data.tickets ?? [], hasNextPage: nextLink !== null };
};
const partitionRecordChanges = (
  records: FreshserviceRecord[],
  boundary: string,
  options: {
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
): FreshserviceChangesObject => {
  const boundaryDate = new Date(boundary);
  const created: FreshserviceRecord[] = [];
  const updated: FreshserviceRecord[] = [];
  for (const record of records) {
    if (new Date(record.created_at) > boundaryDate) {
      created.push(record);
    } else {
      updated.push(record);
    }
  }
  return {
    created: options.showNewRecords ? created : [],
    updated: options.showUpdatedRecords ? updated : [],
  };
};
const nextTicketPage = (
  state: TicketPaginationState,
  round: {
    recordCount: number;
    hasNextPage: boolean;
  },
): TicketPaginationState | null => {
  const exhausted = !round.hasNextPage || round.recordCount === 0;
  if (exhausted || state.page >= state.maxPages) {
    return null;
  }
  return { ...state, page: state.page + 1 };
};
const trippedPageCap = (
  state: TicketPaginationState,
  round: {
    recordCount: number;
    hasNextPage: boolean;
  },
): boolean =>
  round.hasNextPage && round.recordCount > 0 && state.page >= state.maxPages;
export const resolvePollingRecordChanges = (
  data: FreshserviceChangesObject | undefined,
): FreshserviceRecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): FreshserviceRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): FreshserviceRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const runTicketSyncRound = async (
  client: HttpClient,
  options: {
    incoming?: TicketPaginationState;
    windowStart: string;
    now: string;
    maxPages: number;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
): Promise<{
  state: TicketPaginationState;
  changes: FreshserviceChangesObject;
  nextState: TicketPaginationState | null;
  commitCursor: string | null;
  cappedOut: boolean;
}> => {
  const state: TicketPaginationState = options.incoming ?? {
    page: 1,
    windowStart: options.windowStart,
    windowEnd: options.now,
    maxPages: options.maxPages,
  };
  const { records, hasNextPage } = await fetchTicketPage(
    client,
    state.windowStart,
    state.page,
  );
  const round = { recordCount: records.length, hasNextPage };
  const nextState = nextTicketPage(state, round);
  const cappedOut = trippedPageCap(state, round);
  const commitCursor =
    nextState === null && !cappedOut ? state.windowEnd : null;
  return {
    state,
    changes: partitionRecordChanges(records, state.windowStart, options),
    nextState,
    commitCursor,
    cappedOut,
  };
};
export const relayPaginationState = (
  _context: unknown,
  {
    payload,
  }: {
    payload: {
      paginationState?: Record<string, unknown>;
    };
  },
): Record<string, unknown> | null => payload.paginationState ?? null;
export const resolveItems = (
  _context: unknown,
  {
    payload,
  }: {
    payload: {
      body: {
        data: unknown;
      };
    };
  },
): FreshserviceRecordChange[] =>
  resolvePollingRecordChanges(payload.body.data as FreshserviceChangesObject);
