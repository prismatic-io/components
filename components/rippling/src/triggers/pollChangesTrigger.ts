import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION, POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerInputs } from "../inputs";
import type { PollingState, RipplingRecord } from "../types";
import { fetchAllRecords } from "../utils";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in Rippling on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState = context.polling.getState() as unknown as PollingState;
    const lastPolledAt: string = pollState?.lastPolledAt || now;

    const resourceType = params.pollResourceType;
    const endpoint = `/${resourceType}`;

    if (context.debug.enabled) {
      context.logger.debug(
        `Polling Rippling ${resourceType} for changes from ${lastPolledAt} to ${now}`,
      );
    }

    const client = createClient(
      params.connection,
      API_VERSION.V2,
      context.debug.enabled,
    );

    const supportsDateFilter =
      POLL_RESOURCE_CONFIG[resourceType]?.supportsDateFilter ?? false;

    const filter = supportsDateFilter
      ? `updated_at gt '${lastPolledAt}'`
      : undefined;

    const allRecords = await fetchAllRecords(client, endpoint, filter);

    const lastPolledDate = new Date(lastPolledAt);

    let created: RipplingRecord[];
    let updated: RipplingRecord[];

    if (supportsDateFilter) {
      
      created = allRecords.filter(
        (record) => new Date(record.created_at) > lastPolledDate,
      );
      updated = allRecords.filter(
        (record) =>
          new Date(record.updated_at) > lastPolledDate &&
          new Date(record.created_at) <= lastPolledDate,
      );
    } else {
      
      created = allRecords.filter(
        (record) =>
          record.created_at && new Date(record.created_at) > lastPolledDate,
      );
      updated = allRecords.filter(
        (record) =>
          record.updated_at &&
          new Date(record.updated_at) > lastPolledDate &&
          (!record.created_at || new Date(record.created_at) <= lastPolledDate),
      );
    }

    const filteredCreated = params.showNewRecords ? created : [];
    const filteredUpdated = params.showUpdatedRecords ? updated : [];

    context.polling.setState({ lastPolledAt: now });

    const totalChanges = filteredCreated.length + filteredUpdated.length;

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: filteredCreated,
            updated: filteredUpdated,
          },
        },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
