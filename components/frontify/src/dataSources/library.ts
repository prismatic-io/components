import { dataSource } from "@prismatic-io/spectral";
import type ListBrandLibrariesResponse from "../actions/types/listBrandLibraries";
import { createClient } from "../client";
import { LIST_BRAND_LIBRARIES_QUERY } from "../constants";
import { libraryInputs as inputs } from "../inputs/dataSources";

export const libraryDataSource = dataSource({
  display: {
    label: "Select Library",
    description: "Select a Library belonging to a certain Brand.",
  },
  perform: async (_context, { connection, brandId }) => {
    const response: ListBrandLibrariesResponse = await createClient({
      connection,
      debug: false,
    }).request(LIST_BRAND_LIBRARIES_QUERY, { brandId });
    const result = response.brand.libraries.items.map((library) => {
      return {
        key: library.id,
        label: library.name,
      };
    });

    return {
      result,
    };
  },
  inputs,
  dataSourceType: "picklist",
});
