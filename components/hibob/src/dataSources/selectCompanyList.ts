import { dataSource, type Element } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { selectCompanyListInputs } from "../inputs";
import type { CompanyListResponse } from "../types/companyList";

export const selectCompanyList = dataSource({
  display: {
    label: "Select Company List",
    description: "Select a company list.",
  },
  inputs: selectCompanyListInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);

    const { data } = await client.get<CompanyListResponse>(
      "/company/named-lists",
      {
        params: {
          includeArchived: true,
        },
      },
    );
    const lists = Object.keys(data);
    const result = lists.map<Element>((key) => ({
      label: key,
      key,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
