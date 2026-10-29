import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { newSystemLogsPollingTriggerInputs } from "../inputs/webhooks";
import type {
  SystemLogEvent,
  SystemLogsCursor,
  SystemLogsPollingState,
} from "../interfaces/polling";
import { TRIGGER_BATCH_SIZE } from "../util/constants";
import {
  fetchSystemLogsWindow,
  resolveSystemLogChanges,
  resolveSystemLogsLink,
  resolveSystemLogsSince,
  systemLogsWindowBounds,
} from "../util/polling";
import { getBaseUrl } from "../util/util";

export const newSystemLogsPollingTrigger = pollingTrigger({
  display: {
    label: "New System Logs",
    description:
      "Retrieves existing and ongoing system log events from Okta. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newSystemLogsPollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }) =>
      resolveSystemLogChanges(
        payload.body.data as SystemLogEvent[] | undefined,
      ),
    getNextPaginationState: (_context, { payload }): SystemLogsCursor | null =>
      (payload.paginationState as SystemLogsCursor | undefined) ?? null,
  },
  perform: async (context, payload, { connection, lookBackDate, filter }) => {
    const state = (context.polling.getState() ?? {}) as SystemLogsPollingState;
    const incoming = payload.paginationState as SystemLogsCursor | undefined;
    const link = resolveSystemLogsLink(
      incoming ?? state,
      filter,
      getBaseUrl(connection),
    );
    const window = await fetchSystemLogsWindow(
      await createClient(connection, context.debug.enabled),
      {
        link,
        since: resolveSystemLogsSince(state, lookBackDate, new Date()),
        filter,
        ...systemLogsWindowBounds(context.batch?.enabled === true),
      },
    );

    const held = window.next ?? link;
    context.polling.setState({
      seeded: true,
      ...(held ? { next: held, filter } : {}),
    } satisfies SystemLogsPollingState);
    const next: SystemLogsCursor | null =
      window.hasMore && window.next ? { next: window.next, filter } : null;

    return {
      payload: {
        ...payload,
        paginationState: next ?? undefined,
        body: { data: window.events },
      },
      polledNoChanges: window.events.length === 0 && next === null && !incoming,
    };
  },
});
