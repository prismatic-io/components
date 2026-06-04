import { pollingTrigger } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../client";
import { onNewOpsAlertExamplePayload } from "../examplePayloads";
import { onNewOpsAlertInputs } from "../inputs/triggers";
import type { PollingState } from "../types";
import { fetchNewOpsAlertsSince } from "../util";

export const onNewOpsAlert = pollingTrigger({
  display: {
    label: "New Ops Alerts",
    description:
      "Fetches new alerts created in Jira Service Management Ops on a recurring schedule.",
  },
  inputs: onNewOpsAlertInputs,
  allowsBranching: false,
  examplePayload: onNewOpsAlertExamplePayload,
  perform: async (
    context,
    payload,
    { connection, opsAlertAdditionalQuery },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const lastPolledAtMs = new Date(lastPolledAt).getTime();

    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const newAlerts = await fetchNewOpsAlertsSince(
      client,
      lastPolledAtMs,
      opsAlertAdditionalQuery,
    );

    context.polling.setState({ lastPolledAt: now } as unknown as Record<
      string,
      unknown
    >);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ops alerts: ${newAlerts.length} new since ${lastPolledAt}`,
      );
    }

    return {
      payload: { ...payload, body: { data: newAlerts } },
      polledNoChanges: newAlerts.length === 0,
    };
  },
});
