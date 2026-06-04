import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import {
  accountId,
  accountName,
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
} from "../../inputs";

export const createRefundReceipt = action({
  display: {
    label: "Create Refund Receipt",
    description: "Create a new Refund Receipt in QuickBooks.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const body = {
      ...(params.fieldValues || undefined),
      DepositToAccountRef: {
        name: params.accountName,
        value: params.accountId,
      },
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
    lineItems: {
      ...lineItems,
      default: `[{
        "DetailType": "SalesItemLineDetail",
        "Amount": 400.0,
        "SalesItemLineDetail": {
          "ItemRef": {
            "value": "21"
          }
        }
      }]`,
    },
    customFields,
    fieldValues,
    accountName,
    accountId,
    line4,
    line3,
    line2,
    line1,
    billingAddressId,
    lat,
    long,
  },
});
