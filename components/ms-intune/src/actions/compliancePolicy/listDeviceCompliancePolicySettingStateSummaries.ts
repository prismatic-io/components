import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDeviceCompliancePolicySettingStateSummariesExamplePayload } from "../../examplePayloads";
import { listDeviceCompliancePolicySettingStateSummariesInputs } from "../../inputs";
export const listDeviceCompliancePolicySettingStateSummaries = action({
  display: {
    label: "List Device Compliance Policy Setting State Summaries",
    description:
      "Retrieve a list of device compliance policy setting state summaries.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      ENDPOINTS.DEVICE_COMPLIANCE_POLICY_SETTING_STATE_SUMMARIES,
    );
    return {
      data,
    };
  },
  inputs: listDeviceCompliancePolicySettingStateSummariesInputs,
  examplePayload: listDeviceCompliancePolicySettingStateSummariesExamplePayload,
});
