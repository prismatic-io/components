import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { vendorDatasource } from "../examplePayloads/datasources";
import { connection } from "../inputs";
import type { Vendor } from "../interfaces/vendors";
import { fetchAllData } from "../util";

export const selectVendor = dataSource({
  display: {
    label: "Select Vendor",
    description: "Select a Vendor from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<Vendor>(client, "/accounting/vendors", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((vendor) => ({
        key: vendor.id,
        label: vendor.name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: vendorDatasource,
  },
});
