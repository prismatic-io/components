import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { pollingTrigger } from "@prismatic-io/spectral";
import {
  CHANGE_STATUS_MAX_WINDOW_DAYS,
  TRIGGER_BATCH_SIZE,
} from "../constants";
import { changeStatusTriggerExamplePayload } from "../examplePayloads";
import { changeStatusTriggerInputs } from "../inputs";
import type {
  ChangeEventCursor,
  ChangeStatusBatchItem,
  ChangeStatusChangesObject,
  ChangeStatusPollingState,
  ChangeStatusRow,
} from "../types";
import {
  buildChangeStatusQuery,
  mapChangeStatusRows,
  resolveChangeStatusItems,
  runChangeEventRound,
} from "../util";

const changeStatusPerform = (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof changeStatusTriggerInputs>,
) =>
  runChangeEventRound<ChangeStatusRow, ChangeStatusChangesObject>({
    context,
    payload,
    params,
    windowDays: CHANGE_STATUS_MAX_WINDOW_DAYS,
    serviceName: "Google Ads change status",
    buildQuery: (bounds) =>
      buildChangeStatusQuery({
        ...bounds,
        resourceTypes: params.resourceTypes,
      }),
    identify: ({ changeStatus }) => ({
      resourceName: changeStatus.resourceName,
      changeDateTime: changeStatus.lastChangeDateTime,
    }),
    mapRows: (rows, cursor) => {
      const changes = mapChangeStatusRows(rows);
      return {
        data: {
          changes,
          changeCount: changes.length,
          timeRange: { start: cursor.sinceTime, end: cursor.toTime },
        },
        count: changes.length,
      };
    },
    stateFields: (_pollState: ChangeStatusPollingState, count) => ({
      changeCount: count,
      errorCount: 0,
    }),
  });

export const changeStatusTrigger = pollingTrigger({
  display: {
    label: "Changed Resources",
    description:
      "Retrieves existing and ongoing changes to Google Ads resources, without field-level values, for a specified account. Load history once, check for changes on a schedule, or both.",
  },
  inputs: changeStatusTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): ChangeStatusBatchItem[] =>
      resolveChangeStatusItems(payload.body.data as ChangeStatusChangesObject),
    getNextPaginationState: (_context, { payload }): ChangeEventCursor | null =>
      (payload.paginationState as ChangeEventCursor | undefined) ?? null,
  },
  perform: changeStatusPerform,
  examplePayload: changeStatusTriggerExamplePayload,
});

export default changeStatusTrigger;
