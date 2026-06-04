import { pollingTrigger } from "@prismatic-io/spectral";
import { getXeroClient } from "../client";
import {
  connectionInput,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs";
import { POLL_RESOURCE_CONFIG } from "../constants";
import type { PollingState, XeroRecord } from "../types";
import { fetchAllRecords } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in Xero on a configured schedule.",
  },
  inputs: {
    xeroConnection: connectionInput,
    resourceType: pollResourceType,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState | null;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const isFirstPoll = pollState?.knownIds === undefined;

    const resource = params.resourceType;
    const config = POLL_RESOURCE_CONFIG[resource];

    if (!config) {
      throw new Error(`Unsupported resource type: ${resource}`);
    }

    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );

    const records = await fetchAllRecords(
      client,
      config.endpoint,
      config.responseKey,
      config.paginated,
      lastPolledAt,
    );

    if (isFirstPoll) {
      const initialIds = records.map((r) => r[config.idField] as string);
      context.polling.setState({
        lastPolledAt: now,
        knownIds: initialIds,
      } as unknown as Record<string, unknown>);
      return {
        payload: {
          ...payload,
          body: { data: { created: [], updated: [] } },
        },
        polledNoChanges: true,
      };
    }

    const knownIds = new Set(pollState.knownIds);
    const created: XeroRecord[] = [];
    const updated: XeroRecord[] = [];

    for (const record of records) {
      const id = record[config.idField] as string;
      if (knownIds.has(id)) {
        updated.push(record);
      } else {
        created.push(record);
        knownIds.add(id);
      }
    }

    const filteredCreated = params.showNewRecords ? created : [];
    const filteredUpdated = params.showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({
      lastPolledAt: now,
      knownIds: Array.from(knownIds),
    } as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resource}: ${records.length} total, ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: {
        ...payload,
        body: {
          data: { created: filteredCreated, updated: filteredUpdated },
        },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
