import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { deleteCollectionExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteCollectionInputs as inputs } from "../../inputs/libraries";

export const deleteCollection = action({
  display: {
    label: "Delete Collection",
    description: "Delete an existing Collection.",
  },
  perform: async (context, { connection, ...input }) => {
    const mutation = gql`
      mutation deleteCollection($input: DeleteCollectionInput!) {
        deleteCollection(input: $input) {
          id
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
