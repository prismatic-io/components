import { dataSource, type Element } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createDuroClient } from "../../client";
import {
  DEFAULT_LIBRARY_TYPE,
  N_FIRST_RESULTS_FALLBACK,
} from "../../constants";
import { selectComponentExamplePayload } from "../../examplePayloads";
import { getComponentsList } from "../../util";
import { selectComponentInputs } from "../../inputs/dataSources";

export const selectComponent = dataSource({
  display: {
    label: "Select Component",
    description: "A picklist of components in the selected Duro library.",
  },
  inputs: selectComponentInputs,
  dataSourceType: "picklist",
  examplePayload: selectComponentExamplePayload,
  perform: async (_context, { connection, libraryType, first }) => {
    const client = createDuroClient(connection, false);
    const query = gql`
      query Components($first: Int, $libraryType: LibraryType) {
        components(libraryType: $libraryType) {
          connection(first: $first) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `;

    const componentsList = await getComponentsList(
      client,
      query,
      first ?? N_FIRST_RESULTS_FALLBACK,
      libraryType ?? DEFAULT_LIBRARY_TYPE,
    );

    const objects = componentsList.map<Element>((component) => ({
      key: component.id,
      label: component.name,
    }));

    return { result: objects };
  },
});
