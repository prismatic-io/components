import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import { ASSETS_API_PATH } from "../constants";
import { selectAssetRenditionExamplePayload } from "../examplePayloads";
import { selectAssetRenditionInputs } from "../inputs";
import type { AssetRenditionListResponse } from "../types";
import { compareElementLabels } from "../utils";

export const selectAssetRendition = dataSource({
  display: {
    label: "Select Asset Rendition",
    description:
      "Select a rendition from the renditions available for an asset.",
  },
  inputs: selectAssetRenditionInputs,
  examplePayload: selectAssetRenditionExamplePayload,
  perform: async (_context, { connection, assetId }) => {
    const client = createAemClient(connection, false);
    const { data } = await client.get<AssetRenditionListResponse>(
      `${ASSETS_API_PATH}/${encodeURIComponent(assetId)}/renditions`,
    );
    const result = (data.items ?? [])
      .map<Element>((rendition) => ({
        label: rendition.name,
        key: rendition.name,
      }))
      .sort(compareElementLabels);
    return { result };
  },
  dataSourceType: "picklist",
});
