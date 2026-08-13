import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectDeviceCompliancePolicySettingStateSummaryExamplePayload as selectCompliancePolicySettingStateSummaryPayload } from "../examplePayloads";
import { selectDeviceCompliancePolicySettingStateSummaryInputs } from "../inputs";
import type { SelectableSettingStateSummary } from "../types";
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
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectCompliancePolicySettingStateSummaryPayload,
});
