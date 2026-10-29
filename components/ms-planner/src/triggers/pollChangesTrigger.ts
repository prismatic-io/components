import type { PlannerTask } from "@microsoft/microsoft-graph-types";
import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { MAX_PAGES, PLANNER_ENDPOINTS } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type {
  Etagged,
  PlannerChangesObject,
  PlannerTaskChange,
  PollingState,
} from "../types";
import {
  fetchTasksCreatedSince,
  latestCreatedDateTime,
  resolvePlannerTaskChanges,
} from "../utils";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Tasks",
    description:
      "Retrieves existing and newly created tasks for a specified Microsoft Planner plan. Load history once, check for new tasks on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PlannerTaskChange[] =>
      resolvePlannerTaskChanges(payload.body.data as PlannerChangesObject),
  },
  perform: async (context, payload, { connection, planId, lookBackDate }) => {
    const pollState = context.polling.getState() as PollingState | undefined;
    const lastPolledAt =
      pollState?.lastPolledAt ??
      (lookBackDate
        ? new Date(Date.parse(lookBackDate) - 1).toISOString()
        : undefined);
    const client = createClient(connection, context.debug.enabled);
    const { fetched, created, newestCreatedDateTime, truncated } =
      await fetchTasksCreatedSince<PlannerTask & Etagged>(
        client,
        PLANNER_ENDPOINTS.PLAN_TASKS(planId),
        lastPolledAt,
      );
    if (truncated) {
      throw new Error(
        `Plan ${planId} has more tasks than the ${MAX_PAGES}-page limit allows in one poll. Planner exposes no filter or ordering to resume a truncated walk, so no tasks were emitted and the polling cursor was not advanced.`,
      );
    }
    const nextCursor = lastPolledAt
      ? latestCreatedDateTime(created, lastPolledAt)
      : (newestCreatedDateTime ?? new Date().toISOString());
    context.polling.setState({ lastPolledAt: nextCursor });
    if (context.debug.enabled) {
      context.logger.debug(
        lastPolledAt
          ? `Polled plan ${planId}: ${fetched} tasks fetched, ${created.length} created since ${lastPolledAt}`
          : `Polled plan ${planId}: ${fetched} tasks fetched, cursor seeded at ${nextCursor}`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created } } },
      polledNoChanges: created.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
