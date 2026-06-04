import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectAssetInputs as inputs } from "../inputs/dataSources";
import type { Asset } from "../types/dataSourceTypes";
import { getListData } from "../util";

export const selectAsset = dataSource({
  display: {
    label: "Select Asset",
    description: "Select an asset from a list of assets.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, false);

    const { data } = await getListData<Asset, "assets">(
      client,
      `/assets`,
      "assets",
      true,
      {},
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
