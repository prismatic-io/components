import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { createCollectionExamplePayload as examplePayload } from "../../examplePayloads";
import { createCollectionInputs as inputs } from "../../inputs/libraries";

export const createCollection = action({
  display: {
    label: "Create Collection",
    description:
      "Create a new Collection. Currently supported for Library type parent entities only.",
  },
  perform: async (context, { connection, ...input }) => {
    const mutation = gql`
      mutation createCollection($input: CreateCollectionInput!) {
        createCollection(input: $input) {
          collection {
            id
          }
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
