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
