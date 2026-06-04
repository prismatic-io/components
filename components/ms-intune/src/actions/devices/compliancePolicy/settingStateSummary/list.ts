import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../../client";
import { connection } from "../../../../inputs/general";
import { listDeviceCompliancePolicySettingStateSummariesExamplePayload } from "../../../../examplePayloads";

export const listDeviceCompliancePolicySettingStateSummaries = action({
  display: {
    label: "List Device Compliance Policy Setting State Summaries",
    description:
      "Retrieve a list of device compliance policy setting state summaries.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      "/deviceManagement/deviceCompliancePolicySettingStateSummaries",
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
  },
  examplePayload: {
    data: listDeviceCompliancePolicySettingStateSummariesExamplePayload,
  },
});
