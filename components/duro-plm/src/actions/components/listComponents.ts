import { action } from "@prismatic-io/spectral";
import { createDuroClient } from "../../client";
import { gql } from "graphql-request";
import { listComponentsInputs } from "../../inputs/components";
import { listComponentsExamplePayload } from "../../examplePayloads";
import { N_FIRST_RESULTS_FALLBACK } from "../../constants";
import { getComponentsList } from "../../util";

export const listComponents = action({
  display: {
    label: "List Components",
    description: "Retrieves a list of components.",
  },
  inputs: listComponentsInputs,
  perform: async (context, { connection, libraryType, first }) => {
    const client = createDuroClient(connection, context.debug.enabled);
    const query = gql`
      query Components($first: Int, $libraryType: LibraryType) {
        components(libraryType: $libraryType) {
          connection(first: $first) {
            edges {
              node {
                id
                name
                mass
                created
                lastModified
              }
            }
          }
        }
      }
    `;

    return {
      data: await getComponentsList(
        client,
        query,
        first ?? N_FIRST_RESULTS_FALLBACK,
        libraryType ?? "GENERAL",
      ),
    };
  },
  examplePayload: listComponentsExamplePayload,
});
