import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCompanyExamplePayload } from "../examplePayloads";
import { selectCompanyInputs } from "../inputs";
import type { Company } from "../types";
import { paginateCursor, toSortedPicklist } from "../util";

export const selectCompany = dataSource({
  display: {
    label: "Select Company",
    description: "Selects a company from the Canny account.",
  },
  dataSourceType: "picklist",
  inputs: selectCompanyInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateCursor<"companies", Company>(
      client.postV2,
      "/companies/list",
      "companies",
      {},
      true,
    );
    const result = toSortedPicklist(
      data.companies,
      (c) => c.name,
      (c) => c.id,
    );
    return { result };
  },
  examplePayload: selectCompanyExamplePayload,
});
