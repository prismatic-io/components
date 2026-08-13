import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getDeviceCompliancePolicyExamplePayload } from "../../examplePayloads";
import { getDeviceCompliancePolicyInputs } from "../../inputs";
export const getDeviceCompliancePolicy = action({
  display: {
    label: "Get Device Compliance Policy",
    description: "Get a device compliance policy by ID.",
  },
  perform: async (context, { connection, deviceCompliancePolicyId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.DEVICE_COMPLIANCE_POLICIES}/${deviceCompliancePolicyId}`,
    );
    return {
      data,
    };
  },
  inputs: getDeviceCompliancePolicyInputs,
  examplePayload: getDeviceCompliancePolicyExamplePayload,
});
