import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCompanyInputs } from "../inputs";
import type { DiscoveryResponse } from "../types";

const selectCompany = dataSource({
  display: {
    label: "Select Company",
    description: "Select a company from a picklist.",
  },
  dataSourceType: "picklist",
  inputs: selectCompanyInputs,
  perform: async (_context, params) => {
    const client = createClient(params.connection, false);
    const { data } = await client.get<DiscoveryResponse>("/discovery/me");
    const result: Element[] = data.imsOrgs
      .flatMap((org) => org.companies)
      .map((company) => ({
        key: company.globalCompanyId,
        label: company.companyName,
      }));
    return { result };
  },
});

export default { selectCompany };
