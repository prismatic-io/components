import { dataSource } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectStoresInputs } from "../inputs";

export const selectStores = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Store",
    description: "A picklist of installed stores in the ShipStation account.",
  },
  inputs: selectStoresInputs,
  perform: async (
    _context,
    { connectionInput, showInactive, marketplaceId },
  ) => {
    const client = createShipStationClient(connectionInput);
    const params = {
      showInactive,
      marketplaceId,
    };

    const { data } = await client.get("/stores", { params });

    return {
      result: data.map((store: { storeId: string; storeName: string }) => ({
        key: store.storeId,
        label: store.storeName,
      })),
    };
  },
});
