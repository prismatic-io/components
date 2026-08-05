import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateInvoiceItemsExamplePayload } from "../../examplePayloads";
import { updateInvoiceItemsInputs } from "../../inputs";
export const updateInvoiceItems = action({
  display: {
    label: "Update Invoice Items",
    description: "Update invoice items",
  },
  inputs: updateInvoiceItemsInputs,
  perform: async (
    context,
    {
      connection,
      invoiceId,
      description,
      quantity,
      skuId,
      skuName,
      technicianId,
      additionalFields,
      itemGroupRootId,
      inventoryLocationId,
      durationBillingId,
      id,
    },
  ) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.patch(`/invoices/${invoiceId}/items`, {
      invoiceId,
      description,
      quantity,
      skuId,
      skuName,
      technicianId,
      unitPrice: additionalFields.unitPrice,
      cost: additionalFields.cost,
      isAddOn: additionalFields.isAddOn,
      signature: additionalFields.signature,
      technicianAcknowledgementSignature:
        additionalFields.technicianAcknowledgementSignature,
      installedOn: additionalFields.installedOn,
      inventoryWarehouseName: additionalFields.inventoryWarehouseName,
      skipUpdatingMembershipPrices:
        additionalFields.skipUpdatingMembershipPrices,
      itemGroupName: additionalFields.itemGroupName,
      itemGroupRootId,
      inventoryLocationId,
      durationBillingId,
      id,
    });
    return {
      data,
    };
  },
  examplePayload: updateInvoiceItemsExamplePayload,
});
