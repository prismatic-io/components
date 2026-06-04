import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { campaignChangesTriggerExamplePayload } from "../examplePayloads";
import { campaignChangesTriggerInputs } from "../inputs";
import type { CampaignQueryRow, PollingState } from "../types";
import {
  buildCampaignQuery,
  detectCampaignChanges,
  getCurrentDate,
  getCustomerTimezone,
  getPreviousDate,
  handlePollingError,
  searchGoogleAds,
} from "../util";

export const campaignChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Campaigns",
    description:
      "Checks for new and updated campaigns in a Google Ads account on a configured schedule.",
  },

  inputs: campaignChangesTriggerInputs,

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
            campaigns: [],
            errorCount: 0,
            consecutiveErrors: 0,
          };

    const newSyncDate = getCurrentDate(timezone);

    try {
      
      const query = buildCampaignQuery({
        customerId: params.customerId,
        changeTypes: params.changeTypes,
        sinceDate: pollState.lastSyncDate,
        toDate: newSyncDate,
      });

      const data = await searchGoogleAds<CampaignQueryRow>(client, {
        customerId: params.customerId,
        params: {
          query,
        },
        fetchAll: true,
      });

      const results = data.results ?? [];

      
      const changes = detectCampaignChanges(
        results,
        pollState.campaigns,
        params.changeTypes,
      );

      
      context.polling.setState({
        lastSyncDate: newSyncDate,
        campaigns: results,
        errorCount: pollState.errorCount,
        consecutiveErrors: 0, 
      });

      return Promise.resolve({
        payload: {
          ...payload,
          body: {
            data: {
              changes,
              totalCampaigns: results.length,
              changesDetected: changes.length,
              syncedAt: newSyncDate,
            },
          },
        },
        polledNoChanges: changes.length === 0,
      });
    } catch (e) {
      handlePollingError(e as Error, pollState, context, "Google Ads");
    }
  },

  examplePayload: campaignChangesTriggerExamplePayload,
});

export default campaignChangesTrigger;
