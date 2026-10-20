import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  PagerDutyChangesObject,
  PagerDutyIncident,
  PollingState,
} from "../types";
import { fetchAllIncidentsSince } from "../util/fetchAllIncidentsSince";
import { resolvePollingRecordChanges } from "../util/polling";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Incidents",
    description:
      "Retrieves existing and ongoing incidents from PagerDuty. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: {
    batchSize: DEFAULT_BATCH_SIZE,
  },
  triggerResolver: {
    resolveItems: (_context, { payload }) => {
      const data = payload?.body?.data as PagerDutyChangesObject | undefined;
      return resolvePollingRecordChanges(data);
    },
  },
  perform: async (
    context,
    payload,
    { connection, showNewIncidents, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState | undefined;
    const lastPolledAt =
      state?.lastPolledAt ??
      (lookBackDate ? new Date(lookBackDate).toISOString() : now);
    const client = createClient(connection, context.debug.enabled);
    const incidents: PagerDutyIncident[] = showNewIncidents
      ? await fetchAllIncidentsSince(client, lastPolledAt)
      : [];
    context.polling.setState({ lastPolledAt: now } as Record<string, unknown>);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled PagerDuty incidents since ${lastPolledAt}: ${incidents.length} new`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { created: incidents, updated: [] } },
      },
      polledNoChanges: incidents.length === 0,
    };
  },
});
