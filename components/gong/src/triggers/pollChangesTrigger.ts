import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import { fetchAllCalls, fetchAllUsers } from "../util";
import { pollResourceType, showNewRecords } from "../inputs";
import { PollResource } from "../constants";
import type { GongRecord, PollingState } from "../types";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Checks for new calls or users in Gong on a configured schedule.",
  },
  inputs: {
    connection,
    resourceType: pollResourceType,
    showNewRecords,
  },
  perform: async (
    context,
    payload,
    { connection, resourceType, showNewRecords },
  ) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    const lastPolledAt = lastState?.lastPolledAt ?? now;

    const client = createClient(connection, context.debug.enabled);

    let created: GongRecord[];

    if (resourceType === PollResource.CALLS) {
      created = await fetchAllCalls(client, lastPolledAt, now);
    } else {
      const records = await fetchAllUsers(client);
      const isFirstPoll = lastState?.knownIds === undefined;
      if (isFirstPoll) {
        context.polling.setState({
          lastPolledAt: now,
          knownIds: records.map((r) => r.id),
        } as unknown as Record<string, unknown>);
        return {
          payload: {
            ...payload,
            body: { data: { created: [], updated: [] } },
          },
          polledNoChanges: true,
        };
      }
      const knownSet = new Set(lastState.knownIds);
      created = records.filter((r) => !knownSet.has(r.id));

      const newState: PollingState = {
        lastPolledAt: now,
        knownIds: records.map((r) => r.id),
      };
      context.polling.setState(newState as unknown as Record<string, unknown>);
    }

    if (resourceType === PollResource.CALLS) {
      context.polling.setState({
        lastPolledAt: now,
      } as unknown as Record<string, unknown>);
    }

    const filteredCreated = showNewRecords ? created : [];

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${filteredCreated.length} new`,
      );
    }

    return {
      payload: {
        ...payload,
        body: { data: { created: filteredCreated, updated: [] } },
      },
      polledNoChanges: filteredCreated.length === 0,
    };
  },
});
