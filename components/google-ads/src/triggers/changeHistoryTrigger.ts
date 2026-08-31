import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { pollingTrigger } from "@prismatic-io/spectral";
import { changeHistoryTriggerExamplePayload } from "../examplePayloads";
import { changeHistoryTriggerInputs } from "../inputs";
import type {
  ChangeEventResponse,
  ChangeHistoryBatchItem,
  ChangeHistoryChangesObject,
} from "../types";
import {
  buildChangeHistoryQuery,
  buildTriggerPayload,
  createTriggerClient,
  getGAQLDateTime,
  getPollingState,
  handlePollingError,
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
  const pollState = getPollingState(context, {
    lastChangeTime: getGAQLDateTime(timezone, 1),
    errorCount: 0,
    consecutiveErrors: 0,
  });
  try {
    const sinceTime = pollState.lastChangeTime;
    const data = await searchGoogleAds<ChangeEventResponse>(client, {
      customerId: params.customerId,
      params: {
        query: buildChangeHistoryQuery({
          sinceTime,
          toTime: nowTime,
          resourceTypes: params.resourceTypes,
          includeUserInfo: params.includeUserInfo,
        }),
      },
      fetchAll: true,
    });
    const results = data.results ?? [];
    context.polling.setState({
      lastChangeTime: nowTime,
      changeCount: results.length,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    return Promise.resolve({
      payload: buildTriggerPayload(payload, {
        changes: results,
        changeCount: results.length,
        timeRange: {
          start: sinceTime,
          end: nowTime,
        },
      }),
      polledNoChanges: results.length === 0,
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
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): ChangeHistoryBatchItem[] =>
      resolveChangeHistoryItems(
        payload.body.data as ChangeHistoryChangesObject,
      ),
  },
  perform: changeHistoryPerform,
  examplePayload: changeHistoryTriggerExamplePayload,
});
export default changeHistoryTrigger;
