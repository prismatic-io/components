import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getInstalledEquipmentResponse as updateInstalledEquipmentResponse } from "../../examplePayloads";
import {
  attachments,
  connection,
  customFields,
  installedEquipmentCost,
  installedEquipmentId,
  installedOn,
  manufacturer,
  manufacturerWarrantyEnd,
  manufacturerWarrantyStart,
  memo,
  model,
  name,
  serialNumber,
  serviceProviderWarrantyEnd,
  serviceProviderWarrantyStart,
  tagTypeIds,
} from "../../inputs";

export const updateInstalledEquipment = action({
  display: {
    label: "Update Installed Equipment",
    description: "Update installed equipment by ID",
  },
  inputs: {
    connection,
    installedEquipmentId,
    name: {
      ...name,
      required: false,
      comments: "The name of the installed equipment",
    },
    installedOn: {
      ...installedOn,
      required: false,
      comments: "The date the equipment was installed",
    },
    serialNumber,
    memo: {
      ...memo,
      required: false,
      comments: "The memo of the installed equipment",
    },
    manufacturer,
    model,
    cost: installedEquipmentCost,
    manufacturerWarrantyStart,
    manufacturerWarrantyEnd,
    serviceProviderWarrantyStart,
    serviceProviderWarrantyEnd,
    customFields: {
      ...customFields,
      required: false,
      comments: "The custom fields of the installed equipment",
    },
    attachments,
    tagTypeIds,
  },
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
      manufacturerWarrantyEnd,
      manufacturerWarrantyStart,
      memo,
      model,
      name,
      serialNumber,
      serviceProviderWarrantyEnd,
      serviceProviderWarrantyStart,
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
        manufacturerWarrantyEnd,
        manufacturerWarrantyStart,
        memo,
        model,
        name,
        serialNumber,
        serviceProviderWarrantyEnd,
        serviceProviderWarrantyStart,
        tagTypeIds,
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: updateInstalledEquipmentResponse,
  },
});
