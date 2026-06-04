import { pollingTrigger } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTriggerInputs } from "../inputs";
import type { Payment, PollingState } from "../types";
import { fetchAllPaymentsSince, partitionPaymentsByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Payments",
    description:
      "Fetches Square payments created or updated since the last execution, separated into new and updated buckets.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (context, payload, { squareConnection, showNewRecords, showUpdatedRecords }) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt ? new Date(lastState.lastPolledAt) : now;

    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);
    const payments: Payment[] = await fetchAllPaymentsSince(client, sinceDate.toISOString());

    const { created, updated } = partitionPaymentsByTimestamp(payments, sinceDate);

    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);

    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled payments: ${payments.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges: result.created.length === 0 && result.updated.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
