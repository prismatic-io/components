import { dataSource } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectCarriersInputs } from "../inputs";

export const selectCarriers = dataSource({
  display: {
    label: "Select Carrier",
    description: "A picklist of carriers connected to the ShipStation account.",
  },
  inputs: selectCarriersInputs,
  perform: async (_context, params) => {
    const client = createShipStationClient(params.connection);

    const { data } = await client.get("/carriers");

    const result = data.map(
      (carrier: { shippingProviderId: number; name: string }) => ({
        key: carrier.shippingProviderId.toString(),
        label: carrier.name,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
});
