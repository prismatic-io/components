import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDeviceCompliancePoliciesExamplePayload } from "../../examplePayloads";
import { listDeviceCompliancePoliciesInputs } from "../../inputs";
export const listDeviceCompliancePolicies = action({
  display: {
    label: "List Device Compliance Policies",
    description: "List all device compliance policies.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.DEVICE_COMPLIANCE_POLICIES);
    return {
      data,
    };
  },
  inputs: listDeviceCompliancePoliciesInputs,
  examplePayload: listDeviceCompliancePoliciesExamplePayload,
});
