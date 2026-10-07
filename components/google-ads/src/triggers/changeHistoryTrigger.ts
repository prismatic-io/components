import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { pollingTrigger } from "@prismatic-io/spectral";
import {
  DEFAULT_INITIAL_LOOK_BACK_HOURS,
  LOOK_BACK_DATE_START_TIME,
  TRIGGER_BATCH_SIZE,
} from "../constants";
import { changeHistoryTriggerExamplePayload } from "../examplePayloads";
import { changeHistoryTriggerInputs } from "../inputs";
import type {
  ChangeEventCursor,
  ChangeEventPollingState,
  ChangeEventResponse,
  ChangeHistoryBatchItem,
  ChangeHistoryChangesObject,
} from "../types";
import {
  advanceChangeEventCursor,
  buildChangeHistoryQuery,
  buildTriggerPayload,
  createTriggerClient,
  getGAQLDateTime,
  getPollingState,
  handlePollingError,
  resolveChangeEventCursor,
  resolveChangeEventPageSize,
  resolveChangeHistoryItems,
  searchGoogleAds,
} from "../util";
const changeHistoryPerform = async (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof changeHistoryTriggerInputs>,
) => {
  const { client, timezone } = await createTriggerClient(context, params);
  const nowTime = getGAQLDateTime(timezone);
  const initialLastChangeTime = params.lookBackDate
    ? `${params.lookBackDate} ${LOOK_BACK_DATE_START_TIME}`
    : getGAQLDateTime(timezone, DEFAULT_INITIAL_LOOK_BACK_HOURS);
  const pollState = getPollingState<ChangeEventPollingState>(context, {
    lastChangeTime: initialLastChangeTime,
    errorCount: 0,
    consecutiveErrors: 0,
  });
  try {
    const incoming = payload.paginationState as ChangeEventCursor | undefined;
    const isContinuation = Boolean(incoming ?? pollState.inFlightCursor);
    const cursor = resolveChangeEventCursor({
      incoming,
      state: pollState,
      nowTime,
      timeZone: timezone,
    });
    const pageSize = resolveChangeEventPageSize(context.batch?.enabled);
    let rows: ChangeEventResponse[] = [];
    if (cursor.sinceTime < cursor.toTime) {
      const data = await searchGoogleAds<ChangeEventResponse>(client, {
        customerId: params.customerId,
        params: {
          query: buildChangeHistoryQuery({
            sinceTime: cursor.sinceTime,
            toTime: cursor.toTime,
            resourceTypes: params.resourceTypes,
            includeUserInfo: params.includeUserInfo,
            limit: pageSize,
          }),
        },
        fetchAll: true,
      });
      rows = data.results ?? [];
    }
    const { emit, nextCursor } = advanceChangeEventCursor(
      rows,
      cursor,
      pageSize,
      context.logger,
    );
    const results = [...emit].reverse();
    context.polling.setState({
      lastChangeTime: nextCursor ? pollState.lastChangeTime : cursor.toTime,
      ...(nextCursor ? { inFlightCursor: nextCursor } : {}),
      changeCount: results.length,
      errorCount: 0,
      consecutiveErrors: 0,
    } satisfies ChangeEventPollingState);
    return Promise.resolve({
      payload: {
        ...buildTriggerPayload(payload, {
          changes: results,
          changeCount: results.length,
          timeRange: {
            start: cursor.sinceTime,
            end: cursor.toTime,
          },
        }),
        paginationState: nextCursor ?? undefined,
      },
      polledNoChanges:
        results.length === 0 && nextCursor === null && !isContinuation,
    });
  } catch (e) {
    handlePollingError(
      e as Error,
      pollState,
      context,
      "Google Ads change history",
    );
  }
};
export const changeHistoryTrigger = pollingTrigger({
  display: {
    label: "Account Change History",
    description:
      "Checks for Google Ads account modifications with user attribution on a configured schedule.",
  },
  inputs: changeHistoryTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): ChangeHistoryBatchItem[] =>
      resolveChangeHistoryItems(
        payload.body.data as ChangeHistoryChangesObject,
      ),
    getNextPaginationState: (_context, { payload }): ChangeEventCursor | null =>
      (payload.paginationState as ChangeEventCursor | undefined) ?? null,
  },
  perform: changeHistoryPerform,
  examplePayload: changeHistoryTriggerExamplePayload,
});
export default changeHistoryTrigger;
