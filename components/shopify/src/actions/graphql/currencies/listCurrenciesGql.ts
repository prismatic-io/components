import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listCurrenciesExamplePayload as examplePayload } from "../../../examplePayloads";
import { listCurrenciesInputs as inputs } from "../../../inputsGql";
import { listCurrenciesGqlOutputSchema } from "../../../outputSchemas";
import type { PageInfo } from "../../../types";
import { fetchData } from "../../../util";
import listCurrenciesQuery from "../queries/currencies/ListCurrencies.gql";

export const listCurrenciesGql = action({
  display: {
    label: "List Currencies",
    description: "Lists all enabled currencies.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = (await fetchData(
      client,
      ["shop", "currencySettings"],
      "currencies",
      getAlldata,
      listCurrenciesQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    )) as Record<"currencies", unknown[]> & { pageInfo: PageInfo };

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCurrenciesGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
