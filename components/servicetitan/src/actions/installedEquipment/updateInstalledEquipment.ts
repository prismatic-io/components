import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getInstalledEquipmentExamplePayload as updateInstalledEquipmentExamplePayload } from "../../examplePayloads";
import { updateInstalledEquipmentInputs } from "../../inputs";
export const updateInstalledEquipment = action({
  display: {
    label: "Update Installed Equipment",
    description: "Update installed equipment by ID",
  },
  inputs: updateInstalledEquipmentInputs,
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
  examplePayload: updateInstalledEquipmentExamplePayload,
});
