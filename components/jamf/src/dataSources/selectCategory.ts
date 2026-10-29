import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCategoryExamplePayload } from "../examplePayloads";
import { selectCategoryInputs } from "../inputs";
import type { Category } from "../types";
import { mapToSortedElements, paginateResults } from "../util";

export const selectCategory = dataSource({
  display: {
    label: "Select Category",
    description:
      "Dynamically fetch a list of categories from Jamf Pro for use in a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectCategoryInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { results } = await paginateResults<Category>(
      client,
      "/v1/categories",
      true,
      {},
    );
    const result: Element[] = mapToSortedElements(results, "id", "name");
    return { result };
  },
  examplePayload: selectCategoryExamplePayload,
});
