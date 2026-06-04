import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CATEGORIES_PATH } from "../../constants";
import { listCategoriesExamplePayload } from "../../examplePayloads/categories";
import { listCategoriesInputs } from "../../inputs/categories";
import { paginateResults } from "../../util/pagination";

export const listCategories = action({
  examplePayload: listCategoriesExamplePayload,
  display: {
    label: "List Categories",
    description: "List Content Builder categories (folders).",
  },
  inputs: listCategoriesInputs,
  perform: async (context, { connection, fetchAll, pageSize, page }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $pageSize: pageSize,
      $page: page,
    };

    const data = await paginateResults(
      client,
      CATEGORIES_PATH,
      fetchAll,
      params,
    );

    return { data };
  },
});
