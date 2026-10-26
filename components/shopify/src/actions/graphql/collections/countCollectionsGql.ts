import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countCollectionsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countCollectionsInputs as inputs } from "../../../inputsGql";
import { countCollectionsGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countCollectionsQuery from "../queries/collections/CountCollections.gql";
export const countCollectionsGql = action({
  display: {
    label: "Count Collections",
    description: "Returns a count of all collections.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      collectionsCount: Count;
    } = await client.request(countCollectionsQuery);
    return {
      data: data.collectionsCount,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countCollectionsGqlOutputSchema,
  }),
  examplePayload,
});
