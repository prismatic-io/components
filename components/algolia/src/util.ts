import type { createAlgoliaClient } from "./client";
import type { AlgoliaIndex } from "./types";

export const fetchAllIndices = async (
  client: ReturnType<typeof createAlgoliaClient>,
): Promise<AlgoliaIndex[]> => {
  const allIndices: AlgoliaIndex[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get("/1/indexes", {
      params: { page },
    });
    const items = (data.items ?? []) as AlgoliaIndex[];
    allIndices.push(...items);
    page++;
    hasMore = page < (data.nbPages ?? 0);
  }

  return allIndices;
};
