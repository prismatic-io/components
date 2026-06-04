import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PagerDutyIncident, PollingState } from "../types";
import { fetchAllIncidentsSince } from "../util/fetchAllIncidentsSince";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Incidents",
    description:
      "Fetches incidents created since the last execution on a recurring schedule.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (context, payload, { connection, showNewIncidents }) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState | undefined;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

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
