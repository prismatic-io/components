import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countCollectionsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countCollectionsInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countCollectionsQuery from "../queries/collections/CountCollections.gql";

export const countCollectionsGql = action({
  display: {
    label: "Count Collections",
    description: "Returns a count of all collections.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: {
      collectionsCount: Count;
    } = await client.request(countCollectionsQuery);

    return {
      data: data.collectionsCount,
    };
  },
  inputs,
  examplePayload,
});
