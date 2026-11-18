import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectDeviceCompliancePolicyExamplePayload } from "../examplePayloads";
import { selectDeviceCompliancePolicyInputs } from "../inputs";
import type { SelectableResource } from "../types";
import { compareElementsByLabel } from "../util";

export const selectDeviceCompliancePolicy = dataSource({
  display: {
    label: "Select Device Compliance Policy",
    description:
      "Select a device compliance policy from the list of compliance policies.",
  },
  inputs: selectDeviceCompliancePolicyInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { value },
    } = await client.get(ENDPOINTS.DEVICE_COMPLIANCE_POLICIES);

    const result = (value as SelectableResource[])
      .map<Element>((policy) => ({
        label: policy.displayName,
        key: policy.id.toString(),
      }))
      .sort(compareElementsByLabel);

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectDeviceCompliancePolicyExamplePayload,
});
