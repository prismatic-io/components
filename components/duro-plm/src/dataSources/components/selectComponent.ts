import { dataSource, type Element } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createDuroClient } from "../../client";
import { N_FIRST_RESULTS_FALLBACK } from "../../constants";
import { getComponentsList } from "../../util";
import { selectComponentInputs } from "../../inputs/dataSources";

export const selectComponent = dataSource({
  display: {
    label: "Select Component",
    description: "A picklist of components in your library.",
  },
  inputs: selectComponentInputs,
  dataSourceType: "picklist",
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
      libraryType ?? "GENERAL",
    );

    const objects = componentsList.map<Element>((component) => ({
      key: component.id,
      label: component.name,
    }));

    return { result: objects };
  },
});
