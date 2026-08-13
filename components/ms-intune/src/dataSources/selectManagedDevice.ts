import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectManagedDeviceExamplePayload } from "../examplePayloads";
import { selectManagedDeviceInputs } from "../inputs";
export const selectManagedDevice = dataSource({
  display: {
    label: "Select Managed Device",
    description: "Select a managed device from the list of managed devices.",
  },
  inputs: selectManagedDeviceInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get(ENDPOINTS.MANAGED_DEVICES);
    return value.map((managedDevice: { id: string; deviceName: string }) => {
      return {
        label: managedDevice.deviceName,
        key: managedDevice.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: selectManagedDeviceExamplePayload,
});
