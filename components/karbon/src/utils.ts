import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import connections from "./connections";
import type { OdataObject } from "./interfaces/OdataObject";
import { MAX_PAGE_SIZE } from "./constants";
import { createKarbonClient } from "./client";
import type { GetPaginatedDataParams } from "./interfaces/GetPaginatedDataParams";



export const cleanOdata = <T>(obj: Record<string, unknown>) =>
  Object.entries(obj).reduce(
    (acc, [currentKey, currentValue]) => {
      if (currentKey.startsWith("@odata.")) {
        return {
          ...acc,
          odata: {
            [currentKey.replace("@odata.", "")]: currentValue,
            ...acc.odata,
          },
        };
      } else {
        return {
          [currentKey]: currentValue,
          ...acc,
        };
      }
    },
    {} as OdataObject<T>,
  );

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanCodeInput = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const getCredentialsFromConnection = (connection: Connection) => {
  const applicationId = util.types.toString(connection.fields.applicationId);
  const accessKey = util.types.toString(connection.fields.accessKey);
  return { applicationId, accessKey };
};

export const getPaginatedData = async <T>({
  client,
  endpoint,
  getAllData,
  pagination: { $top, $skip },
  $filter,
  $orderby,
}: GetPaginatedDataParams) => {
  if (getAllData) {
    $skip = 0;
    $top = MAX_PAGE_SIZE;
  } else {
    $skip = $skip || 0;
    $top = $top || MAX_PAGE_SIZE;
  }

  const { data } = await client.get<{
    value: T[];
  }>(endpoint, {
    params: { $top, $skip, $filter, $orderby },
  });

  const originalData: OdataObject<T> = cleanOdata(data);

  
  originalData.value = originalData.value || [];

  
  if (!getAllData) return originalData;

  
  const count = util.types.toNumber(originalData.odata?.count);
  const countLessThanMaxPageSize = count <= MAX_PAGE_SIZE;

  
  if (count === 0 || countLessThanMaxPageSize) {
    return originalData;
  }

  const totalPages = Math.ceil(count / MAX_PAGE_SIZE);

  const skipValues = Array.from(
    { length: totalPages - 1 },
    (_, i) => (i + 1) * MAX_PAGE_SIZE,
  );

  
  const pagePromises = skipValues.map((skip) =>
    client.get<{
      value: T[];
    }>(endpoint, {
      params: { $top: MAX_PAGE_SIZE, $skip: skip, $filter, $orderby },
    }),
  );

  
  const pageResponses = await Promise.all(pagePromises);

  const allData: T[] = [
    ...(originalData.value || []),
    ...pageResponses.flatMap((response) => response.data.value),
  ];

  originalData.value = allData;

  return originalData;
};

export const createWebhook = async (
  connection: Connection,
  debug: boolean,
  targetUrl: string,
  webhookType: string,
) => {
  const client = createKarbonClient(connection, debug);
  const response = await client.post("/v3/WebhookSubscriptions", {
    TargetUrl: targetUrl,
    WebhookType: webhookType,
  });
  return { data: cleanOdata(response.data) };
};

export const deleteWebhook = async (
  connection: Connection,
  debug: boolean,
  webhookType: string,
) => {
  const client = createKarbonClient(connection, debug);
  const { data } = await client.delete(
    `/v3/WebhookSubscriptions/${webhookType}`,
  );

  return { data };
};
