import {
  type Connection,
  ConnectionError,
  type Element,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import { authentication } from "./connections";
import {
  API_VERSION,
  INVALID_SERVER_ADDRESS,
  POLL_RESOURCE_CONFIG,
  UNKOWN_CONNECTION_ERROR,
} from "./constants";
import type { AuthCredentials, MapPicklist, Records } from "./interfaces/general";
import type { SAPBusinessOneRecord } from "./types";
import type { AxiosInstance, AxiosProxyConfig } from "axios";
import FormData from "form-data";

export const validateConnection = (connection: Connection) => {
  if (![authentication.key].includes(connection.key)) {
    throw new ConnectionError(connection, UNKOWN_CONNECTION_ERROR);
  }
};

export const cleanBoolean = (value: unknown) => (value ? util.types.toBool(value) : undefined);

export const cleanString = (value: unknown) => (value ? util.types.toString(value) : undefined);

export const cleanCode = (value: unknown) => (value ? util.types.toObject(value) : undefined);

export const cleanBodyFields = (value: unknown) => (value ? util.types.toObject(value) : {});

export const cleanNumber = (value: unknown) => (value ? util.types.toNumber(value) : undefined);

export const cleanKeyValueList = (value: unknown) =>
  value ? util.types.keyValPairListToObject(value as KeyValuePair[]) : undefined;

export const getAuthCredentials = (connection: Connection): AuthCredentials => {
  
  const username = util.types.toString(connection.fields.username).replace("\\\\", "\\");
  const password = util.types.toString(connection.fields.password);
  const companyName = cleanString(connection.fields.companyName);
  const dbInstance = cleanString(connection.fields.dbInstance);

  return {
    CompanyDB: dbInstance,
    UserName: username,
    Password: password,
    CompanyName: companyName,
  };
};

export const getBaseUrlAndProxy = (connection: Connection) => {
  const { serverAddress, apiVersion } = connection.fields;
  const onPremData = computeProxyConfiguration(connection);
  const port = onPremData?.port;
  const host = onPremData?.host;
  let url: string;
  if (host && port) {
    url = `https://${host}:${port}`;
  } else {
    url = util.types.toString(serverAddress);
  }
  try {
    const newUrl = new URL(url);
    const version = apiVersion === API_VERSION.V2 ? API_VERSION.V2 : API_VERSION.V1;
    newUrl.pathname = `/b1s/${version}`;
    if (newUrl.protocol !== "https:") {
      newUrl.protocol = "https:";
    }
    return {
      baseUrl: newUrl.toString(),
      proxy: onPremData,
    };
  } catch (_error) {
    throw new ConnectionError(connection, INVALID_SERVER_ADDRESS);
  }
};

export const fetchAllData = async (
  client: AxiosInstance,
  url: string,
  params: Record<string, unknown>,
  fetchAll = false,
  limit?: number,
): Promise<Record<string, unknown>[]> => {
  if (!fetchAll) {
    return await fetchData(client, url, params);
  }

  const keepFetching = true;
  const records: Record<string, unknown>[] = [];
  let $skip = 0;
  const $top = 20;

  while (keepFetching) {
    const promises = Array.from({ length: 20 }, () => {
      const currentSkip = $skip;
      $skip += $top;
      return fetchData(client, url, {
        ...params,
        $top,
        $skip: currentSkip,
      });
    });

    const data = await Promise.all(promises);
    const flattenedData = data.flat();
    records.push(...flattenedData);
    if (!flattenedData.length || data.some((record) => !record.length)) {
      break;
    }
    if (limit && records.length >= limit) {
      break;
    }
  }

  return records;
};

const fetchData = async (client: AxiosInstance, url: string, params: Record<string, unknown>) => {
  const { data } = await client.get(url, {
    params,
  });
  return data.value;
};

export const mapModel = (model: string[]) => {
  return model.map((value) => ({
    value,
    label: value,
  }));
};

export const isValidArray = (data: unknown) => {
  return Array.isArray(data) && data.length > 0;
};

export const validateArray = (data: unknown): Records[] => {
  if (!isValidArray(data)) {
    return [];
  }
  return data as Records[];
};

export const mapPicklistArray = ({ data, keyName, keyLabel, orderKey }: MapPicklist): Element[] => {
  return data
    .sort((a, b) => (a[orderKey] < b[orderKey] ? -1 : 1))
    .map((record) => ({
      key: record[keyName].toString(),
      label: record[keyLabel].toString(),
    }));
};

export const mapLabel = (data: Element[], additionalLabel: string) => {
  return data.map(({ key, label }) => ({
    key,
    label: `${additionalLabel}: ${label}`,
  }));
};

export const computeProxyConfiguration = (connection: Connection): AxiosProxyConfig | undefined => {
  if (!connection) return;
  const { host: rawHost, port: rawPort } = connection.fields;

  if (!rawHost && !rawPort) {
    return;
  }

  return {
    host: util.types.toString(rawHost),
    port: util.types.toNumber(rawPort),
  };
};















export const toSapB1DateFilter = (iso: string): string => {
  const [datePart] = iso.split("T");
  return datePart;
};







export const filterByTimestamp = (
  records: SAPBusinessOneRecord[],
  config: { createdField: string; updatedField: string },
  lastPolledAt: string,
): { created: SAPBusinessOneRecord[]; updated: SAPBusinessOneRecord[] } => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: SAPBusinessOneRecord[] = [];
  const updated: SAPBusinessOneRecord[] = [];

  for (const record of records) {
    const createdValue = record[config.createdField];
    const updatedValue = record[config.updatedField];
    const createdAtDate = typeof createdValue === "string" ? new Date(createdValue) : null;
    const updatedAtDate = typeof updatedValue === "string" ? new Date(updatedValue) : null;

    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    const isUpdated = !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;

    if (isNew) created.push(record);
    else if (isUpdated) updated.push(record);
  }

  return { created, updated };
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(([value, { label }]) => ({
  label,
  value,
}));

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
