import type { PollingContext, TriggerPayload } from "@prismatic-io/spectral";
import {
  CHANGE_EVENT_SETTLE_MINUTES,
  DEFAULT_INITIAL_LOOK_BACK_HOURS,
  LOOK_BACK_DATE_START_TIME,
} from "../../constants";
import type {
  ChangeEventCursor,
  ChangeEventPollingState,
  ChangeRowIdentity,
  TriggerClientParams,
} from "../../types";
import { searchGoogleAds } from "../pagination";
import {
  advanceChangeEventCursor,
  resolveChangeEventCursor,
  resolveChangeEventPageSize,
} from "./changeEventPagination";
import { getGAQLDateTime } from "./dateUtils";
import { handlePollingError } from "./handlePollingError";
import {
  buildTriggerPayload,
  createTriggerClient,
  getPollingState,
} from "./triggerHelpers";

export const runChangeEventRound = async <TRow, TData>(options: {
  context: PollingContext;
  payload: TriggerPayload;
  params: TriggerClientParams & { lookBackDate?: string };
  windowDays: number;
  serviceName: string;
  buildQuery: (bounds: {
    sinceTime: string;
    toTime: string;
    limit: number;
  }) => string;
  identify: (row: TRow) => ChangeRowIdentity;
  mapRows: (
    rows: TRow[],
    cursor: ChangeEventCursor,
  ) => { data: TData; count: number };
  stateFields: (
    pollState: ChangeEventPollingState,
    count: number,
  ) => Pick<ChangeEventPollingState, "errorCount" | "changeCount">;
}): Promise<
  { payload: TriggerPayload; polledNoChanges: boolean } | undefined
> => {
  const { context, payload, params, windowDays, serviceName } = options;
  const { client, timezone } = await createTriggerClient(context, params);

  const nowTime = getGAQLDateTime(
    timezone,
    undefined,
    CHANGE_EVENT_SETTLE_MINUTES,
  );

  const { lookBackDate } = params;
  const initialLastChangeTime =
    lookBackDate !== undefined && lookBackDate !== ""
      ? `${lookBackDate} ${LOOK_BACK_DATE_START_TIME}`
      : getGAQLDateTime(timezone, DEFAULT_INITIAL_LOOK_BACK_HOURS);

  const pollState = getPollingState<ChangeEventPollingState>(context, {
    lastChangeTime: initialLastChangeTime,
    errorCount: 0,
    consecutiveErrors: 0,
  });

  try {
    const incoming = payload.paginationState as ChangeEventCursor | undefined;
    const isContinuation = [incoming, pollState.inFlightCursor].some(
      (resumed) => resumed !== undefined && resumed !== null,
    );
    const cursor = resolveChangeEventCursor({
      incoming,
      state: pollState,
      nowTime,
      timeZone: timezone,
      windowDays,
    });

    const pageSize = resolveChangeEventPageSize(context.batch?.enabled);

    let rows: TRow[] = [];
    if (cursor.sinceTime < cursor.toTime) {
      const data = await searchGoogleAds<TRow>(client, {
        customerId: params.customerId,
        params: {
          query: options.buildQuery({
            sinceTime: cursor.sinceTime,
            toTime: cursor.toTime,
            limit: pageSize,
          }),
        },
        fetchAll: true,
      });
      rows = data.results === undefined ? [] : data.results;
    }

    const { emit, nextCursor } = advanceChangeEventCursor(
      rows,
      cursor,
      pageSize,
      options.identify,
      context.logger,
    );

    const { data, count } = options.mapRows(emit, cursor);

    const drainedTime =
      pollState.lastChangeTime > cursor.toTime
        ? pollState.lastChangeTime
        : cursor.toTime;
    context.polling.setState({
      lastChangeTime:
        nextCursor !== null ? pollState.lastChangeTime : drainedTime,
      ...(nextCursor !== null ? { inFlightCursor: nextCursor } : {}),
      ...options.stateFields(pollState, count),
      consecutiveErrors: 0,
    } satisfies ChangeEventPollingState);

    return {
      payload: {
        ...buildTriggerPayload(payload, data),
        paginationState: nextCursor ?? undefined,
      },
      polledNoChanges: count === 0 && nextCursor === null && !isContinuation,
    };
  } catch (e) {
    handlePollingError(e as Error, pollState, context, serviceName);
  }
};
