import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { company, connection, site } from "../inputs/general";

export const selectPriceBand = dataSource({
  display: {
    label: "Select Price Band",
    description: "Select a price band from a dropdown list.",
  },
  perform: async (_context, { connection, site, company }) => {
    const client = getClient(connection, false, site, company);
    const { data } = await client.get<{ id: number; name: string }[]>("/price_bands");

    const objects = data.map<Element>((band) => ({
      key: util.types.toString(band.id),
      label: band.name,
    }));

    return { result: objects.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "")) };
  },
  dataSourceType: "picklist",
  inputs: {
    connection,
    site,
    company,
  },
  examplePayload: {
    result: [{ label: "Standard", key: "1064" }],
  },
});
