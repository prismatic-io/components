import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { PollResource } from "../constants";
import {
  connection,
  lookBackDate,
  pollResourceType,
  showNewRecords,
} from "../inputs";
import type {
  PollingState,
  QBTimeRecordChange,
  QBTimeRecordChanges,
} from "../types";
import {
  fetchRecords,
  filterCreatedOnOrAfter,
  resolveQBTimeRecordChanges,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Retrieves existing and ongoing records for a specified QuickBooks Time resource type. Load history once, check for changes on a schedule, or both.",
  },
  inputs: {
    connection,
    resourceType: pollResourceType,
    showNewRecords,
    lookBackDate,
  },
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): QBTimeRecordChange[] =>
      resolveQBTimeRecordChanges(payload.body.data as QBTimeRecordChanges),
  },
  perform: async (
    context,
    payload,
    { connection, resourceType, showNewRecords, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    const client = createClient(connection, context.debug.enabled);
    const queryParams: Record<string, string> = {};
    const isIdBased = resourceType !== PollResource.TIMESHEETS;
    const knownIds = lastState?.knownIds;
    const hasNoBaseline =
      knownIds === undefined ||
      (knownIds.length > 0 &&
        knownIds.every((id) => util.types.toString(id) === ""));
    const isFirstPoll = isIdBased ? hasNoBaseline : !lastState?.lastPolledAt;
    const isInitialSync = isFirstPoll && Boolean(lookBackDate);

    if (!isIdBased) {
      queryParams.start_date = (
        lastState?.lastPolledAt ||
        lookBackDate ||
        now
      ).split("T")[0];
    }

    const records = await fetchRecords(client, resourceType, queryParams);
    const currentIds = records.map((r) => util.types.toString(r.id));
    const newState: PollingState = { lastPolledAt: now, knownIds: currentIds };

    if (isIdBased && isFirstPoll && !isInitialSync) {
      context.polling.setState(newState as unknown as Record<string, unknown>);
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }

    const knownSet = new Set(
      (lastState?.knownIds ?? []).map((id) => util.types.toString(id)),
    );
    const created =
      isIdBased && isInitialSync
        ? filterCreatedOnOrAfter(records, lookBackDate)
        : records.filter((r) => !knownSet.has(util.types.toString(r.id)));
    context.polling.setState(newState as unknown as Record<string, unknown>);

    const filteredCreated = showNewRecords || isInitialSync ? created : [];

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
