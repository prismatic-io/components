import {
  type Connection,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { AxiosInstance } from "axios";
import FormData from "form-data";
import { adpOauth2 } from "./connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "./constants";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== adpOauth2.key) {
    throw new Error("Invalid connection key");
  }
};

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanKeyValPair = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair<unknown>[])
    : undefined;

export async function fetchAllRecords<T>(
  client: AxiosInstance,
  url: string,
  dataName: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<{
  data: T[];
  meta: unknown;
  confirmMessage: unknown;
}> {
  
  if ("$count" in params) {
    params.$count = undefined;
  }
  if (fetchAll) {
    const $top = 100;
    let records: T[] = [];
    const data = await fetchData(client, url, {
      count: true,
    });
    const { totalNumber } = data.meta;
    if (!totalNumber) {
      return {
        data: data[dataName],
        meta: data.meta,
        confirmMessage: data.confirmMessage,
      };
    }
    const amountOfPromises = Math.ceil(totalNumber / $top);
    const promises = Array.from({ length: amountOfPromises }, (_, i) =>
      fetchData(client, url, {
        ...params,
        $skip: i * $top,
        $top,
      }),
    );
    const responses = await Promise.all(promises);
    const recordsArray = responses.map((response) => response[dataName]);
    records = records.concat(...recordsArray);
    const { meta, confirmMessage } = responses[amountOfPromises - 1];
    return {
      meta,
      confirmMessage,
      data: records,
    };
  }
  const data = await fetchData(client, url, params);
  return {
    data: data[dataName],
    meta: data.meta,
    confirmMessage: data.confirmMessage,
  };
}


export async function fetchAllRecordsNoCount<T>(
  client: AxiosInstance,
  url: string,
  dataName: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<{
  data: T[];
  meta: unknown;
  confirmMessage: unknown;
}> {
  if (fetchAll) {
    const $top = 100;
    let records: T[] = [];
    let keepFetching = true;
    let $skip = 0;
    let lastRequest: Record<string, unknown> = {};
    do {
      const data = await fetchData(client, url, {
        ...params,
        $skip,
        $top,
      });
      records = records.concat(data[dataName]);
      $skip += $top;
      keepFetching = data[dataName].length < $top;
      if (keepFetching) {
        lastRequest = data;
      }
    } while (keepFetching);
    const { meta, confirmMessage } = lastRequest;
    return {
      meta,
      confirmMessage,
      data: records,
    };
  }
  const data = await fetchData(client, url, params);
  return {
    data: data[dataName],
    meta: data.meta,
    confirmMessage: data.confirmMessage,
  };
}
export async function fetchData(
  client: AxiosInstance,
  url: string,
  params: Record<string, unknown>,
) {
  const { data } = await client.get(url, {
    params,
  });
  return data;
}

export const toFormData = (
  formData: KeyValuePair<unknown>[],
  fileData: KeyValuePair<unknown>[],
  fileDataFileNames: Record<string, string> | undefined,
) => {
  const form = new FormData();
  (formData || []).map(({ key, value }) => form.append(key, value));
  (fileData || []).map(({ key, value }) =>
    form.append(key, util.types.toBufferDataPayload(value).data, {
      filename:
        (fileDataFileNames === null || fileDataFileNames === undefined
          ? undefined
          : fileDataFileNames[key]) || key,
    }),
  );
  return form;
};

export const getBaseUrl = (connection: Connection) => {
  const { endpoint } = connection.fields;
  return endpoint ? util.types.toString(endpoint) : API_ENDPOINT;
};

export const getTokenEndpoint = (connection: Connection) => {
  const { tokenEndpoint } = connection.fields;
  return tokenEndpoint ? util.types.toString(tokenEndpoint) : TOKEN_ENDPOINT;
};

export const cleanCertificateValue = (value: unknown) =>
  util.types.toString(value).replace(/\\n/g, "\n");
