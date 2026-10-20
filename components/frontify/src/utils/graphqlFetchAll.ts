import type { GraphQLClient } from "graphql-request";
import { DEFAULT_PAGE_SIZE } from "../inputs/pagination";
export const graphqlFetchAll = async <T = unknown>({
  client,
  query,
  params = {},
  hasNextPath = ["hasNextPage"],
}: {
  client: GraphQLClient;
  query: string;
  params?: Record<string, unknown>;
  hasNextPath?: string[];
}): Promise<T[]> => {
  const responses: T[] = [];
  let hasNext = true;
  let page = 1;
  while (hasNext) {
    const response = await client.request(query, {
      page,
      limit: DEFAULT_PAGE_SIZE,
      ...params,
    });
    hasNext = hasNextPath.reduce<Record<string, unknown> | boolean>(
      (obj, key) =>
        typeof obj === "object" && obj !== null
          ? (obj[key] as Record<string, unknown> | boolean)
          : false,
      response as Record<string, unknown>,
    ) as boolean;
    page += 1;
    responses.push(response as T);
  }
  return responses;
};
