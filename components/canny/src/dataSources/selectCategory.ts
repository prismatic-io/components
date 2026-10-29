import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCategoryExamplePayload } from "../examplePayloads";
import { selectCategoryInputs } from "../inputs";
import type { Category } from "../types";
import { paginateOffset, toSortedPicklist } from "../util";

export const selectCategory = dataSource({
  display: {
    label: "Select Category",
    description: "Selects a category from the Canny account.",
  },
  dataSourceType: "picklist",
  inputs: selectCategoryInputs,
  perform: async (_context, { connection, boardId }) => {
    const client = createClient(connection, false);
    const data = await paginateOffset<"categories", Category>(
      client.post,
      "/categories/list",
      "categories",
      { boardID: boardId },
      true,
    );
    const result = toSortedPicklist(
      data.categories,
      (c) => c.name,
      (c) => c.id,
    );
    return { result };
  },
  examplePayload: selectCategoryExamplePayload,
});
