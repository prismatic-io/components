import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectAssetInputs as inputs } from "../inputs";
import type { Asset } from "../types/dataSourceTypes";
import { getListData } from "../util";
export const selectAsset = dataSource({
  display: {
    label: "Select Asset (Deprecated)",
    description:
      "Select an asset from a list of assets. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, { debug: false });
    const { data } = await getListData<Asset, "assets">(
      client,
      `/assets`,
      "assets",
      { fetchAll: true, params: {} },
    );
    const objects = (data.assets || []).map<Element>(
      ({ name, asset_tag, display_id }) => ({
        key: util.types.toString(display_id),
        label: asset_tag ? `${name} (${asset_tag})` : name,
      }),
    );
    return { result: objects };
  },
});
