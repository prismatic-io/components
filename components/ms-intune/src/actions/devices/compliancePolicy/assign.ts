import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { assignDeviceCompliancePolicyExamplePayload } from "../../../examplePayloads";
import { assignDeviceCompliancePolicyInputs } from "../../../inputs/devices/policyCompliance/assign";

export const assignDeviceCompliancePolicy = action({
  display: {
    label: "Assign Device Compliance Policy",
    description: "Assign a device compliance policy by ID.",
  },
  perform: async (
    context,
    { connection, deviceCompliancePolicyId, assignId, collectionId, target },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const assignment = {
      "@odata.type": "#microsoft.graph.deviceCompliancePolicyAssignment",
      id: assignId,
      target: {
        "@odata.type": target,
        collectionId,
      },
    };
    const { data } = await client.post(
      `/deviceManagement/deviceCompliancePolicies/${deviceCompliancePolicyId}/assign`,
      {
        assignments: [assignment],
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...assignDeviceCompliancePolicyInputs,
  },
  examplePayload: assignDeviceCompliancePolicyExamplePayload,
});
