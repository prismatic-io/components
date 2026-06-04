import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";

export const selectDeviceCompliancePolicy = dataSource({
  display: {
    label: "Select Device Compliance Policy",
    description:
      "Select a device compliance policy from the list of compliance policies.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get("/deviceManagement/deviceCompliancePolicies");

    const result = (value as { id: string; displayName: string }[])
      .map<Element>((policy) => ({
        label: policy.displayName,
        key: policy.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Display Name value",
        key: "4214b716-b716-4214-16b7-144216b71442",
      },
    ],
  },
});
