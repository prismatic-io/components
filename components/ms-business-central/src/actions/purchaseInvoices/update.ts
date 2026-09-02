import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { updatePurchaseInvoiceExamplePayload } from "../../examplePayloads";
import { updatePurchaseInvoiceInputs } from "../../inputs/purchaseInvoices";
import type { PurchaseInvoice } from "../../interfaces";
export const updatePurchaseInvoice = action({
  display: {
    label: "Update Purchase Invoice",
    description:
      "Update a purchase invoice object in your Business Central organization.",
  },
  inputs: updatePurchaseInvoiceInputs,
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
      buyFromAddress,
      currencyId,
      currencyCode,
      pricesIncludeTax,
      discountAmount,
      purchaseInvoiceId,
      companyId,
      connection,
    },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const { data } = await client.patch<PurchaseInvoice>(
      `/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})`,
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
        buyFromAddressLine1: buyFromAddress.buyFromAddressLine1,
        buyFromAddressLine2: buyFromAddress.buyFromAddressLine2,
        buyFromCity: buyFromAddress.buyFromCity,
        buyFromState: buyFromAddress.buyFromState,
        buyFromCountry: buyFromAddress.buyFromCountry,
        buyFromPostCode: buyFromAddress.buyFromPostCode,
        currencyId,
        currencyCode,
        pricesIncludeTax,
        discountAmount,
      },
      {
        headers: {
          "If-Match": "*",
        },
      },
    );
    return { data };
  },
  examplePayload: updatePurchaseInvoiceExamplePayload,
});
