import { action, util } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import {
  accountId,
  accountName,
  applyTaxAfterDiscount,
  connectionInput,
  createTime,
  customerId,
  customerName,
  customFields,
  lineItems,
  paymentMethodId,
  paymentMethodName,
} from "../../inputs";







export const createReceipt = action({
  display: {
    label: "Create Sales Receipt",
    description: "Create a new Sales Receipt in QuickBooks.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const body = {
      PaymentMethodRef: {
        name: params?.paymentMethodName,
        value: params?.paymentMethodId,
      },

      CustomerRef: {
        name: params?.customerName,
        value: params?.customerId,
      },
      DepositToAccountRef: {
        name: params?.accountName,
        value: params?.accountId,
      },
      Line: params.lineItems,
      ApplyTaxAfterDiscount: util.types.toBool(params?.applyTaxAfterDiscount),
      CustomField: params.customFields,
      MetaData: {
        CreateTime: util.types.toString(params?.createTime) || new Date(),
      },
    };
    const { data } = await client.post("/salesreceipt", body, {
      headers: { "Content-Type": "application/json" },
    });
    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    lineItems,
    customFields,
    applyTaxAfterDiscount,
    createTime,
    customerId,
    customerName,
    accountName,
    accountId,
    paymentMethodId,
    paymentMethodName,
  },
});
