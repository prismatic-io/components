import { dataSource } from "@prismatic-io/spectral";
import { listBrandsQuery } from "../actions/brands/listBrands";
import type ListBrandsResponse from "../actions/types/listBrands";
import { createClient } from "../client";
import { brandsInputs as inputs } from "../inputs/dataSources";

export const brandDataSource = dataSource({
  display: {
    label: "Select Brand",
    description: "Select a Brand belonging to the current Account.",
  },
  perform: async (_context, { connection }) => {
    const response: ListBrandsResponse = await createClient({
      connection,
      debug: false,
    }).request(listBrandsQuery);
    const result = response.brands.map((brand) => {
      return {
        key: brand.id,
        label: brand.name,
      };
    });

    return {
      result,
    };
  },
  inputs,
  dataSourceType: "picklist",
});
