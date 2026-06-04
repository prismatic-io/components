import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { selectCompanyInputs } from "../inputs";
import type { Company } from "../types/Company";
import { getAllPaginatedData } from "../util";

export const selectCompany = dataSource({
  display: {
    label: "Select Company",
    description: "Select a company from the list of companies.",
  },
  inputs: selectCompanyInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const companies = (await getAllPaginatedData<Company>(
      client,
      "/crm/v3/objects/companies",
      true,
      true,
    )) as Company[];

    const result = companies.map<Element>((company) => ({
      label: company.properties.name,
      key: util.types.toString(company.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
