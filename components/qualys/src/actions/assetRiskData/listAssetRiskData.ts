import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { listAssetRiskDataExamplePayload } from "../../examplePayloads";
import { listAssetRiskDataInputs } from "../../inputs";
import { listAssetRiskDataOutputSchema } from "../../outputSchemas";
import { fetchClassicHostRiskData } from "../../util";
export const listAssetRiskData = action({
  display: {
    label: "List Asset Risk Data",
    description:
      "Retrieve TruRisk scores, vulnerability counts, and derived risk bands from the Classic VM host list API. This is the only source for TruRisk data — the modern Gateway asset API does not return vulnerability information. Returns the VM (Classic) TruRisk score, not the CSAM figure.",
  },
  inputs: listAssetRiskDataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssetRiskDataOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pageSize }) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const data = await fetchClassicHostRiskData({
      client,
      fetchAll,
      pageSize,
    });
    return { data };
  },
  examplePayload: listAssetRiskDataExamplePayload,
});
