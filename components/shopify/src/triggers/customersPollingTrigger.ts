import { pollingTrigger } from "@prismatic-io/spectral";
import pollCustomersQuery from "../actions/graphql/queries/customers/PollCustomers.gql";
import { customersPollingTriggerExamplePayload } from "../examplePayloads";
import { pollingTriggerInputs } from "../inputsGql";
import type {
  Customer,
  PollingChangesObject,
  PollingCursor,
  PollingRecordChange,
  PollingResource,
} from "../types";
import { resolvePollingRecordChanges, runPollingCycle } from "../util";

const customersResource: PollingResource = {
  listKey: "customers",
  query: pollCustomersQuery,
};

export const customersPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Customers",
    description:
      "Retrieves existing and ongoing customer changes from Shopify. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollingTriggerInputs,
  examplePayload: customersPollingTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50, concurrentBatchLimit: 1 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange<Customer>[] =>
      resolvePollingRecordChanges(
        payload.body.data as PollingChangesObject<Customer>,
      ),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, params) =>
    runPollingCycle<Customer>(context, payload, params, customersResource),
});
