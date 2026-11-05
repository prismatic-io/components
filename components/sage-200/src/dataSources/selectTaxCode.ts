import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { selectTaxCodePayload } from "../examplePayloads";
import { company, connection, site } from "../inputs/general";

export const selectTaxCode = dataSource({
  display: {
    label: "Select Tax Code",
    description: "Select a tax code from a dropdown list",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } = await client.get<{ name: string; id: number }[]>("/tax_codes");

    const objects = data.map<Element>((taxCode) => ({
      key: util.types.toString(taxCode.id),
      label: taxCode.name,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: selectTaxCodePayload,
});
