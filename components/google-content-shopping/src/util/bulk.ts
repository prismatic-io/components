import type { BulkResult } from "../types";
export const runBulk = async <I, O>(
  items: I[],
  worker: (item: I, index: number) => Promise<O>,
  concurrency = 10,
): Promise<BulkResult<O>[]> => {
  const results: BulkResult<O>[] = new Array(items.length);
  let next = 0;
  const runWorker = async (): Promise<void> => {
    while (next < items.length) {
      const index = next++;
      try {
        results[index] = {
          success: true,
          result: await worker(items[index], index),
        };
      } catch (error) {
        results[index] = {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }
  };
  const pool = Array.from(
    { length: Math.min(concurrency, items.length) },
    runWorker,
  );
  await Promise.all(pool);
  return results;
};
