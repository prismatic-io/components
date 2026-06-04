import { pollingTrigger } from "@prismatic-io/spectral";
import listCustomersQuery from "../actions/graphql/queries/customers/ListCustomers.gql";
import type { Customer } from "../actions/interfaces/Customer";
import type { PageInfo } from "../actions/interfaces/PageInfo";
import type { PollingState } from "../actions/interfaces/PollingState";
import { getShopifyGraphQlClient } from "../client";
import { POLLING_LIMIT } from "../constants";
import { pollingTriggerInputs } from "../inputsGql";
import { categorizeByChangeType, fetchData } from "../util";

export const customersPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Customers",
    description: "Checks for new and updated customers in Shopify on a configured schedule.",
  },
  inputs: pollingTriggerInputs,
  perform: async (context, payload, { shopifyConnection }) => {
    const now = new Date().toISOString();
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const lastState = context.polling.getState() as PollingState;

    const lastPolledAt = lastState?.lastPolledAt ?? now;
    context.logger.debug(`Last polled at: ${lastPolledAt}`);
    const query = `updated_at:>=${lastPolledAt}`;

    const data = (await fetchData<Customer>(
      client,
      ["customers"],
      "customers",
      true,
      listCustomersQuery,
      {
        first: POLLING_LIMIT,
        query,
      },
    )) as Record<"customers", Customer[]> & { pageInfo: PageInfo };

    const customers = data?.customers ?? [];
    const polledNoChanges = customers.length === 0;

    context.polling.setState({ lastPolledAt: now });

    return Promise.resolve({
      payload: { ...payload, body: { data: categorizeByChangeType(customers, lastPolledAt) } },
      polledNoChanges,
    });
  },
});
