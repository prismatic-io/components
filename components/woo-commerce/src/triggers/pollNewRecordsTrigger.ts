import { pollingTrigger, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { connectionInput, resourceType } from "../inputs";
import { paginateRecords } from "../util";

const RESOURCE_ENDPOINT_MAP: Record<string, string> = {
  orders: "/orders",
  customers: "/customers",
  products: "/products",
  coupons: "/coupons",
};

export const pollNewRecordsTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Checks for new records in a selected WooCommerce resource type on a configured schedule.",
  },
  inputs: {
    connection: connectionInput,
    resourceType,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState = context.polling.getState() as {
      lastPolledAt?: string;
    } | null;

    const lastPolledAt = pollState?.lastPolledAt ?? now;

    const client = getClient(params.connection, context.debug.enabled);
    const resource = util.types.toString(params.resourceType);
    const endpoint = RESOURCE_ENDPOINT_MAP[resource];

    context.logger.debug(
      `Polling WooCommerce ${resource} for records after: ${lastPolledAt}`,
    );

    const { data: results } = await paginateRecords(
      client,
      endpoint,
      {
        after: lastPolledAt,
        per_page: 100,
        orderby: "date",
        order: "asc",
      },
      true,
    );

    context.polling.setState({ lastPolledAt: now });

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: results,
            updated: [],
          },
        },
      },
      polledNoChanges: results.length === 0,
    };
  },
});
