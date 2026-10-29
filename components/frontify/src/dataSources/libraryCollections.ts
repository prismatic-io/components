import { dataSource, input, util } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../client";
import { connection } from "../inputs/sharedInputs";
import type { CollectionItem, LibraryCollectionsResponse } from "../types";

const libraryId = input({
  label: "Library ID",
  type: "string",
  required: true,
  comments: "ID of the Library entity.",
  example: "eyJpZG...",
  placeholder: "eyJpZG...",
  clean: util.types.toString,
});

const query = gql`
  query listLibraryCollections($libraryId: ID!) {
    library(id: $libraryId) {
      collections {
        items {
          id
          name
        }
      }
    }
  }
`;

export const selectLibraryCollection = dataSource({
  display: {
    label: "Select Library Collection",
    description: "A picklist of collections belonging to a Library.",
  },
  inputs: {
    connection,
    libraryId,
  },
  perform: async (_context, { connection, libraryId }) => {
    const client = createClient({ connection, debug: false });
    const response: LibraryCollectionsResponse = await client.request(query, {
      libraryId,
    });
    const items: CollectionItem[] = response?.library?.collections?.items ?? [];
    return {
      result: items.map((item) => ({
        key: item.id,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "My Collection", key: "eyJpZGVudGlmaWVyIjoiMSJ9" }],
  },
});
