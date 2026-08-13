import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getDeviceCompliancePolicySettingStateSummaryExamplePayload } from "../../examplePayloads";
import { getDeviceCompliancePolicySettingStateSummaryInputs } from "../../inputs";
export const getDeviceCompliancePolicySettingStateSummary = action({
  display: {
    label: "Get Device Compliance Policy Setting State Summary",
    description:
      "Retrieve a device compliance policy setting state summary by its ID.",
  },
  perform: async (
    context,
    { connection, deviceCompliancePolicySettingStateSummaryId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.DEVICE_COMPLIANCE_POLICY_SETTING_STATE_SUMMARIES}/${deviceCompliancePolicySettingStateSummaryId}`,
    );
    return {
      data,
    };
  },
  inputs: getDeviceCompliancePolicySettingStateSummaryInputs,
  examplePayload: getDeviceCompliancePolicySettingStateSummaryExamplePayload,
});
