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
import { campaignChangesTriggerExamplePayload } from "../examplePayloads";
import { campaignChangesTriggerInputs } from "../inputs";
import type {
  CampaignChangeBatchItem,
  CampaignChangeEventRow,
  CampaignChangesObject,
  ChangeEventCursor,
  ChangeEventPollingState,
} from "../types";
import {
  advanceChangeEventCursor,
  buildCampaignChangeEventQuery,
  buildTriggerPayload,
  createTriggerClient,
  getGAQLDateTime,
  getPollingState,
  handlePollingError,
  mapChangeEventsToCampaignChanges,
  resolveCampaignChanges,
  resolveChangeEventCursor,
  resolveChangeEventPageSize,
  searchGoogleAds,
} from "../util";
const campaignChangesPerform = async (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof campaignChangesTriggerInputs>,
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
    let rows: CampaignChangeEventRow[] = [];
    if (cursor.sinceTime < cursor.toTime) {
      const data = await searchGoogleAds<CampaignChangeEventRow>(client, {
        customerId: params.customerId,
        params: {
          query: buildCampaignChangeEventQuery({
            sinceTime: cursor.sinceTime,
            toTime: cursor.toTime,
            changeTypes: params.changeTypes,
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
    const changes = mapChangeEventsToCampaignChanges(emit, params.changeTypes);
    context.polling.setState({
      lastChangeTime: nextCursor ? pollState.lastChangeTime : cursor.toTime,
      ...(nextCursor ? { inFlightCursor: nextCursor } : {}),
      errorCount: pollState.errorCount,
      consecutiveErrors: 0,
    } satisfies ChangeEventPollingState);
    return Promise.resolve({
      payload: {
        ...buildTriggerPayload(payload, {
          changes,
          changesDetected: changes.length,
          timeRange: {
            start: cursor.sinceTime,
            end: cursor.toTime,
          },
          syncedAt: cursor.toTime,
        }),
        paginationState: nextCursor ?? undefined,
      },
      polledNoChanges:
        changes.length === 0 && nextCursor === null && !isContinuation,
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
