import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import crypto from "node:crypto";
import type { PaginationResults } from "./interfaces/PaginationResults";
import type { AxiosResponse } from "axios";
import type { PaginatedAttribute } from "./types/PaginatedAttribute";

export const computeZoomVerifyHash = (
  webhookToken: string,
  message: string,
): string => {
  return crypto
    .createHmac("sha256", webhookToken)
    .update(message)
    .digest("hex");
};

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanCodeInput = (value: unknown) => {
  if (value) {
    return util.types.toObject(value);
  }
  return undefined;
};

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanStringValueListInput = (
  value: unknown,
): string[] | undefined => {
  if (value && Array.isArray(value)) {
    return value.map(cleanStringInput).filter(Boolean) as string[];
  }

  return undefined;
};

export const getAllPaginationResults = async <T>(
  client: HttpClient,
  endpoint: string,
  attribute: PaginatedAttribute,
  queryParameters?: Record<string, unknown>,
): Promise<Record<PaginatedAttribute, T[]>> => {
  let nextPageToken: PaginationResults["next_page_token"] = null;
  const results: T[] = [];

  do {
    const response: AxiosResponse<PaginationResults> = await client.get(
      endpoint,
      {
        params: {
          ...queryParameters,
          next_page_token: nextPageToken,
        },
      },
    );

    const data = response.data;

    const attributeValue = data[attribute];
    if (Array.isArray(attributeValue)) {
      results.push(...(attributeValue as unknown as T[]));
    }
    nextPageToken = data.next_page_token;
  } while (nextPageToken);
  return { [attribute]: results } as Record<PaginatedAttribute, T[]>;
};
