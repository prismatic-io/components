import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { pollingTrigger } from "@prismatic-io/spectral";
import { CHANGE_EVENT_MAX_WINDOW_DAYS, TRIGGER_BATCH_SIZE } from "../constants";
import { changeHistoryTriggerExamplePayload } from "../examplePayloads";
import { changeHistoryTriggerInputs } from "../inputs";
import type {
  ChangeEventCursor,
  ChangeEventResponse,
  ChangeHistoryBatchItem,
  ChangeHistoryChangesObject,
} from "../types";
import {
  buildChangeHistoryQuery,
  changeEventRowIdentity,
  resolveChangeHistoryItems,
  runChangeEventRound,
} from "../util";

const changeHistoryPerform = (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof changeHistoryTriggerInputs>,
) =>
  runChangeEventRound<ChangeEventResponse, ChangeHistoryChangesObject>({
    context,
    payload,
    params,
    windowDays: CHANGE_EVENT_MAX_WINDOW_DAYS,
    serviceName: "Google Ads change history",
    buildQuery: (bounds) =>
      buildChangeHistoryQuery({
        ...bounds,
        resourceTypes: params.resourceTypes,
        includeUserInfo: params.includeUserInfo,
      }),
    identify: changeEventRowIdentity,
    mapRows: (rows, cursor) => {
      const changes = [...rows].reverse();
      return {
        data: {
          changes,
          changeCount: changes.length,
          timeRange: { start: cursor.sinceTime, end: cursor.toTime },
        },
        count: changes.length,
      };
    },
    stateFields: (_pollState, count) => ({ changeCount: count, errorCount: 0 }),
  });

export const changeHistoryTrigger = pollingTrigger({
  display: {
    label: "Account Change History",
    description:
      "Retrieves existing and ongoing account changes, with user attribution, for a specified Google Ads account. Load history once, check for changes on a schedule, or both.",
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
