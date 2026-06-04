import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_ALERT_THRESHOLD } from "../constants";
import { budgetAlertTriggerExamplePayload } from "../examplePayloads";
import { budgetAlertTriggerInputs } from "../inputs";
import type { CampaignQueryRow, PollingState } from "../types";
import {
  calculateBudgetStatus,
  getCurrentDate,
  getCustomerTimezone,
  getPreviousDate,
  handlePollingError,
  searchGoogleAds,
} from "../util";

export const budgetAlertTrigger = pollingTrigger({
  display: {
    label: "Campaign Budget Alerts",
    description:
      "Checks for campaigns approaching or exceeding budget thresholds on a configured schedule.",
  },

  inputs: budgetAlertTriggerInputs,

  perform: async (context, payload, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      context.logger,
      params.managerCustomerId,
    );
    const timezone = await getCustomerTimezone(client, params.customerId);
    const pollState =
      Object.keys(context.polling.getState()).length > 0
        ? (context.polling.getState() as unknown as PollingState)
        : {
            lastSyncDate: getPreviousDate(timezone),
            budgetAlerts: [],
            errorCount: 0,
            consecutiveErrors: 0,
          };

    const newSyncDate = getCurrentDate(timezone);

    try {
      const query = `
        SELECT
          campaign.id,
          campaign.name,
          campaign_budget.amount_micros,
          campaign_budget.total_amount_micros,
          campaign_budget.period,
          metrics.cost_micros
        FROM campaign
        WHERE segments.date >= '${pollState.lastSyncDate}' AND segments.date <= '${newSyncDate}'
          AND campaign.status = 'ENABLED'
      `;

      const data = await searchGoogleAds<CampaignQueryRow>(client, {
        customerId: params.customerId,
        params: {
          query,
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
        budgetAlerts,
        errorCount: 0,
        consecutiveErrors: 0,
      });

      return Promise.resolve({
        payload: {
          ...payload,
          body: {
            data: {
              alerts: budgetAlerts,
              totalCampaignsMonitored: results.length,
              alertThreshold: params.alertThreshold,
            },
          },
        },
        polledNoChanges: budgetAlerts.length === 0,
      });
    } catch (e) {
      handlePollingError(e as Error, pollState, context, "Google Ads budget");
    }
  },

  examplePayload: budgetAlertTriggerExamplePayload,
});

export default budgetAlertTrigger;
