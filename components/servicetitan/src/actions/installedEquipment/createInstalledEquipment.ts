import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createInstalledEquipmentExamplePayload } from "../../examplePayloads";
import { createInstalledEquipmentInputs } from "../../inputs";
import { createInstalledEquipmentOutputSchema } from "../../outputSchemas";
export const createInstalledEquipment = action({
  display: {
    label: "Create Installed Equipment",
    description: "Create a new installed equipment record.",
  },
  inputs: createInstalledEquipmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createInstalledEquipmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      attachments,
      cost,
      customFields,
      installedOn,
      locationId,
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
    const { data } = await client.post(`/installed-equipment`, {
      attachments,
      cost,
      customFields,
      installedOn,
      locationId,
      manufacturer,
      manufacturerWarrantyEnd: warrantyDates.manufacturerWarrantyEnd,
      manufacturerWarrantyStart: warrantyDates.manufacturerWarrantyStart,
      memo,
      model,
      name,
      serialNumber,
      serviceProviderWarrantyEnd: warrantyDates.serviceProviderWarrantyEnd,
      serviceProviderWarrantyStart: warrantyDates.serviceProviderWarrantyStart,
      tagTypeIds,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createInstalledEquipmentExamplePayload,
  examplePayload: createInstalledEquipmentExamplePayload,
});
