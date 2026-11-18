import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDeviceCompliancePoliciesExamplePayload } from "../../examplePayloads";
import { listDeviceCompliancePoliciesInputs } from "../../inputs";
import { listDeviceCompliancePoliciesOutputSchema } from "../../outputSchemas";

export const listDeviceCompliancePolicies = action({
  display: {
    label: "List Device Compliance Policies",
    description: "List all device compliance policies.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDeviceCompliancePoliciesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.DEVICE_COMPLIANCE_POLICIES);

    return {
      data,
    };
  },
  examplePerform: async () => listDeviceCompliancePoliciesExamplePayload,
  inputs: listDeviceCompliancePoliciesInputs,
  examplePayload: listDeviceCompliancePoliciesExamplePayload,
});
