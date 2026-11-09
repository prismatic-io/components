import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { pollingTrigger } from "@prismatic-io/spectral";
import { CHANGE_EVENT_MAX_WINDOW_DAYS, TRIGGER_BATCH_SIZE } from "../constants";
import { campaignChangesTriggerExamplePayload } from "../examplePayloads";
import { campaignChangesTriggerInputs } from "../inputs";
import type {
  CampaignChangeBatchItem,
  CampaignChangeEventRow,
  CampaignChangesObject,
  ChangeEventCursor,
} from "../types";
import {
  buildCampaignChangeEventQuery,
  changeEventRowIdentity,
  mapChangeEventsToCampaignChanges,
  resolveCampaignChanges,
  runChangeEventRound,
} from "../util";

const campaignChangesPerform = (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof campaignChangesTriggerInputs>,
) =>
  runChangeEventRound<CampaignChangeEventRow, CampaignChangesObject>({
    context,
    payload,
    params,
    windowDays: CHANGE_EVENT_MAX_WINDOW_DAYS,
    serviceName: "Google Ads",
    buildQuery: (bounds) =>
      buildCampaignChangeEventQuery({
        ...bounds,
        changeTypes: params.changeTypes,
      }),
    identify: changeEventRowIdentity,
    mapRows: (rows, cursor) => {
      const changes = mapChangeEventsToCampaignChanges(
        rows,
        params.changeTypes,
      );
      return {
        data: {
          changes,
          changesDetected: changes.length,
          timeRange: { start: cursor.sinceTime, end: cursor.toTime },
          syncedAt: cursor.toTime,
        },
        count: changes.length,
      };
    },
    stateFields: (pollState) => ({ errorCount: pollState.errorCount }),
  });

export const campaignChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Campaigns",
    description:
      "Retrieves existing and ongoing campaign changes for a specified Google Ads account. Load history once, check for changes on a schedule, or both.",
  },
  inputs: campaignChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): CampaignChangeBatchItem[] =>
      resolveCampaignChanges(payload.body.data as CampaignChangesObject),
    getNextPaginationState: (_context, { payload }): ChangeEventCursor | null =>
      (payload.paginationState as ChangeEventCursor | undefined) ?? null,
  },
  perform: campaignChangesPerform,
  examplePayload: campaignChangesTriggerExamplePayload,
});

export default campaignChangesTrigger;
