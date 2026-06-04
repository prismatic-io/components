import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCategoriesExamplePayload } from "../../examplePayloads";
import { listCategoriesInputs } from "../../inputs";
import { paginateOffset } from "../../util";

export const listCategories = action({
  display: {
    label: "List Categories",
    description: "Lists categories with optional board filter and pagination.",
  },
  inputs: listCategoriesInputs,
  perform: async (context, { connection, boardId, fetchAll, limit, skip }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateOffset(
      client.post,
      "/categories/list",
      "categories",
      { boardID: boardId, limit, skip },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listCategoriesExamplePayload,
});
