import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { selectProductGroupPayload } from "../examplePayloads";
import { company, connection, site } from "../inputs/general";

export const selectProductGroup = dataSource({
  display: {
    label: "Select Product Group",
    description: "Select a product group from a dropdown list",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } = await client.get<{ description: string; id: number }[]>("/product_groups");

    const objects = data.map<Element>((productGroup) => ({
      key: util.types.toString(productGroup.id),
      label: productGroup.description,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: selectProductGroupPayload,
});
