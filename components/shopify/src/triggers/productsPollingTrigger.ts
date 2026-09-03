import { pollingTrigger } from "@prismatic-io/spectral";
import pollProductsQuery from "../actions/graphql/queries/products/PollProducts.gql";
import type { PollingCursor } from "../actions/interfaces/PollingState";
import type { Product } from "../actions/interfaces/Product";
import { pollingTriggerInputs } from "../inputsGql";
import { resolvePollingRecordChanges, runPollingCycle } from "../util";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingResource,
} from "./pollingTypes";
const productsResource: PollingResource = {
  listKey: "products",
  query: pollProductsQuery,
};
export const productsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Products",
    description:
      "Retrieves existing and ongoing product changes from Shopify. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50, concurrentBatchLimit: 1 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange<Product>[] =>
      resolvePollingRecordChanges(
        payload.body.data as PollingChangesObject<Product>,
      ),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) =>
    runPollingCycle<Product>(context, payload, params, productsResource),
});
