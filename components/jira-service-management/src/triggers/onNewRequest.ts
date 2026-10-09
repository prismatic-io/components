import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { onNewRequestExamplePayload } from "../examplePayloads";
import { onNewRequestInputs } from "../inputs/triggers";
import type {
  PollingState,
  ServiceRequestChange,
  ServiceRequestChangesObject,
} from "../types";
import { fetchNewRequestsSince, resolveServiceRequestChanges } from "../util";
export const onNewRequest = pollingTrigger({
  display: {
    label: "New Service Requests",
    description:
      "Retrieves existing and ongoing service requests for a specified Jira Service Management service desk (or all accessible service desks, if omitted). Load history once, check for changes on a schedule, or both.",
  },
  inputs: onNewRequestInputs,
  allowsBranching: false,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): ServiceRequestChange[] =>
      resolveServiceRequestChanges(
        payload.body.data as ServiceRequestChangesObject,
      ),
  },
  examplePayload: onNewRequestExamplePayload,
  perform: async (
    context,
    payload,
    { connection, serviceDeskId, lookBackDate },
  ) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? (lookBackDate || now);
    const lastPolledAtMs = new Date(lastPolledAt).getTime();
    const { client } = await createClient(connection, context.debug.enabled);
    const newRequests = await fetchNewRequestsSince(
      client,
      lastPolledAtMs,
      serviceDeskId,
    );
    context.polling.setState({ lastPolledAt: now } as unknown as Record<
      string,
      unknown
    >);
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled requests: ${newRequests.length} new since ${lastPolledAt}`,
      );
    }
    return {
      payload: { ...payload, body: { data: newRequests } },
      polledNoChanges: newRequests.length === 0,
    };
  },
});
