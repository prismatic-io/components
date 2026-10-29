import { pollingTrigger } from "@prismatic-io/spectral";
import pollOrdersQuery from "../actions/graphql/queries/orders/PollOrders.gql";
import { ordersPollingTriggerExamplePayload } from "../examplePayloads";
import { pollingTriggerInputs } from "../inputsGql";
import type {
  Order,
  PollingChangesObject,
  PollingCursor,
  PollingRecordChange,
  PollingResource,
} from "../types";
import { resolvePollingRecordChanges, runPollingCycle } from "../util";

const ordersResource: PollingResource = {
  listKey: "orders",
  query: pollOrdersQuery,
};

export const ordersPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Orders",
    description:
      "Retrieves existing and ongoing order changes from Shopify. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollingTriggerInputs,
  examplePayload: ordersPollingTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50, concurrentBatchLimit: 1 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange<Order>[] =>
      resolvePollingRecordChanges(
        payload.body.data as PollingChangesObject<Order>,
      ),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) =>
    runPollingCycle<Order>(context, payload, params, ordersResource),
});
