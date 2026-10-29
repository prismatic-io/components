import { dataSource } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectPackagesInputs } from "../inputs";

export const selectPackages = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Package",
    description: "A picklist of packages provided by the specified carrier.",
  },
  inputs: selectPackagesInputs,
  perform: async (_context, { carrierCode, connectionInput }) => {
    const client = createShipStationClient(connectionInput);

    const { data } = await client.get(
      `/carriers/listpackages?carrierCode=${carrierCode}`,
    );

    return {
      result: data.map((pkg: { code: string; name: string }) => ({
        key: pkg.code,
        label: pkg.name,
      })),
    };
  },
});
