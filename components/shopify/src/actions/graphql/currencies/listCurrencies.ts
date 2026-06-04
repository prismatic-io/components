import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listCurrenciesExamplePayload as examplePayload } from "../../../examplePayloads";
import { listCurrenciesInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import listCurrenciesQuery from "../queries/currencies/ListCurrencies.gql";

export const listCurrenciesGql = action({
  display: {
    label: "List Currencies",
    description: "Lists all enabled currencies.",
  },
  perform: async (context, { shopifyConnection, limit, getAlldata, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = (await fetchData(
      client,
      ["shop", "currencySettings"],
      "currencies",
      getAlldata,
      listCurrenciesQuery,
      {
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
      },
    )) as Record<"currencies", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
