import type { GuruCard, GuruChangesObject, GuruRecordChange } from "../types";
export const toGuruDateFilter = (iso: string): string =>
  iso.replace(/Z$/, "+00:00");
export const classifyCardsByPollDate = (
  cards: GuruCard[],
  lastPolledAt: string,
): {
  created: GuruCard[];
  updated: GuruCard[];
} => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  const created: GuruCard[] = [];
  const updated: GuruCard[] = [];
  for (const card of cards) {
    const createdMs = card.dateCreated
      ? new Date(card.dateCreated).getTime()
      : Number.NaN;
    if (!Number.isNaN(createdMs) && createdMs > lastPolledAtMs) {
      created.push(card);
    } else {
      updated.push(card);
    }
  }
  return { created, updated };
};
export const resolvePollingRecordChanges = (
  data: GuruChangesObject | undefined,
): GuruRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): GuruRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): GuruRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
