import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, ODATA_TYPES } from "../../constants";
import { assignDeviceCompliancePolicyExamplePayload } from "../../examplePayloads";
import { assignDeviceCompliancePolicyInputs } from "../../inputs";
import { assignDeviceCompliancePolicyOutputSchema } from "../../outputSchemas";

export const assignDeviceCompliancePolicy = action({
  display: {
    label: "Assign Device Compliance Policy",
    description: "Assign a device compliance policy by ID.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assignDeviceCompliancePolicyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, deviceCompliancePolicyId, assignId, collectionId, target },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const assignment = {
      "@odata.type": ODATA_TYPES.COMPLIANCE_POLICY_ASSIGNMENT,
      id: assignId,
      target: {
        "@odata.type": target,
        collectionId,
      },
    };
    const { data } = await client.post(
      `${ENDPOINTS.DEVICE_COMPLIANCE_POLICIES}/${deviceCompliancePolicyId}/assign`,
      {
        assignments: [assignment],
      },
    );

    return {
      data,
    };
  },
  examplePerform: async () => assignDeviceCompliancePolicyExamplePayload,
  inputs: assignDeviceCompliancePolicyInputs,
  examplePayload: assignDeviceCompliancePolicyExamplePayload,
});
