import {
  type IItem,
  type ISearchOptions,
  type ISearchResult,
  searchItems,
} from "@esri/arcgis-rest-portal";
import {
  ApiKeyManager,
  ArcGISIdentityManager,
} from "@esri/arcgis-rest-request";
import { type Connection, util } from "@prismatic-io/spectral";
import { arcgisOAuth2Connection } from "../connections";

export const checkConnection = (connection: Connection): void => {
  if (connection.key !== arcgisOAuth2Connection.key) {
    throw new Error("Invalid connection provided");
  }
};

export const getToken = (connection: Connection): string => {
  const token = connection.token?.access_token;
  if (!token) {
    throw new Error("No token found in connection");
  }
  return token as string;
};

export const getIdentityManager = async (
  connection: Connection,
): Promise<ArcGISIdentityManager> => {
  checkConnection(connection);
  const token = getToken(connection);
  return await ArcGISIdentityManager.fromToken({
    token,
  });
};

export const getApiKeyManager = (connection: Connection): ApiKeyManager => {
  checkConnection(connection);
  const token = getToken(connection);
  return ApiKeyManager.fromKey(token);
};

export const checkAndParseJson = (json: unknown) => {
  if (typeof json !== "string") throw new Error("Invalid JSON");
  if (json.length === 0) return undefined;
  return JSON.parse(json);
};

export const cleanUndefinedAttributes = (obj: Record<string, unknown>) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        if (typeof value === "object" && Array.isArray(value) === false) {
          acc[key] = cleanUndefinedAttributes(value as Record<string, unknown>);
        } else {
          acc[key] = value;
        }
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );
};

export const parseStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const parseFloatInput = (input: unknown) => {
  const string = util.types.toString(input);
  if (string.length === 0) return undefined;
  if (!util.types.isNumber(string)) throw new Error("Invalid number");
  return util.types.toNumber(string);
};

export const parseIntInput = (input: unknown) => {
  const string = util.types.toString(input);
  if (string.length === 0) return undefined;
  if (!util.types.isNumber(string)) throw new Error("Invalid number");
  return util.types.toInt(string);
};

export const paginateRecords = async (
  searchItemParams: ISearchOptions,
  fetchAll = false,
): Promise<ISearchResult<IItem>> => {
  const searchItemsResults = await searchItems(searchItemParams);

  const { nextPage, results: records, ...rest } = searchItemsResults;

  let next = nextPage;
  let restParams = rest;
  while (next && fetchAll) {
    const {
      nextPage: nextPagePagination,
      results: resultsPagination,
      ...restPagination
    } = await next();
    records.push(...resultsPagination);
    restParams = restPagination;
    next = nextPagePagination;
  }

  return {
    ...restParams,
    results: records,
  };
};
