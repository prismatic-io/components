import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "./connections";

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanValueListInput = (value: unknown): string[] => {
  if (value && Array.isArray(value)) {
    return value.map((item) => util.types.toString(item));
  }
  return [];
};

const throwCodeInputError = (inputLabel: string): void => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanArrayCodeInput = (
  value: unknown,
  inputLabel: string,
): Record<string, unknown>[] | undefined => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};

import { URL, URLSearchParams } from "node:url";






export function extractPaginationTokens(url?: string): {
  nextPageToken?: string;
  previousPageToken?: string;
} {
  if (!url) return {};

  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    return {
      nextPageToken: params.get("page_token") || undefined,
      previousPageToken: params.get("previous_token") || undefined,
    };
  } catch (_error) {
    
    return {};
  }
}






export function extractMetadata(metadata?: {
  self?: string;
  next?: string;
  prev?: string;
  count?: number;
}) {
  if (!metadata) return {};

  const nextTokens = extractPaginationTokens(metadata.next);
  const prevTokens = extractPaginationTokens(metadata.prev);

  return {
    nextPageToken: nextTokens.nextPageToken,
    previousPageToken: prevTokens.previousPageToken,
    totalCount: metadata.count,
  };
}

export function getBase64FromUrl(url: string): string {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
}

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};
