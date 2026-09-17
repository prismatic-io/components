import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectItamAssetInputs as inputs } from "../inputs";
import type { ItamAsset } from "../types";
import { getItamListData } from "../util";
export const selectItamAsset = dataSource({
  display: {
    label: "Select Asset (ITAM)",
    description: "Select an asset from a list of IT Asset Management assets.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, { debug: false });
    const { data } = await getItamListData<ItamAsset, "assets">(
      client,
      "assets",
      "assets",
      { fetchAll: true, params: {} },
    );
    const objects = (data.assets || []).map<Element>(
      ({ name, serial_no, id }) => ({
        key: util.types.toString(id),
        label: serial_no ? `${name} (${serial_no})` : name,
      }),
    );
    return { result: objects };
  },
});
