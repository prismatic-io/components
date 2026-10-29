import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectDepartmentExamplePayload } from "../examplePayloads";
import { selectDepartmentInputs } from "../inputs";
import type { Department } from "../types";
import { mapToSortedElements, paginateResults } from "../util";

export const selectDepartment = dataSource({
  display: {
    label: "Select Department",
    description:
      "Dynamically fetch a list of departments from Jamf Pro for use in a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectDepartmentInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { results } = await paginateResults<Department>(
      client,
      "/v1/departments",
      true,
      {},
    );
    const result: Element[] = mapToSortedElements(results, "id", "name");
    return { result };
  },
  examplePayload: selectDepartmentExamplePayload,
});
