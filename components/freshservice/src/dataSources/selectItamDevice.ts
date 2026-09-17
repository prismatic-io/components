import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectItamDeviceInputs as inputs } from "../inputs";
import type { ItamDevice } from "../types";
import { getItamListData } from "../util";
export const selectItamDevice = dataSource({
  display: {
    label: "Select Device (ITAM)",
    description: "Select a device from a list of devices.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, { debug: false });
    const { data } = await getItamListData<ItamDevice, "devices">(
      client,
      "devices",
      "devices",
      { fetchAll: true, params: {} },
    );
    const objects = (data.devices || []).map<Element>(
      ({ name, serial_no, device_id }) => ({
        key: util.types.toString(device_id),
        label: serial_no ? `${name} (${serial_no})` : name,
      }),
    );
    return { result: objects };
  },
});
