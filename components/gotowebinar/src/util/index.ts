import { util } from "@prismatic-io/spectral";
import { FALSE, MAX_PAGE_SIZE, MAX_POLL_PAGES, TRUE } from "../constants";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  GoToWebinarResponse,
  ParsedRegistrant,
  Registrant,
  UserSubscription,
  Webhook,
} from "../types";
import JSONBig from "json-bigint";
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const toOptionalBoolean = (value: unknown) => {
  const str = util.types.toString(value);
  return str === TRUE ? true : str === FALSE ? false : undefined;
};
export const toOptionalEmailSetting = (value: unknown) => {
  const bool = toOptionalBoolean(value);
  if (bool === undefined) {
    return undefined;
  }
  return {
    enabled: bool,
  };
};
export const toOptionalObject = (value: unknown) => {
  if (!value) {
    return undefined;
  }
  return util.types.toObject(value);
};
export const getT = async <T>(
  client: HttpClient,
  url: string,
  key: string,
  params?: Record<string, string>,
) => {
  const {
    data: { _embedded },
  } = await client.get<GoToWebinarResponse<T>>(url, {
    params,
  });
  if (!_embedded) {
    return [];
  }
  return _embedded[key];
};
export const filterAndMapByCallbackUrl = <T extends Webhook | UserSubscription>(
  callbackUrls: string[],
  collection: T[],
  keyToMapBy: "webhookKey" | "userSubscriptionKey",
) => {
  return collection
    .filter((o) => callbackUrls.includes(o.callbackUrl))
    .map((o) => o[keyToMapBy]);
};
export const deleteByKeys = async (
  client: HttpClient,
  url: string,
  collectionKeys: string[],
) => {
  await client.delete(url, { data: collectionKeys });
};
export const bigIntTransformerConfig = {
  transformResponse: [
    (data: unknown) => {
      if (typeof data === "string") {
        return JSONBig.parse(data);
      }
      return data;
    },
  ],
};
export const parseRegistrantKey = (registrantKey: number[]) => {
  return registrantKey.reduce((acc: string, element: number) => {
    return `${acc}${element}`;
  }, "");
};
export const deleteInstancedWebhooks = async (
  client: HttpClient,
  callbackUrls: string[],
  params: Record<string, string>,
): Promise<void> => {
  const NO_WEBHOOKS = 0;
  const webhooks = await getT<Webhook>(client, "/webhooks", "webhooks", params);
  if (webhooks.length === NO_WEBHOOKS) {
    return;
  }
  const instanceWebhookKeys = filterAndMapByCallbackUrl<Webhook>(
    callbackUrls,
    webhooks,
    "webhookKey",
  );
  await deleteByKeys(client, "/webhooks", instanceWebhookKeys);
  const userSubscriptions = await getT<UserSubscription>(
    client,
    "/userSubscriptions",
    "userSubscriptions",
    params,
  );
  const instanceUserSubscriptions = filterAndMapByCallbackUrl<UserSubscription>(
    callbackUrls,
    userSubscriptions,
    "userSubscriptionKey",
  );
  await deleteByKeys(client, "/userSubscriptions", instanceUserSubscriptions);
};
export const getFromTime = (): string => {
  const now = new Date();
  const from = new Date(now);
  from.setMonth(from.getMonth() - 3);
  from.setHours(0, 0, 0, 0);
  return `${from.toISOString().slice(0, 19)}Z`;
};
export const getEndTime = (): string => {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return `${end.toISOString().slice(0, 19)}Z`;
};
export const fetchAllResults = async <T>(
  client: HttpClient,
  url: string,
  key: string,
  params?: Record<string, string>,
): Promise<T[]> => {
  const results: T[] = [];
  const size = 5;
  let pageNumber = 0;
  let totalPages = 0;
  do {
    const {
      data: { page, _embedded },
    } = await client.get<GoToWebinarResponse<T>>(url, {
      params: {
        ...params,
        size,
        page: pageNumber,
      },
    });
    if (_embedded?.[key]) {
      results.push(..._embedded[key]);
    }
    totalPages = page.totalPages;
    pageNumber += 1;
  } while (pageNumber <= totalPages);
  return results;
};
export const fetchAllRegistrants = async (
  client: HttpClient,
  organizerKey: string,
  webinarKey: string,
): Promise<ParsedRegistrant[]> => {
  const url = `/organizers/${organizerKey}/webinars/${webinarKey}/registrants`;
  const all: ParsedRegistrant[] = [];
  for (let page = 0; page < MAX_POLL_PAGES; page += 1) {
    const { data } = await client.get<Registrant[]>(url, {
      params: { page, limit: MAX_PAGE_SIZE },
      transformResponse: bigIntTransformerConfig.transformResponse,
    });
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(
      ...data.map((registrant) => ({
        ...registrant,
        registrantKey: parseRegistrantKey(registrant.registrantKey.c),
      })),
    );
    if (data.length < MAX_PAGE_SIZE) break;
  }
  return all;
};
export const filterRegistrantsRegisteredAfter = <
  T extends {
    registrationDate?: string;
  },
>(
  registrants: T[],
  lastPolledAt: string,
): T[] => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  return registrants.filter((registrant) => {
    const registeredMs = registrant.registrationDate
      ? new Date(registrant.registrationDate).getTime()
      : Number.NaN;
    return !Number.isNaN(registeredMs) && registeredMs > lastPolledAtMs;
  });
};
