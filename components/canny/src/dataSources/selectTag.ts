import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTagExamplePayload } from "../examplePayloads";
import { selectTagInputs } from "../inputs";
import type { Tag } from "../types";
import { paginateOffset, toSortedPicklist } from "../util";

export const selectTag = dataSource({
  display: {
    label: "Select Tag",
    description: "Selects a tag from the Canny account.",
  },
  dataSourceType: "picklist",
  inputs: selectTagInputs,
  perform: async (_context, { connection, boardId }) => {
    const client = createClient(connection, false);
    const data = await paginateOffset<"tags", Tag>(
      client.post,
      "/tags/list",
      "tags",
      { boardID: boardId },
      true,
    );
    const result = toSortedPicklist(
      data.tags,
      (t) => t.name,
      (t) => t.id,
    );
    return { result };
  },
  examplePayload: selectTagExamplePayload,
});
