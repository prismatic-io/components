import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  BigCommerceChangesObject,
  BigCommerceOrder,
  BigCommerceRecordChange,
  PollingState,
} from "../types";
import {
  fetchAllOrdersModifiedSince,
  partitionOrdersByTimestamp,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Orders",
    description:
      "Retrieves existing and ongoing orders in BigCommerce. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): BigCommerceRecordChange[] =>
      resolvePollingRecordChanges(
        payload.body.data as BigCommerceChangesObject,
      ),
  },
  perform: async (
    context,
    payload,
    {
      bigCommerceConnection,
      storeHash,
      showNewOrders,
      showUpdatedOrders,
      lookBackDate,
    },
  ) => {
    const now = new Date();
    const pollState = context.polling.getState() as PollingState | undefined;
    const lookBackISO = lookBackDate
      ? new Date(lookBackDate).toISOString()
      : undefined;
    const sinceISO =
      pollState?.lastPolledAt ?? lookBackISO ?? now.toISOString();
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
