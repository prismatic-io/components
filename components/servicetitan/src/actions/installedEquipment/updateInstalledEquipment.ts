import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateInstalledEquipmentExamplePayload } from "../../examplePayloads";
import { updateInstalledEquipmentInputs } from "../../inputs";
import { updateInstalledEquipmentOutputSchema } from "../../outputSchemas";
export const updateInstalledEquipment = action({
  display: {
    label: "Update Installed Equipment",
    description: "Update installed equipment by ID.",
  },
  inputs: updateInstalledEquipmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateInstalledEquipmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      installedEquipmentId,
      attachments,
      cost,
      customFields,
      installedOn,
      manufacturer,
      warrantyDates,
      memo,
      model,
      name,
      serialNumber,
      tagTypeIds,
    },
  ) => {
    const client = createClient(
      connection,
      "equipmentsystems",
      context.debug.enabled,
    );
    const { data } = await client.patch(
      `/installed-equipment/${installedEquipmentId}`,
      {
        attachments,
        cost,
        customFields,
        installedOn,
        manufacturer,
        manufacturerWarrantyEnd: warrantyDates.manufacturerWarrantyEnd,
        manufacturerWarrantyStart: warrantyDates.manufacturerWarrantyStart,
        memo,
        model,
        name,
        serialNumber,
        serviceProviderWarrantyEnd: warrantyDates.serviceProviderWarrantyEnd,
        serviceProviderWarrantyStart:
          warrantyDates.serviceProviderWarrantyStart,
        tagTypeIds,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => updateInstalledEquipmentExamplePayload,
  examplePayload: updateInstalledEquipmentExamplePayload,
});
