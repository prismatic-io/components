import type {
  ActionInputParameters,
  PollingContext,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_ALERT_THRESHOLD } from "../constants";
import { budgetAlertTriggerExamplePayload } from "../examplePayloads";
import { budgetAlertTriggerInputs } from "../inputs";
import type {
  BudgetAlertBatchItem,
  BudgetAlertChangesObject,
  CampaignQueryRow,
} from "../types";
import {
  buildBudgetAlertQuery,
  buildTriggerPayload,
  calculateBudgetStatus,
  createTriggerClient,
  getCurrentDate,
  getPollingState,
  getPreviousDate,
  handlePollingError,
  resolveBudgetAlerts,
  searchGoogleAds,
} from "../util";
const budgetAlertPerform = async (
  context: PollingContext,
  payload: TriggerPayload,
  params: ActionInputParameters<typeof budgetAlertTriggerInputs>,
) => {
  const { client, timezone } = await createTriggerClient(context, params);
  const pollState = getPollingState(context, {
    lastSyncDate: getPreviousDate(timezone),
    errorCount: 0,
    consecutiveErrors: 0,
  });
  const newSyncDate = getCurrentDate(timezone);
  try {
    const data = await searchGoogleAds<CampaignQueryRow>(client, {
      customerId: params.customerId,
      params: {
        query: buildBudgetAlertQuery({
          sinceDate: pollState.lastSyncDate,
          toDate: newSyncDate,
        }),
      },
      fetchAll: true,
    });
    const results = data.results ?? [];
    const budgetAlerts = results
      .map((campaign) =>
        calculateBudgetStatus(
          campaign,
          params.alertThreshold ?? DEFAULT_ALERT_THRESHOLD,
        ),
      )
      .filter((status) => status.shouldAlert);
    context.polling.setState({
      lastSyncDate: newSyncDate,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    return Promise.resolve({
      payload: buildTriggerPayload(payload, {
        alerts: budgetAlerts,
        totalCampaignsMonitored: results.length,
        alertThreshold: params.alertThreshold,
      }),
      polledNoChanges: budgetAlerts.length === 0,
    });
  } catch (e) {
    handlePollingError(e as Error, pollState, context, "Google Ads budget");
  }
};
export const budgetAlertTrigger = pollingTrigger({
  display: {
    label: "Campaign Budget Alerts",
    description:
      "Checks for campaigns approaching or exceeding budget thresholds on a configured schedule.",
  },
  inputs: budgetAlertTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): BudgetAlertBatchItem[] =>
      resolveBudgetAlerts(payload.body.data as BudgetAlertChangesObject),
  },
  perform: budgetAlertPerform,
  examplePayload: budgetAlertTriggerExamplePayload,
});
export default budgetAlertTrigger;
