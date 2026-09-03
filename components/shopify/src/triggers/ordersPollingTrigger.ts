import { pollingTrigger } from "@prismatic-io/spectral";
import pollOrdersQuery from "../actions/graphql/queries/orders/PollOrders.gql";
import type { Order } from "../actions/interfaces/Order";
import type { PollingCursor } from "../actions/interfaces/PollingState";
import { pollingTriggerInputs } from "../inputsGql";
import { resolvePollingRecordChanges, runPollingCycle } from "../util";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingResource,
} from "./pollingTypes";
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
