import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { selectDevicesDataSourceExamplePayload } from "../examplePayloads/dataSources";

export const selectDevice = dataSource({
  display: {
    label: "Select Device",
    description: "Select a device from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get(`/devices`);
    const result = (data.devices as []).map<Element>(
      ({ alias, device_id }) => ({
        label: alias,
        key: device_id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectDevicesDataSourceExamplePayload,
  },
});
