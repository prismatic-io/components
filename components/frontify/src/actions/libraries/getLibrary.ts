import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { getLibraryExamplePayload as examplePayload } from "../../examplePayloads";
import { getLibraryInputs as inputs } from "../../inputs/libraries";

export const getLibrary = action({
  display: {
    label: "Get Library",
    description: "Retrieve a Library by its ID.",
  },
  perform: async (context, { connection, libraryId }) => {
    const query = gql`
      query getLibrary($libraryId: ID!) {
        library(id: $libraryId) {
          __typename
          id
          name
          color {
            red
            green
            blue
            alpha
          }
          licenses {
            id
            title
            license
            addByDefault
            requireConsensus
          }
          customMetadataProperties {
            id
            creator {
              id
              name
              email
            }
            createdAt
            modifier {
              id
              name
              email
            }
            modifiedAt
            name
            type {
              name
            }
            isRequired
            defaultValue
          }
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(query, { libraryId });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
