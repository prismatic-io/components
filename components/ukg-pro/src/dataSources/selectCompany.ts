import { dataSource } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../client";
import { selectCompanyExamplePayload } from "../examplePayloads";
import { selectCompanyInputs } from "../inputs";
import type { Company } from "../types";
import { fetchAllPages, toPicklistResult } from "../util";








export const selectCompany = dataSource({
  display: {
    label: "Select Company",
    description: "Select a company from the available companies in UKG Pro.",
  },
  inputs: selectCompanyInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createBasicAuthClient(connection);
    const companies = await fetchAllPages<Company>(client, "/configuration/v1/company-details");
    const result = toPicklistResult(companies, {
      getLabel: (company) => `${company.companyName} (${company.companyId})`,
      getKey: (company) => company.companyId,
    });
    return { result };
  },
  examplePayload: selectCompanyExamplePayload,
});
