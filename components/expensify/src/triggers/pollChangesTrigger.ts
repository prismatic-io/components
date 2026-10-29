import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import type { Policy } from "../interfaces";
import { generatePayload } from "../util";
import { showNewRecords } from "../inputs";
import type { PollingState } from "../types";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Policies",
    description:
      "Checks for new policies in Expensify on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    showNewRecords,
  },
  perform: async (context, payload, { connection, showNewRecords }) => {
    const client = createClient(connection, context.debug.enabled);
    const body = generatePayload(
      { inputSettings: { type: "policyList" } },
      connection,
    );
    const { data } = await client.post<{ policyList: Policy[] }>("", body);
    const policies = data.policyList ?? [];

    const lastState = context.polling.getState() as PollingState;
    const currentIds = policies.map((p) => p.id);
    const isFirstPoll = lastState?.knownIds === undefined;

    if (isFirstPoll) {
      context.polling.setState({
        knownIds: currentIds,
      } as unknown as Record<string, unknown>);
      return {
        payload: {
          ...payload,
          body: { data: { created: [], updated: [] } },
        },
        polledNoChanges: true,
      };
    }

    const knownSet = new Set(lastState.knownIds);
    const created = policies.filter((p) => !knownSet.has(p.id));

    context.polling.setState({
      knownIds: currentIds,
    } as unknown as Record<string, unknown>);

    const filteredCreated = showNewRecords ? created : [];

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled policies: ${policies.length} total, ${filteredCreated.length} new`,
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
