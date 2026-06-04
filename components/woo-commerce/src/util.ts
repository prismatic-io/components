import {
  type Connection,
  ConnectionError,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { URL } from "url";
import { basic } from "./connections";

export const validateConnection = (connection: Connection) => {
  if (![basic.key].includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection: ${connection?.key}.`,
    );
  }
};

export const getBaseUrl = (connection: Connection): string => {
  const domain = cleanDomain(util.types.toString(connection.fields.domain));
  return `https://${domain}/wp-json/wc/v3`;
};

export const cleanDomain = (domain: string): string => {
  
  if (domain.startsWith("https://")) {
    const { host } = new URL(domain);
    return host;
  }

  const { host } = new URL(`https://${domain}`);
  return host;
};

export const getAuthorization = (connection: Connection) => {
  if (connection.key === basic.key) {
    const token = Buffer.from(
      `${util.types.toString(
        connection?.fields.username,
      )}:${util.types.toString(connection?.fields.password)}`,
    ).toString("base64");

    return `Basic ${token}`;
  }
  return `Bearer ${util.types.toString(connection?.token?.access_token)}`;
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanKeyValPairListInput = (value: unknown) => {
  const data = util.types.keyValPairListToObject(
    value as KeyValuePair<unknown>[],
  );

  if (Object.keys(data).length === 0) {
    return {};
  }
  return data;
};

export const paginateRecords = async (
  httpClient: HttpClient,
  url: string,
  params: Record<string, unknown>,
  fetchAll = false,
) => {
  const records = [];
  if (fetchAll) {
    const { data, headers } = await httpClient.get(url, {
      params: {
        ...params,
        page: 1,
      },
    });
    records.push(...data);
    const nextPage = headers["x-wp-totalpages"] || headers["X-WP-TotalPages"];
    if (nextPage) {
      const nextPageNumber = util.types.toNumber(nextPage);
      const pages = await Promise.all(
        Array.from({ length: nextPageNumber - 1 }, (_, i) =>
          httpClient.get(url, {
            params: {
              ...params,
              page: i + 2,
            },
          }),
        ),
      );
      records.push(...pages.flatMap((page) => page.data));
    }
    return {
      data: records,
      headers,
    };
  }
  const { data, headers } = await httpClient.get(url, {
    params,
  });
  return {
    data,
    headers,
  };
};
