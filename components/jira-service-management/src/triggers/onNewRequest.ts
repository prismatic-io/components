import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { onNewRequestExamplePayload } from "../examplePayloads";
import { onNewRequestInputs } from "../inputs/triggers";
import type { PollingState } from "../types";
import { fetchNewRequestsSince } from "../util";

export const onNewRequest = pollingTrigger({
  display: {
    label: "New Service Requests",
    description:
      "Fetches new service requests created in Jira Service Management on a recurring schedule.",
  },
  inputs: onNewRequestInputs,
  allowsBranching: false,
  examplePayload: onNewRequestExamplePayload,
  perform: async (context, payload, { connection, serviceDeskId }) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
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
