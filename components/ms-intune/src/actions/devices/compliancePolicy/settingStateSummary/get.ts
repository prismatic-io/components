import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { connection } from "../../../../inputs/general";
import { getDeviceCompliancePolicySettingStateSummaryExamplePayload } from "../../../../examplePayloads";
import { deviceCompliancePolicySettingStateSummaryId } from "../../../../inputs/devices/policyCompliance/settingStateSummary/general";

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
      `/deviceManagement/deviceCompliancePolicySettingStateSummaries/${deviceCompliancePolicySettingStateSummaryId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    deviceCompliancePolicySettingStateSummaryId,
  },
  examplePayload: {
    data: getDeviceCompliancePolicySettingStateSummaryExamplePayload,
  },
});
