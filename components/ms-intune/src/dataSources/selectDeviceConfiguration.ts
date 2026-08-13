import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectDeviceConfigurationExamplePayload } from "../examplePayloads";
import { selectDeviceConfigurationInputs } from "../inputs";
import type { SelectableResource } from "../types";
export const selectDeviceConfiguration = dataSource({
  display: {
    label: "Select Device Configuration",
    description:
      "Select a device configuration from the list of device configurations.",
  },
  inputs: selectDeviceConfigurationInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get(ENDPOINTS.DEVICE_CONFIGURATIONS);
    const result = (value as SelectableResource[])
      .map<Element>((config) => ({
        label: config.displayName,
        key: config.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectDeviceConfigurationExamplePayload,
});
