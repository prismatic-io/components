import { dataSource, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { fetchPaginatedData, filterAndSort } from "../utils";
import type { Company } from "../interfaces";
import { selectCompanyInputs } from "../inputs";
import type { ElementWithLabel } from "../types";

export const selectCompany = dataSource({
  display: {
    label: "Select Company",
    description: "Select a Company from a dropdown menu.",
  },
  inputs: selectCompanyInputs,
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, filterType, filterValues, filterQuery },
  ) => {
    const client = await createClient(connection, false);
    const params: Record<string, unknown> = {
      filterType,
      filterValues,
    };

    const { result: companies } = await fetchPaginatedData<Company>(
      client,
      `/v1/companies.json`,
      true,
      params,
    );

    const objects = companies.map<ElementWithLabel>((company) => ({
      key: util.types.toString(company.id),
      label: company.company,
    }));

    return { result: filterAndSort(objects, filterQuery) };
  },
});
