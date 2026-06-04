import { type Connection, util } from "@prismatic-io/spectral";
import { azureEventGridOauth } from "./connections";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanCode = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const validAzureOAuthConnection = (connection: Connection) => {
  if (azureEventGridOauth.key !== connection.key) {
    throw new Error(`Connection must be of type ${azureEventGridOauth.key}`);
  }
};

export const paginateResults = async (
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown> | undefined = undefined,
) => {
  if (fetchAll) {
    const results = [];
    let nextLink = url;
    let lastResponse = null;
    delete params?.$top;
    do {
      const { data } = await client.get(nextLink, {
        params,
      });
      const { value, ...rest } = data;
      lastResponse = rest;
      results.push(...value);
      
      if (data.nextLink && Array.isArray(value) && value.length > 0) {
        const url = new URL(data.nextLink);
        nextLink = `${url.pathname}${url.search}`;
        params = undefined;
        client.defaults.params["api-version"] = undefined;
      } else {
        break;
      }
    } while (nextLink);
    return {
      value: results,
      ...lastResponse,
    };
  }
  const { data } = await client.get(url, {
    params,
  });
  return data;
};

export const getEventSubscriptionUrl = (
  subscriptionId: string,
  resourceGroupName: string,
  topicName: string,
  eventSubscriptionName?: string,
) =>
  eventSubscriptionName
    ? `subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.EventGrid/topics/${topicName}/providers/Microsoft.EventGrid/eventSubscriptions/${eventSubscriptionName}`
    : `subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.EventGrid/topics/${topicName}/providers/Microsoft.EventGrid/eventSubscriptions`;

export const cleanValueList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(cleanString).filter(Boolean) as string[];
  }
  throw new Error("Event Topics must be an array");
};
