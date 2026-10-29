import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCompanyInputs } from "../inputs";
import type { Company } from "../interfaces";
import { paginateRecords } from "../util";

export const selectCompany = dataSource({
  display: {
    label: "Select Company",
    description: "A Picklist of Intercom companies",
  },
  dataSourceType: "picklist",
  inputs: selectCompanyInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data: companies } = await paginateRecords<Company>(
      client,
      {
        order: "asc",
      },
      true,
      "/companies",
    );

    const result = companies.map(({ id, name }): Element => {
      return {
        label: name,
        key: id,
      };
    });

    return {
      result,
    };
  },
});
