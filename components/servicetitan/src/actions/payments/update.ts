import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createPaymentResponse as updatePaymentResponse } from "../../examplePayloads";
import {
  authCode,
  checkNumber,
  connection,
  exportId,
  memo,
  paidOn,
  paymentId,
  splits,
  status,
  typeId,
} from "../../inputs";

export const updatePayment = action({
  display: {
    label: "Update Payment",
    description: "Update a specified payment",
  },
  inputs: {
    connection,
    paymentId,
    typeId,
    splits,
    memo,
    paidOn,
    authCode,
    checkNumber,
    exportId,
    status,
  },
  perform: async (
    context,
    {
      connection,
      authCode,
      checkNumber,
      exportId,
      memo,
      paidOn,
      splits,
      status,
      typeId,
      paymentId,
    },
  ) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.patch(`/payments/${paymentId}`, {
      authCode: authCode || undefined,
      checkNumber: checkNumber || undefined,
      exportId: exportId || undefined,
      memo: memo || undefined,
      paidOn: paidOn || undefined,
      splits: splits || undefined,
      status: status || undefined,
      typeId: typeId || undefined,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updatePaymentResponse,
  },
});
