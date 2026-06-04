import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { getDeviceCompliancePolicyExamplePayload } from "../../../examplePayloads";
import { deviceCompliancePolicyId } from "../../../inputs/devices/policyCompliance/general";

export const getDeviceCompliancePolicy = action({
  display: {
    label: "Get Device Compliance Policy",
    description: "Get a device compliance policy by ID.",
  },
  perform: async (context, { connection, deviceCompliancePolicyId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/deviceManagement/deviceCompliancePolicies/${deviceCompliancePolicyId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    deviceCompliancePolicyId,
  },
  examplePayload: getDeviceCompliancePolicyExamplePayload,
});
