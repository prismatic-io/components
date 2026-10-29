import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectPostExamplePayload } from "../examplePayloads";
import { selectPostInputs } from "../inputs";
import type { Post } from "../types";
import { paginateOffset, toSortedPicklist } from "../util";

export const selectPost = dataSource({
  display: {
    label: "Select Post",
    description: "Selects a post from the Canny account.",
  },
  dataSourceType: "picklist",
  inputs: selectPostInputs,
  perform: async (_context, { connection, boardId }) => {
    const client = createClient(connection, false);
    const data = await paginateOffset<"posts", Post>(
      client.post,
      "/posts/list",
      "posts",
      { boardID: boardId },
      true,
    );
    const result = toSortedPicklist(
      data.posts,
      (p) => p.title,
      (p) => p.id,
    );
    return { result };
  },
  examplePayload: selectPostExamplePayload,
});
