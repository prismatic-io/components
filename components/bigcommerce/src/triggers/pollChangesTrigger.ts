import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { BigCommerceOrder, PollingState } from "../types";
import {
  fetchAllOrdersModifiedSince,
  partitionOrdersByTimestamp,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Orders",
    description:
      "Checks for new and updated orders in BigCommerce on a configured schedule.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  perform: async (
    context,
    payload,
    { bigCommerceConnection, storeHash, showNewOrders, showUpdatedOrders },
  ) => {
    const now = new Date();
    const pollState = context.polling.getState() as PollingState | undefined;
    const sinceISO = pollState?.lastPolledAt ?? now.toISOString();
    const sinceDate = new Date(sinceISO);

    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const orders: BigCommerceOrder[] = await fetchAllOrdersModifiedSince(
      client,
      util.types.toString(storeHash),
      sinceISO,
    );

    const { created, updated } = partitionOrdersByTimestamp(orders, sinceDate);

    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);

    const result = {
      created: showNewOrders ? created : [],
      updated: showUpdatedOrders ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled BigCommerce orders since ${sinceISO}: ${orders.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
});
