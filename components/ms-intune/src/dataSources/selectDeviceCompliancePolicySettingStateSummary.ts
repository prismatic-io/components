import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectDeviceCompliancePolicySettingStateSummaryExamplePayload } from "../examplePayloads";
import { selectDeviceCompliancePolicySettingStateSummaryInputs } from "../inputs";
import type { SelectableSettingStateSummary } from "../types";
import { compareElementsByLabel } from "../util";

export const selectDeviceCompliancePolicySettingStateSummary = dataSource({
  display: {
    label: "Select Compliance Policy Setting Summary",
    description:
      "Select a device compliance policy setting state summary from the list of summaries.",
  },
  inputs: selectDeviceCompliancePolicySettingStateSummaryInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get(
      ENDPOINTS.DEVICE_COMPLIANCE_POLICY_SETTING_STATE_SUMMARIES,
    );

    const result = (value as SelectableSettingStateSummary[])
      .map<Element>((summary) => ({
        label: summary.settingName,
        key: summary.id.toString(),
      }))
      .sort(compareElementsByLabel);

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectDeviceCompliancePolicySettingStateSummaryExamplePayload,
});
