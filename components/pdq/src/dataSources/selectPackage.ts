import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { packageDatasource } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { Package } from "../interfaces";
import { fetchAllData, TComparator } from "../util";

export const selectPackage = dataSource({
  display: {
    label: "Select Package",
    description: "Select a Package from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createHttpClient(connection, false);
    const { data } = (await fetchAllData(client, "/packages", {}, true)) as {
      data: Package[];
    };

    const packages = data
      .sort(TComparator<Package>)
      .map<Element>(({ id, name }) => ({
        key: id,
        label: name,
      }));

    return { result: packages };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: packageDatasource,
  },
});
