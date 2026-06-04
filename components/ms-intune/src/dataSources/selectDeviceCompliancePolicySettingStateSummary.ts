import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";

export const selectDeviceCompliancePolicySettingStateSummary = dataSource({
  display: {
    label: "Select Compliance Policy Setting Summary",
    description:
      "Select a device compliance policy setting state summary from the list of summaries.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get(
      "/deviceManagement/deviceCompliancePolicySettingStateSummaries",
    );

    const result = (value as { id: string; settingName: string }[])
      .map<Element>((summary) => ({
        label: summary.settingName,
        key: summary.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Setting Name value",
        key: "7474d6d5-d6d5-7474-d5d6-7474d5d67474",
      },
    ],
  },
});
