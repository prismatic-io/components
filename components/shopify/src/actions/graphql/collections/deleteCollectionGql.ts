import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteCollectionExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteCollectionInputs as inputs } from "../../../inputsGql";
import { deleteCollectionGqlOutputSchema } from "../../../outputSchemas";
import deleteCollectionQuery from "../queries/collections/DeleteCollection.gql";
export const deleteCollectionGql = action({
  display: {
    label: "Delete Collection",
    description: "Deletes a collection by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, collectionId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      collectionDelete: Record<string, unknown>;
    } = await client.request(deleteCollectionQuery, {
      input: {
        id: collectionId,
      },
    });
    return {
      data: data.collectionDelete,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCollectionGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
