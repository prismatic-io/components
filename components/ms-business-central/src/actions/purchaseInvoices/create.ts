import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createPurchaseInvoiceExamplePayload } from "../../examplePayloads";
import { createPurchaseInvoiceInputs } from "../../inputs/purchaseInvoices";
import type { PurchaseInvoice } from "../../interfaces";

export const createPurchaseInvoice = action({
  display: {
    label: "Create Purchase Invoice",
    description: "Creates a purchase invoice object in Microsoft Business Central.",
  },
  inputs: createPurchaseInvoiceInputs,
  perform: async (
    context,
    {
      vendorId,
      vendorNumber,
      invoiceDate,
      postingDate,
      dueDate,
      vendorInvoiceNumber,
      payToVendorId,
      payToVendorNumber,
      shipToName,
      shipToContact,
      buyFromAddressLine1,
      buyFromAddressLine2,
      buyFromCity,
      buyFromState,
      buyFromCountry,
      buyFromPostCode,
      currencyId,
      currencyCode,
      pricesIncludeTax,
      discountAmount,
      connection,
      companyId,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      vendorId,
      vendorNumber,
      invoiceDate,
      postingDate,
      dueDate,
      vendorInvoiceNumber,
      payToVendorId,
      payToVendorNumber,
      shipToName,
      shipToContact,
      buyFromAddressLine1,
      buyFromAddressLine2,
      buyFromCity,
      buyFromState,
      buyFromCountry,
      buyFromPostCode,
      currencyId,
      currencyCode,
      pricesIncludeTax,
      discountAmount,
    };
    const { data } = await client.post<PurchaseInvoice>(
      `/companies(${companyId})/purchaseInvoices`,
      payload,
    );

    return {
      data,
    };
  },
  examplePayload: createPurchaseInvoiceExamplePayload,
});
