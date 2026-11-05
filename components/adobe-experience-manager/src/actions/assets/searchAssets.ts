import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import {
  ASSET_MODIFY_DATE_FIELD,
  ASSETS_API_PATH,
  MAX_FETCH_ALL_PAGES,
  MAX_PAGE_LIMIT,
} from "../../constants";
import { searchAssetsExamplePayload } from "../../examplePayloads";
import { searchAssetsInputs } from "../../inputs";
import { searchAssetsOutputSchema } from "../../outputSchemas";
import type { AssetSearchClause, AssetSearchHit, AssetSearchResponse } from "../../types";
import { buildAssetFilterClauses } from "../../utils";

export const searchAssets = action({
  display: {
    label: "Search Assets",
    description: "Search assets by folder, MIME type, modified date, and text.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAemClient(params.connection, context.debug.enabled);
    const range =
      params.modifiedAfter || params.modifiedBefore
        ? { gte: params.modifiedAfter, lt: params.modifiedBefore }
        : undefined;
    const query: AssetSearchClause[] = [
      { match: { text: params.filters?.searchText ?? "" } },
      ...buildAssetFilterClauses(params),
      ...(range ? [{ range: { [ASSET_MODIFY_DATE_FIELD]: range } }] : []),
    ];
    const sort = params.filters?.sortField
      ? [
          {
            field: params.filters.sortField,
            order: params.filters?.sortOrder === "DESC" ? "DESC" : "ASC",
          },
        ]
      : undefined;

    if (!params.fetchAll) {
      const { data } = await client.post<AssetSearchResponse>(`${ASSETS_API_PATH}/search`, {
        query,
        sort,
        limit: params.pagination?.limit,
        cursor: params.pagination?.cursor,
      });
      return { data };
    }
    const results: AssetSearchHit[] = [];
    let cursor: string | undefined = params.pagination?.cursor;
    let pages = 0;
    do {
      const { data } = await client.post<AssetSearchResponse>(`${ASSETS_API_PATH}/search`, {
        query,
        sort,
        limit: MAX_PAGE_LIMIT,
        cursor,
      });
      results.push(...(data.hits?.results ?? []));
      cursor = data.cursor;
      pages++;
    } while (cursor && pages < MAX_FETCH_ALL_PAGES);
    return { data: { hits: { results }, cursor } };
  },
  inputs: searchAssetsInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: searchAssetsOutputSchema }),
  examplePerform: async () => searchAssetsExamplePayload,
  examplePayload: searchAssetsExamplePayload,
});
