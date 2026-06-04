import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { deviceDatasource } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { Device } from "../interfaces";
import { fetchAllData, TComparator } from "../util";

export const selectDevice = dataSource({
  display: {
    label: "Select Device",
    description: "Select a Device from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createHttpClient(connection, false);
    const { data } = (await fetchAllData(client, "/devices", {}, true)) as {
      data: Device[];
    };

    const objects = data
      .sort(TComparator<Device>)
      .map<Element>(({ id, name }) => ({
        key: id,
        label: name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: deviceDatasource,
  },
});
