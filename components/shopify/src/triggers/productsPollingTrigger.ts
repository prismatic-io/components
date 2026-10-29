import { pollingTrigger } from "@prismatic-io/spectral";
import pollProductsQuery from "../actions/graphql/queries/products/PollProducts.gql";
import { productsPollingTriggerExamplePayload } from "../examplePayloads";
import { pollingTriggerInputs } from "../inputsGql";
import type {
  PollingChangesObject,
  PollingCursor,
  PollingRecordChange,
  PollingResource,
  Product,
} from "../types";
import { resolvePollingRecordChanges, runPollingCycle } from "../util";

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
  examplePayload: productsPollingTriggerExamplePayload,
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
