import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { PACKAGES_ENDPOINT } from "../constants";
import { selectPackageExamplePayload } from "../examplePayloads/dataSources";
import { selectPackageInputs } from "../inputs";
import type { Package } from "../types";
import { fetchAllData, TComparator } from "../util";
export const selectPackage = dataSource({
  display: {
    label: "Select Package",
    description: "Select a Package from a dropdown menu.",
  },
  inputs: selectPackageInputs,
  perform: async (_context, { connection }) => {
    const client = createHttpClient(connection, false);
    const { data } = (await fetchAllData(
      client,
      PACKAGES_ENDPOINT,
      {},
      true,
    )) as {
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
  examplePayload: selectPackageExamplePayload,
});
