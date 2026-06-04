import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";

export const selectDeviceConfiguration = dataSource({
  display: {
    label: "Select Device Configuration",
    description:
      "Select a device configuration from the list of device configurations.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get("/deviceManagement/deviceConfigurations");

    const result = (value as { id: string; displayName: string }[])
      .map<Element>((config) => ({
        label: config.displayName,
        key: config.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Display Name value",
        key: "34977265-7265-3497-6572-973465729734",
      },
    ],
  },
});
