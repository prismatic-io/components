import { pollingTrigger } from "@prismatic-io/spectral";
import listOrdersQuery from "../actions/graphql/queries/orders/ListOrders.gql";
import type { Order } from "../actions/interfaces/Order";
import type { PageInfo } from "../actions/interfaces/PageInfo";
import type { PollingState } from "../actions/interfaces/PollingState";
import { getShopifyGraphQlClient } from "../client";
import { POLLING_LIMIT } from "../constants";
import { pollingTriggerInputs } from "../inputsGql";
import { categorizeByChangeType, fetchData } from "../util";

export const ordersPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Orders",
    description: "Checks for new and updated orders in Shopify on a configured schedule.",
  },
  inputs: pollingTriggerInputs,
  perform: async (context, payload, { shopifyConnection }) => {
    const now = new Date().toISOString();
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const lastState = context.polling.getState() as PollingState;

    const lastPolledAt = lastState?.lastPolledAt ?? now;
    context.logger.debug(`Last polled at: ${lastPolledAt}`);
    const query = `updated_at:>=${lastPolledAt}`;

    const data = (await fetchData<Order>(client, ["orders"], "orders", true, listOrdersQuery, {
      first: POLLING_LIMIT,
      query,
    })) as Record<"orders", Order[]> & { pageInfo: PageInfo };

    const orders = data?.orders ?? [];
    const polledNoChanges = orders.length === 0;

    context.polling.setState({ lastPolledAt: now });

    return Promise.resolve({
      payload: { ...payload, body: { data: categorizeByChangeType(orders, lastPolledAt) } },
      polledNoChanges,
    });
  },
});
