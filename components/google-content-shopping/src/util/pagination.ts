import type { Page } from "../types";
export const fetchAllPages = async <T>(
  fetchPage: (pageToken?: string) => Promise<Page<T>>,
): Promise<T[]> => {
  const items: T[] = [];
  let pageToken: string | undefined;
  do {
    const page = await fetchPage(pageToken);
    items.push(...page.items);
    pageToken = page.nextPageToken;
  } while (pageToken);
  return items;
};
