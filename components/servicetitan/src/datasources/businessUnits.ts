import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { businessUnitsDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { BusinessUnits } from "../interfaces";

export const selectBusinessUnit = dataSource({
  display: {
    label: "Select Business Unit",
    description:
      "Select a business unit from a dropdown menu (up to 10,000 business units)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "settings");
    let businessUnits: BusinessUnits[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/business-units`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      businessUnits = [...businessUnits, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    const objects = businessUnits
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map<Element>((bu) => ({
        key: bu.id.toString(),
        label: `${bu.name} (ID: ${bu.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: businessUnitsDatasource,
  },
});
