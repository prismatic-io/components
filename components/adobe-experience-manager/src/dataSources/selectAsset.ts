import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import { ASSETS_API_PATH, MAX_DATA_SOURCE_ITEMS, MAX_PAGE_LIMIT } from "../constants";
import { selectAssetExamplePayload } from "../examplePayloads";
import { selectAssetInputs } from "../inputs";
import type { AssetSearchClause, AssetSearchHit, AssetSearchResponse } from "../types";
import { compareElementLabels } from "../utils";

export const selectAsset = dataSource({
  display: {
    label: "Select Asset",
    description: "Select an asset from the list of assets.",
  },
  inputs: selectAssetInputs,
  examplePayload: selectAssetExamplePayload,
  perform: async (_context, { connection }) => {
    const client = createAemClient(connection, false);
    const query: AssetSearchClause[] = [{ match: { text: "" } }];
    const hits: AssetSearchHit[] = [];
    let cursor: string | undefined;
    do {
      const { data } = await client.post<AssetSearchResponse>(`${ASSETS_API_PATH}/search`, {
        query,
        limit: MAX_PAGE_LIMIT,
        cursor,
      });
      hits.push(...(data.hits?.results ?? []));
      cursor = data.cursor;
    } while (cursor && hits.length < MAX_DATA_SOURCE_ITEMS);
    const result = hits
      .slice(0, MAX_DATA_SOURCE_ITEMS)
      .map<Element>((hit) => ({
        label:
          hit.repositoryMetadata?.["repo:path"] ??
          hit.repositoryMetadata?.["repo:name"] ??
          hit.assetId,
        key: hit.assetId,
      }))
      .sort(compareElementLabels);
    return { result };
  },
  dataSourceType: "picklist",
});
