import { pollingTrigger } from "@prismatic-io/spectral";
import { createAnalyticsClient } from "../client";
import { POLL_RESOURCE_KEYS } from "../constants";
import { pollChangesInputs } from "../inputs";
import type { Account, GA4Record, PollingState, Property } from "../types";
import { paginateRecords } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in Google Analytics GA4 on a configured schedule.",
  },
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt = state?.lastPolledAt ?? now;

    const client = createAnalyticsClient({
      connection: params.connection,
      endpointType: "adminv1beta",
      debug: context.debug.enabled,
    });

    
    
    
    let allRecords: GA4Record[];
    if (params.pollResourceType === POLL_RESOURCE_KEYS.ACCOUNTS) {
      const response = await paginateRecords<Account, "accounts">(
        client,
        "/accounts",
        { pageSize: 200 },
        true,
        "accounts",
      );
      allRecords = response.accounts;
    } else if (params.pollResourceType === POLL_RESOURCE_KEYS.PROPERTIES) {
      if (!params.accountId) {
        throw new Error(
          "Account ID is required when polling Properties. Select an account in the trigger configuration.",
        );
      }
      const response = await paginateRecords<Property, "properties">(
        client,
        "/properties",
        { pageSize: 200, filter: `parent:${params.accountId}` },
        true,
        "properties",
      );
      allRecords = response.properties;
    } else {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }

    const lastPolledAtDate = new Date(lastPolledAt);
    const created: GA4Record[] = [];
    const updated: GA4Record[] = [];

    for (const record of allRecords) {
      const { createTime, updateTime } = record;
      const createdAtDate = typeof createTime === "string" ? new Date(createTime) : null;
      const updatedAtDate = typeof updateTime === "string" ? new Date(updateTime) : null;

      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      const isUpdated = !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;

      if (isNew && params.showNewRecords) created.push(record);
      else if (isUpdated && params.showUpdatedRecords) updated.push(record);
    }

    const totalMatched = created.length + updated.length;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${params.pollResourceType} records, ${created.length} created, ${updated.length} updated since last poll.`,
      );
    }

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: {
        ...payload,
        body: {
          data: { created, updated },
        },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
