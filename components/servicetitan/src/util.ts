import {
  type Connection,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { URLS } from "./constants";
import type { ListGeneric } from "./interfaces";

export const cleanCodeInput = (value: unknown) => {
  if (value) {
    return util.types.toObject(value);
  }
  return undefined;
};

export const mapModelValues = (values: string[], addEmptyValue = false) => {
  if (addEmptyValue) {
    return [
      {
        value: "",
        label: "Empty",
      },
      ...values.map((value) => {
        return {
          value,
          label: value,
        };
      }),
    ];
  }
  return values.map((value) => {
    return {
      value,
      label: value,
    };
  });
};

export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;

export const cleanNumberValueListInput = (value: unknown) => {
  if (value) {
    if (Array.isArray(value)) {
      return value.map((val) => util.types.toNumber(val));
    }
  }
  return undefined;
};

export const cleanStringValueListInput = (value: unknown) => {
  if (value) {
    if (Array.isArray(value)) {
      return value.map((val) => util.types.toString(val));
    }
  }
  return undefined;
};

export async function fetchAllRecords<T>(
  client: HttpClient,
  url: string,
  queryParams: Record<string, unknown>,
): Promise<ListGeneric<T>> {
  let records: T[] = [];
  let hasMore = false;
  let page = 0;
  const pageSize = 500;
  do {
    page++;
    const {
      data,
    }: {
      data: {
        data: T[];
        hasMore: boolean;
      };
    } = await client.get(url, {
      params: {
        ...queryParams,
        page,
        pageSize,
      },
    });
    records = [...records, ...data.data];
    hasMore = data.hasMore;
  } while (hasMore);

  return {
    page,
    pageSize: 500,
    hasMore,
    totalCount: records.length,
    data: records,
  };
}

export const mapBooleanModelInput = mapModelValues(["true", "false"], true);

export const mapStatusModelInput = mapModelValues(
  ["Pending", "Posted", "Exported"],
  true,
);

export const getURLFromConnection = (
  connection: Connection,
  urlType: string | undefined,
) => {
  if (!urlType) {
    throw new Error("URL type is required");
  }
  const environment =
    util.types.toString(connection.fields.environment) || "production";
  const tenant = util.types.toString(connection.fields.tenant);
  const completeServiceTitanURL = `${URLS[environment]}/${urlType}/v2/tenant/${tenant}`;
  return completeServiceTitanURL;
};

export const getTokenFromConnection = (connection: Connection) => {
  return util.types.toString(connection.token?.access_token);
};

export const getApplicationKeyFromConnection = (connection: Connection) => {
  return util.types.toString(connection.fields.applicationKey);
};
