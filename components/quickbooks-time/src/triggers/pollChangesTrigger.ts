import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { PollResource } from "../constants";
import { connection, pollResourceType, showNewRecords } from "../inputs";
import type { PollingState } from "../types";
import { fetchRecords } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Checks for new timesheets, users, or job codes in QuickBooks Time on a configured schedule.",
  },
  inputs: {
    connection,
    resourceType: pollResourceType,
    showNewRecords,
  },
  perform: async (context, payload, { connection, resourceType, showNewRecords }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;

    const client = createClient(connection, context.debug.enabled);
    const queryParams: Record<string, string> = {};

    if (resourceType === PollResource.TIMESHEETS) {
      const lastPolledAt = lastState?.lastPolledAt ?? now;
      queryParams.start_date = lastPolledAt.split("T")[0];
    }

    const records = await fetchRecords(client, resourceType, queryParams);

    const currentIds = records.map((r) => util.types.toString(r.id));
    const isIdBased = resourceType !== PollResource.TIMESHEETS;
    const isFirstPoll = isIdBased && lastState?.knownIds === undefined;

    if (isFirstPoll) {
      context.polling.setState({
        lastPolledAt: now,
        knownIds: currentIds,
      } as unknown as Record<string, unknown>);
      return {
        payload: {
          ...payload,
          body: { data: { created: [], updated: [] } },
        },
        polledNoChanges: true,
      };
    }

    const knownIds = lastState?.knownIds ?? [];
    const knownSet = new Set(knownIds.map((id) => util.types.toString(id)));
    const created = records.filter((r) => !knownSet.has(util.types.toString(r.id)));

    const newState: PollingState = {
      lastPolledAt: now,
      knownIds: currentIds,
    };
    context.polling.setState(newState as unknown as Record<string, unknown>);

    const filteredCreated = showNewRecords ? created : [];

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${resourceType}: ${records.length} total, ${filteredCreated.length} new`,
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
