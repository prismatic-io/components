import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { DEVICES_ENDPOINT } from "../constants";
import { selectDeviceExamplePayload } from "../examplePayloads/dataSources";
import { selectDeviceInputs } from "../inputs";
import type { Device } from "../types";
import { fetchAllData, TComparator } from "../util";
export const selectDevice = dataSource({
  display: {
    label: "Select Device",
    description: "Select a Device from a dropdown menu.",
  },
  inputs: selectDeviceInputs,
  perform: async (_context, { connection }) => {
    const client = createHttpClient(connection, false);
    const { data } = (await fetchAllData(
      client,
      DEVICES_ENDPOINT,
      {},
      true,
    )) as {
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
  examplePayload: selectDeviceExamplePayload,
});
