import { action } from "@prismatic-io/spectral";
import { getMondayClient } from "../../client";
import { listBoardsExamplePayload } from "../../examplePayloads";
import { listBoardsInputs } from "../../inputs";
import GetBoardsQuery from "../../queries/getBoards.gql";
import type { Board } from "../../types";
import { getAllBoards } from "../../util";

export const listBoards = action({
  display: {
    label: "List Boards",
    description: "Lists all available boards in the Monday account.",
  },
  inputs: listBoardsInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await getAllBoards<Board>(client);
      return { data };
    }

    const variables = { limit: params.limit, page: params.page };
    const data = await client.request(GetBoardsQuery, variables);
    return { data };
  },
  examplePayload: listBoardsExamplePayload,
});
