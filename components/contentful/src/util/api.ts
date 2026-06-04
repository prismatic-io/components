import type { Element } from "@prismatic-io/spectral";
import type {
  ClientAPI,
  Collection,
  CollectionProp,
  ContentTypeProps,
  EntryProps,
  Environment,
  EnvironmentProps,
  KeyValueMap,
  OrganizationProp,
  QueryOptions,
  Space,
  SpaceProps,
} from "contentful-management";
import { MAX_POLL_PAGES, PAGINATION_LIMIT } from "../constants";

export const getEnvironment = async (
  client: ClientAPI,
  spaceId: string,
  environmentId: string,
): Promise<Environment> => {
  const space: Space = await client.getSpace(spaceId);
  return await space.getEnvironment(environmentId);
};

export const getAllPaginatedItems = async <T, TPlain>(
  getCollection: (options: QueryOptions) => Promise<Collection<T, TPlain>>,
) => {
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


















export const fetchEntriesSince = async (
  environment: Environment,
  lastPolledAt: string,
  contentType: string | undefined,
): Promise<{ records: EntryProps<KeyValueMap>[]; truncated: boolean }> => {
  const records: EntryProps<KeyValueMap>[] = [];
  for (let page = 0; page < MAX_POLL_PAGES; page++) {
    const query: QueryOptions = {
      "sys.updatedAt[gte]": lastPolledAt,
      order: "-sys.updatedAt",
      limit: PAGINATION_LIMIT,
      skip: page * PAGINATION_LIMIT,
    };
    if (contentType) {
      query.content_type = contentType;
    }
    const collection = await environment.getEntries(query);
    const data: CollectionProp<EntryProps<KeyValueMap>> =
      collection.toPlainObject();
    records.push(...data.items);
    if (data.items.length < PAGINATION_LIMIT) {
      return { records, truncated: false };
    }
  }
  return { records, truncated: true };
};

export const mapItemsForPicklist = (
  allItems:
    | SpaceProps[]
    | EnvironmentProps[]
    | OrganizationProp[]
    | ContentTypeProps[],
  dataSourceReturn: string,
) =>
  allItems.map<Element>(({ name, sys: { id } }) => ({
    label: name,
    key: dataSourceReturn === "id" ? id : name,
  }));
