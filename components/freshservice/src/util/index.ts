import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { freshserviceApiKeyConnection } from "../connections";
import { MAX_ITEMS_PER_PAGE } from "../constants";

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanArrayCodeInput = (
  value: unknown,
  inputLabel: string,
  returnEmptyArray = false,
) => {
  if (value) {
    const cleanedArray = cleanCodeInput(value, inputLabel);
    if (Array.isArray(cleanedArray)) {
      return cleanedArray;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return returnEmptyArray ? [] : undefined;
};

export const cleanCodeInput = (
  value: unknown,
  inputLabel: string,
  returnEmptyObject = false,
) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return returnEmptyObject ? {} : undefined;
};

export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

export const getClientConfig = (connection: Connection) => {
  
  switch (connection.key) {
    case freshserviceApiKeyConnection.key: {
      const baseUrl = `https://${connection.fields.freshserviceDomain}.freshservice.com/api/v2`;
      const authorization = `Basic ${Buffer.from(`${util.types.toString(connection.fields.apiKey)}:X`).toString("base64")}`;
      return { baseUrl, authorization };
    }
    default:
      throw new ConnectionError(connection, "Unsupported connection.");
  }
};

export const cleanLinkHeader = (linkHeader: string) => {
  const cleanLink = linkHeader.replace(/<|>/g, "").replace(/; rel="next"/g, "");
  return cleanLink;
};

export const getListData = async <T, K extends string>(
  client: HttpClient,
  endpoint: string,
  attribute: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<{ data: { [P in K]: T[] } }> => {
  if (fetchAll) {
    params.per_page = MAX_ITEMS_PER_PAGE;
    params.page = undefined;
  }

  const { data, headers } = await client.get(endpoint, {
    params,
  });

  const itemsData = { [attribute]: data[attribute] as T[] } as {
    [P in K]: T[];
  };

  if (!fetchAll) {
    return { data: itemsData };
  }

  let nextLink = headers.link ? cleanLinkHeader(headers.link) : null;

  while (nextLink) {
    const { data: nextData, headers: nextHeaders } = await client.get(nextLink);

    itemsData[attribute as keyof typeof itemsData] = itemsData[
      attribute as keyof typeof itemsData
    ].concat(nextData[attribute]);
    nextLink = nextHeaders.link ? cleanLinkHeader(nextHeaders.link) : null;
  }

  return { data: itemsData };
};
