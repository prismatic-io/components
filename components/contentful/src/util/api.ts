import type {
  ClientAPI,
  Collection,
  CollectionProp,
  Environment,
  QueryOptions,
  Space,
} from "contentful-management";
import { PAGINATION_LIMIT } from "../constants";
export const getEnvironment = async (
  client: ClientAPI,
  spaceId: string,
  environmentId: string,
): Promise<Environment> => {
  const space: Space = await client.getSpace(spaceId);
  return await space.getEnvironment(environmentId);
};
export const getAllPaginatedItems = async <T, TPlain>(
  getCollection: (
    options: Pick<QueryOptions, "limit" | "skip">,
  ) => Promise<Collection<T, TPlain>>,
): Promise<TPlain[]> => {
  let total = 0;
  const allItems: TPlain[] = [];
  let skip = 0;
  do {
    const collection: Collection<T, TPlain> = await getCollection({
      limit: PAGINATION_LIMIT,
      skip,
    });
    const data: CollectionProp<TPlain> = collection.toPlainObject();
    total = data.total;
    skip += data.items.length;
    allItems.push(...data.items);
  } while (allItems.length < total);
  return allItems;
};
