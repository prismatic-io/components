import { pollingTrigger } from "@prismatic-io/spectral";
import listProductsQuery from "../actions/graphql/queries/products/ListProducts.gql";
import type { PageInfo } from "../actions/interfaces/PageInfo";
import type { PollingState } from "../actions/interfaces/PollingState";
import type { Product } from "../actions/interfaces/Product";
import { getShopifyGraphQlClient } from "../client";
import { POLLING_LIMIT } from "../constants";
import { pollingTriggerInputs } from "../inputsGql";
import { categorizeByChangeType, fetchData } from "../util";

export const productsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated Products",
    description: "Checks for new and updated products in Shopify on a configured schedule.",
  },
  inputs: pollingTriggerInputs,
  perform: async (context, payload, { shopifyConnection }) => {
    const now = new Date().toISOString();
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const lastState = context.polling.getState() as PollingState;

    const lastPolledAt = lastState?.lastPolledAt ?? now;
    context.logger.debug(`Last polled at: ${lastPolledAt}`);
    const query = `updated_at:>='${lastPolledAt}'`;

    const data = (await fetchData<Product>(
      client,
      ["products"],
      "products",
      true,
      listProductsQuery,
      {
        first: POLLING_LIMIT,
        query,
      },
    )) as Record<"products", Product[]> & { pageInfo: PageInfo };

    const products = data?.products ?? [];
    const polledNoChanges = products.length === 0;

    context.polling.setState({ lastPolledAt: now });

    return Promise.resolve({
      payload: { ...payload, body: { data: categorizeByChangeType(products, lastPolledAt) } },
      polledNoChanges,
    });
  },
});
