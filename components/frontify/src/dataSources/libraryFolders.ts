import { dataSource, input, util } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../client";
import { connection } from "../inputs/sharedInputs";
import type { FolderItem, LibraryFoldersResponse } from "../types";

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
  query listLibraryFolders($libraryId: ID!) {
    library(id: $libraryId) {
      browse {
        folders {
          items {
            id
            name
          }
        }
      }
    }
  }
`;

export const selectLibraryFolder = dataSource({
  display: {
    label: "Select Library Folder",
    description: "A picklist of top-level folders in a Library.",
  },
  inputs: {
    connection,
    libraryId,
  },
  perform: async (_context, { connection, libraryId }) => {
    const client = createClient({ connection, debug: false });
    const response: LibraryFoldersResponse = await client.request(query, {
      libraryId,
    });
    const items: FolderItem[] = response?.library?.browse?.folders?.items ?? [];
    return {
      result: items.map((item) => ({
        key: item.id,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "My Folder", key: "eyJpZGVudGlmaWVyIjoiMSJ9" }],
  },
});
