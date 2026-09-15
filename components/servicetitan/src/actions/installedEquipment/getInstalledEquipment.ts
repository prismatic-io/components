import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getInstalledEquipmentExamplePayload } from "../../examplePayloads";
import { getInstalledEquipmentInputs } from "../../inputs";
import { getInstalledEquipmentOutputSchema } from "../../outputSchemas";
export const getInstalledEquipment = action({
  display: {
    label: "Get Installed Equipment",
    description: "Retrieve an installed equipment record by ID.",
  },
  inputs: getInstalledEquipmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getInstalledEquipmentOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, installedEquipmentId }) => {
    const client = createClient(
      connection,
      "equipmentsystems",
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/installed-equipment/${installedEquipmentId}`,
    );
    return {
      data,
    };
  },
  examplePayload: getInstalledEquipmentExamplePayload,
});
