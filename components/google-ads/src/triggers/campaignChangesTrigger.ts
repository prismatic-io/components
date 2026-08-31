import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { pollingTrigger } from "@prismatic-io/spectral";
import { campaignChangesTriggerExamplePayload } from "../examplePayloads";
import { campaignChangesTriggerInputs } from "../inputs";
import type {
  CampaignChangeBatchItem,
  CampaignChangeEventRow,
  CampaignChangesObject,
} from "../types";
import {
  buildCampaignChangeEventQuery,
  buildTriggerPayload,
  clampToChangeEventWindow,
  createTriggerClient,
  getGAQLDateTime,
  getPollingState,
  handlePollingError,
  mapChangeEventsToCampaignChanges,
  resolveCampaignChanges,
  searchGoogleAds,
} from "../util";
const campaignChangesPerform = async (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof campaignChangesTriggerInputs>,
) => {
  const { client, timezone } = await createTriggerClient(context, params);
  const toTime = getGAQLDateTime(timezone);
  const pollState = getPollingState(context, {
    lastChangeTime: getGAQLDateTime(timezone, 1),
    errorCount: 0,
    consecutiveErrors: 0,
  });
  try {
    const sinceTime = clampToChangeEventWindow(
      pollState.lastChangeTime,
      timezone,
    );
    const data = await searchGoogleAds<CampaignChangeEventRow>(client, {
      customerId: params.customerId,
      params: {
        query: buildCampaignChangeEventQuery({
          sinceTime,
          toTime,
          changeTypes: params.changeTypes,
        }),
      },
      fetchAll: true,
    });
    const changes = mapChangeEventsToCampaignChanges(
      data.results ?? [],
      params.changeTypes,
    );
    context.polling.setState({
      lastChangeTime: toTime,
      errorCount: pollState.errorCount,
      consecutiveErrors: 0,
    });
    return Promise.resolve({
      payload: buildTriggerPayload(payload, {
        changes,
        changesDetected: changes.length,
        timeRange: {
          start: sinceTime,
          end: toTime,
        },
        syncedAt: toTime,
      }),
      polledNoChanges: changes.length === 0,
    });
  } catch (e) {
    handlePollingError(e as Error, pollState, context, "Google Ads");
  }
};
export const campaignChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Campaigns",
    description:
      "Checks for new and updated campaigns in a Google Ads account on a configured schedule.",
  },
  inputs: campaignChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): CampaignChangeBatchItem[] =>
      resolveCampaignChanges(payload.body.data as CampaignChangesObject),
  },
  perform: campaignChangesPerform,
  examplePayload: campaignChangesTriggerExamplePayload,
});
export default campaignChangesTrigger;
