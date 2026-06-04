import { stringify } from "node:querystring";
import { URL } from "node:url";
import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanObject = (value: unknown) => {
  if (value === "") {
    return undefined;
  }

  return util.types.toObject(value);
};

export const getUserPath = (userPrincipalName: string | undefined): string =>
  userPrincipalName ? `/users/${userPrincipalName}` : "/me";

const cleanUrlQueryParams = (url: string): string => {
  const urlObj = new URL(url);
  urlObj.search = "";
  return urlObj.toString();
};

export const getAdminConsentToken = async (
  connection: Connection,
): Promise<Connection> => {
  const tokenClient = createHttpClient({
    headers: {
      Accepts: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const postData = stringify({
    client_id: util.types.toString(connection.fields.clientId),
    scope: util.types.toString(connection.fields.scopes),
    client_secret: util.types.toString(connection.fields.clientSecret),
    grant_type: "client_credentials",
  });
  const url = cleanUrlQueryParams(
    util.types.toString(connection.fields.tokenUrl),
  );
  const { data } = await tokenClient.post(url, postData);

  connection.token = data;
  return connection;
};

export const paginateResults = async (
  client,
  url,
  fetchAll,
  params = undefined,
) => {
  if (fetchAll) {
    const results = [];
    let nextLink = url;
    let lastResponse = null;
    let firstRequest = true;
    let paramsToSend = params;

    do {
      if (
        firstRequest &&
        paramsToSend &&
        Object.keys(paramsToSend || {})?.length > 0
      ) {
        const { $top, $skip, $skipToken, ...rest } = paramsToSend;
        paramsToSend = rest;
        firstRequest = false;
      } else {
        paramsToSend = undefined;
      }
      const { data } = await client.get(nextLink, {
        params: paramsToSend,
      });
      const { value, ...rest } = data;
      lastResponse = rest;
      results.push(...value);
      nextLink = data["@odata.nextLink"];
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
