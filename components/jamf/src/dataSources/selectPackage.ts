import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectPackageExamplePayload } from "../examplePayloads";
import { selectPackageInputs } from "../inputs";
import type { Package } from "../types";
import { mapToSortedElements, paginateResults } from "../util";

export const selectPackage = dataSource({
  display: {
    label: "Select Package",
    description:
      "Dynamically fetch a list of packages from Jamf Pro for use in a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectPackageInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { results } = await paginateResults<Package>(
      client,
      "/v1/packages",
      true,
      {},
    );
    const result: Element[] = mapToSortedElements(results, "id", "packageName");
    return { result };
  },
  examplePayload: selectPackageExamplePayload,
});
