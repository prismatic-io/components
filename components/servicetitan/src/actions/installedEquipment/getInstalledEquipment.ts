import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getInstalledEquipmentExamplePayload } from "../../examplePayloads";
import { getInstalledEquipmentInputs } from "../../inputs";
export const getInstalledEquipment = action({
  display: {
    label: "Get Installed Equipment",
    description: "Retrieve a Installed Equipment by ID",
  },
  inputs: getInstalledEquipmentInputs,
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
