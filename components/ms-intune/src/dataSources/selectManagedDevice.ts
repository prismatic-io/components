import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createClient } from "../client";
import { selectManagedDeviceExamplePayload } from "../examplePayloads";

export const selectManagedDevice = dataSource({
  display: {
    label: "Select Managed Device",
    description: "Select a managed device from the list of managed devices",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get("/deviceManagement/managedDevices");

    return value.map((managedDevice: { id: string; deviceName: string }) => {
      return {
        label: managedDevice.deviceName,
        key: managedDevice.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: { result: selectManagedDeviceExamplePayload },
});
