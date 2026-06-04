import { dataSource } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectServicesInputs } from "../inputs";

export const selectServices = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Service",
    description: "A picklist of services provided by the specified carrier.",
  },
  inputs: selectServicesInputs,
  perform: async (_context, { carrierCode, connectionInput }) => {
    const client = createShipStationClient(connectionInput);

    const { data } = await client.get(
      `/carriers/listservices?carrierCode=${carrierCode}`,
    );

    const result = data.map((service: { code: string; name: string }) => ({
      key: service.code,
      label: service.name,
    }));

    return { result };
  },
});
