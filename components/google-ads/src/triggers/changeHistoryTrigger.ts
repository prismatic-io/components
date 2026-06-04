import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { changeHistoryTriggerExamplePayload } from "../examplePayloads";
import { changeHistoryTriggerInputs } from "../inputs";
import type { ChangeEventResponse, PollingState } from "../types";
import {
  getCustomerTimezone,
  getGAQLDateTime,
  handlePollingError,
  searchGoogleAds,
} from "../util";

export const changeHistoryTrigger = pollingTrigger({
  display: {
    label: "Account Change History",
    description:
      "Checks for Google Ads account modifications with user attribution on a configured schedule.",
  },
  inputs: changeHistoryTriggerInputs,
  perform: async (context, payload, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      context.logger,
      params.managerCustomerId,
    );
    const timezone = await getCustomerTimezone(client, params.customerId);
    const nowTime = getGAQLDateTime(timezone);
    const pollState =
      Object.keys(context.polling.getState()).length > 0
        ? (context.polling.getState() as unknown as PollingState)
        : {
            lastChangeTime: getGAQLDateTime(timezone, 1), 
            errorCount: 0,
            consecutiveErrors: 0,
          };

    try {
      const sinceTime = pollState.lastChangeTime;

      const resourceFilter =
        params.resourceTypes.length > 0
          ? `AND change_event.change_resource_type IN (${params.resourceTypes.map((t: string) => `'${t}'`).join(",")})`
          : "";

      const query = `
        SELECT
          change_event.change_date_time,
          change_event.change_resource_type,
          change_event.change_resource_name,
          ${params.includeUserInfo ? "change_event.user_email," : ""}
          ${params.includeUserInfo ? "change_event.client_type," : ""}
          change_event.resource_change_operation,
          change_event.old_resource,
          change_event.new_resource
        FROM change_event
        WHERE change_event.change_date_time >= '${sinceTime}'
          AND change_event.change_date_time < '${nowTime}'
          ${resourceFilter}
        ORDER BY change_event.change_date_time DESC
        LIMIT 1000
      `;

      const data = await searchGoogleAds<ChangeEventResponse>(client, {
        customerId: params.customerId,
        params: {
          query,
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
        payload: {
          ...payload,
          body: {
            data: {
              changes: results,
              changeCount: results.length,
              timeRange: {
                start: sinceTime,
                end: nowTime,
              },
            },
          },
        },
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
  },
  examplePayload: changeHistoryTriggerExamplePayload,
});

export default changeHistoryTrigger;
