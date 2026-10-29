import type { GraphQLClient } from "graphql-request";
import { MAX_LIMIT } from "../constants";
import GetBoardNamesQuery from "../queries/getBoardNames.gql";
import GetBoardsQuery from "../queries/getBoards.gql";
import type { Board, BoardIdName } from "../types";

export async function getAllBoards<T extends Board | BoardIdName>(
  client: GraphQLClient,
  getMinimalFields = false,
): Promise<{ boards: T[] }> {
  const allBoards: T[] = [];
  const limit = MAX_LIMIT;
  let page = 1;
  const query = getMinimalFields ? GetBoardNamesQuery : GetBoardsQuery;
  while (true) {
    const variables = { limit, page };
    const response = await client.request(query, variables);
    const boards = response.boards;

    if (!boards || boards.length === 0) break;

    allBoards.push(...boards);
    page += 1;
  }

  return { boards: allBoards };
}
