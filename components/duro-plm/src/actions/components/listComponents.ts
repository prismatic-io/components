import { action, outputSchema } from "@prismatic-io/spectral";
import { createDuroClient } from "../../client";
import { gql } from "graphql-request";
import { listComponentsInputs } from "../../inputs/components";
import { listComponentsExamplePayload } from "../../examplePayloads";
import { listComponentsOutputSchema } from "../../outputSchemas";
import {
  DEFAULT_LIBRARY_TYPE,
  N_FIRST_RESULTS_FALLBACK,
} from "../../constants";
import { getComponentsList } from "../../util";

export const listComponents = action({
  display: {
    label: "List Components",
    description: "Retrieves a list of components.",
  },
  inputs: listComponentsInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, libraryType, first }) => {
    const client = createDuroClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
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
        libraryType ?? DEFAULT_LIBRARY_TYPE,
      ),
    };
  },
  examplePerform: async () => listComponentsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listComponentsOutputSchema,
  }),
  examplePayload: listComponentsExamplePayload,
});
