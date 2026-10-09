import { pollingTrigger } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../client";
import { onNewOpsAlertExamplePayload } from "../examplePayloads";
import { onNewOpsAlertInputs } from "../inputs/triggers";
import type {
  OpsAlertChange,
  OpsAlertChangesObject,
  PollingState,
} from "../types";
import { fetchNewOpsAlertsSince, resolveOpsAlertChanges } from "../util";
export const onNewOpsAlert = pollingTrigger({
  display: {
    label: "New Ops Alerts",
    description:
      "Retrieves existing and ongoing alerts from Jira Service Management Ops. Load history once, check for changes on a schedule, or both.",
  },
  inputs: onNewOpsAlertInputs,
  allowsBranching: false,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): OpsAlertChange[] =>
      resolveOpsAlertChanges(payload.body.data as OpsAlertChangesObject),
  },
  examplePayload: onNewOpsAlertExamplePayload,
  perform: async (
    context,
    payload,
    { connection, opsAlertAdditionalQuery, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? (lookBackDate || now);
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
