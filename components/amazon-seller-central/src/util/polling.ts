import type { HttpClient } from "@prismatic-io/spectral/http";
import { PollResource } from "../constants";
import type {
  AmazonRecord,
  PollingChangesObject,
  PollingRecordChange,
} from "../types";
import { paginateResults } from "./pagination";

const fetchOrdersSince = async (
  client: HttpClient,
  lastUpdatedAfter: string,
  marketplaceIdValues: string | undefined,
): Promise<AmazonRecord[]> => {
  return paginateResults<AmazonRecord>(
    client,
    "/orders/v0/orders",
    {
      LastUpdatedAfter: lastUpdatedAfter,
      MarketplaceIds: marketplaceIdValues,
    },
    "Orders",
    true,
  );
};

const fetchFeedsSince = async (
  client: HttpClient,
  createdSince: string,
): Promise<AmazonRecord[]> => {
  const allFeeds: AmazonRecord[] = [];
  let nextToken: string | undefined;

  do {
    const { data } = await client.get<{
      feeds: AmazonRecord[];
      nextToken?: string;
    }>("/feeds/2021-06-30/feeds", {
      params: {
        createdSince,
        nextToken,
      },
    });
    allFeeds.push(...(data.feeds ?? []));
    nextToken = data.nextToken;
  } while (nextToken);

  return allFeeds;
};

export const fetchPollingChanges = async (
  client: HttpClient,
  resourceType: string,
  lastPolledAt: string,
  marketplaceIds: string | undefined,
): Promise<Required<PollingChangesObject>> => {
  if (resourceType !== PollResource.ORDERS) {
    return {
      created: await fetchFeedsSince(client, lastPolledAt),
      updated: [],
    };
  }

  const records = await fetchOrdersSince(client, lastPolledAt, marketplaceIds);
  const lastPolledDate = new Date(lastPolledAt);
  const created: AmazonRecord[] = [];
  const updated: AmazonRecord[] = [];
  for (const record of records) {
    const purchaseDate = record.PurchaseDate as string;
    if (purchaseDate && new Date(purchaseDate) > lastPolledDate) {
      created.push(record);
    } else {
      updated.push(record);
    }
  }
  return { created, updated };
};

export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
