import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { listDeviceCompliancePoliciesExamplePayload } from "../../../examplePayloads";

export const listDeviceCompliancePolicies = action({
  display: {
    label: "List Device Compliance Policies",
    description: "List all device compliance policies.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      "/deviceManagement/deviceCompliancePolicies",
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
  },
  examplePayload: listDeviceCompliancePoliciesExamplePayload,
});
