import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { PollResource } from "../constants";
import { connectionInput } from "../inputs";
import {
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
} from "../inputs/triggers";
import type { IntercomRecord, PollingState } from "../types";
import {
  fetchAllCompanies,
  filterByUnixTimestamp,
  searchContactsSince,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated contacts or companies on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    resourceType: pollResourceType,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (
    context,
    payload,
    { connection, resourceType, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const lastPolledUnix = Math.floor(new Date(lastPolledAt).getTime() / 1000);

    const client = createClient(connection, context.debug.enabled);

    let created: IntercomRecord[];
    let updated: IntercomRecord[];

    if (resourceType === PollResource.CONTACTS) {
      const records = await searchContactsSince(client, lastPolledUnix);
      const filtered = filterByUnixTimestamp(records, lastPolledUnix);
      created = filtered.created;
      updated = filtered.updated;
    } else {
      const records = await fetchAllCompanies(client);
      const filtered = filterByUnixTimestamp(records, lastPolledUnix);
      created = filtered.created;
      updated = filtered.updated;
    }

    const filteredCreated = showNewRecords ? created : [];
    const filteredUpdated = showUpdatedRecords ? updated : [];
    const totalChanges = filteredCreated.length + filteredUpdated.length;

    context.polling.setState({
      lastPolledAt: now,
    } as unknown as Record<string, unknown>);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${filteredCreated.length} new, ${filteredUpdated.length} updated`,
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
