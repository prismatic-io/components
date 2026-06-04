import type { TriggerPayload } from "@prismatic-io/spectral";
import type { Page } from "../interfaces";
import type { DateExtractor, PollingState } from "./interfaces";

export const filterByDate = <T>(
  items: T[],
  lastPolled: string | undefined,
  getDate: DateExtractor<T>,
): T[] => {
  if (!lastPolled) {
    return items;
  }

  const lastPolledDate = new Date(lastPolled);
  return items.filter((item) => {
    const itemDate = getDate(item);
    return itemDate && new Date(itemDate) > lastPolledDate;
  });
};

export const getCreatedAt = <T extends { createdAt?: string }>(
  item: T,
): string | undefined => item.createdAt;

export const getVersionCreatedAt = (page: Page): string | undefined =>
  page.version?.createdAt;

export const buildPollingResult = <T>(
  payload: TriggerPayload,
  data: T[],
): {
  payload: TriggerPayload;
  polledNoChanges: boolean;
} => ({
  payload: { ...payload, body: { data } },
  polledNoChanges: data.length === 0,
});

export const getLastPolled = (
  state: PollingState,
  now: string,
): string | undefined => state?.lastPolled || now;

export const categorizeByChangeType = <T extends { createdAt?: string }>(
  items: T[],
  lastPolled: string | undefined,
): { created: T[]; updated: T[] } =>
  items.reduce<{ created: T[]; updated: T[] }>(
    (acc, item) => {
      if (
        !lastPolled ||
        (item.createdAt && new Date(item.createdAt) >= new Date(lastPolled))
      ) {
        acc.created.push(item);
      } else {
        acc.updated.push(item);
      }
      return acc;
    },
    { created: [], updated: [] },
  );
