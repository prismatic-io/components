import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { updateCollectionExamplePayload as examplePayload } from "../../examplePayloads";
import { updateCollectionInputs as inputs } from "../../inputs/libraries";

export const updateCollection = action({
  display: {
    label: "Update Collection",
    description: "Update an existing Collection.",
  },
  perform: async (context, { connection, collectionId, name }) => {
    const mutation = gql`
      mutation updateCollection($input: UpdateCollectionInput!) {
        updateCollection(input: $input) {
          collection {
            id
          }
        }
      }
    `;

    const input = {
      collectionId,
      data: {
        name,
      },
    };

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
