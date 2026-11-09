import type { SearchStreamBatch, SearchStreamResult } from "../types";

export const mergeSearchStreamBatches = (
  batches: SearchStreamBatch[],
): SearchStreamResult => {
  const summaryRow = batches.find(
    (batch) => batch.summaryRow !== undefined,
  )?.summaryRow;
  return {
    results: batches.flatMap((batch) => batch.results ?? []),
    fieldMask: batches[0]?.fieldMask,
    requestId: batches[0]?.requestId,
    ...(summaryRow !== undefined && { summaryRow }),
  };
};
