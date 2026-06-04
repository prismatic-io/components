import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import {
  billingAddressId,
  connectionInput,
  customFields,
  fieldValues,
  lat,
  line1,
  line2,
  line3,
  line4,
  lineItems,
  long,
  receiptId,
  syncToken,
  totalAmount,
} from "../../inputs";

export const updateRefundReceipt = action({
  display: {
    label: "Update Refund Receipt",
    description:
      "Update the contents of an existing Refund Receipt in QuickBooks.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const body = {
      ...(params.fieldValues || undefined),
      SyncToken: "0",
      TotalAmt: params.totalAmount,
      sparse: true,
      CustomField: params.customFields || params.lineItems,
      BillAddr: {
        Line4: params.line4,
        Line3: params.line3,
        Line2: params.line2,
        Line1: params.line1,
        Long: params.long,
        Lat: params.lat,
        Id: params.billingAddressId,
      },
      Id: params.receiptId,
      Line: params.lineItems,
    };
    const { data } = await client.post("/refundreceipt", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    syncToken,
    totalAmount,
    receiptId,
    lineItems: {
      ...lineItems,
      default: `[
        {
          Description: "Refund - Pest control was ineffective",
          DetailType: "SalesItemLineDetail",
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: "NON",
            },
            Qty: 2.5,
            UnitPrice: 35,
            ItemRef: {
              name: "Pest Control",
              value: "10",
            },
          },
          LineNum: 1,
          Amount: 87.5,
          Id: "1",
        },
        {
          DetailType: "SubTotalLineDetail",
          Amount: 87.5,
          SubTotalLineDetail: {},
        },
      ]`,
    },
    line4,
    line3,
    line2,
    line1,
    billingAddressId,
    lat,
    long,
    fieldValues,
    customFields,
  },
});
