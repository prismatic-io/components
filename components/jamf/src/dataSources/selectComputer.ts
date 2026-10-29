import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectComputerExamplePayload } from "../examplePayloads";
import { selectComputerInputs } from "../inputs";
import type { ComputerInventory } from "../types";
import { mapToSortedElements, paginateResults } from "../util";

export const selectComputer = dataSource({
  display: {
    label: "Select Computer",
    description:
      "Dynamically fetch a list of computers from Jamf Pro for use in a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectComputerInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { results } = await paginateResults<ComputerInventory>(
      client,
      "/v1/computers-inventory",
      true,
      { section: ["GENERAL"] },
    );
    const result: Element[] = mapToSortedElements(
      results,
      "id",
      (c) => c.general?.name,
    );
    return { result };
  },
  examplePayload: selectComputerExamplePayload,
});
