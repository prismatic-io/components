import type { DomoRecord } from "../types";

export const buildPollingResult = <T extends { body: { data: unknown } }>(
  payload: T,
  data: {
    created: DomoRecord[];
    updated: DomoRecord[];
  },
) => {
  const totalChanges = data.created.length + data.updated.length;
  return {
    payload: { ...payload, body: { data } },
    polledNoChanges: totalChanges === 0,
  };
};
