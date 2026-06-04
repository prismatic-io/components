import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createPaymentResponse } from "../../examplePayloads";
import {
  authCode,
  checkNumber,
  connection,
  exportId,
  memo,
  paidOn,
  splits,
  status,
  typeId,
} from "../../inputs";

export const createPayment = action({
  display: {
    label: "Create Payment",
    description: "Create a payment in Service Titan",
  },
  inputs: {
    connection,
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
      authCode,
      checkNumber,
      connection,
      exportId,
      memo,
      paidOn,
      splits,
      status,
      typeId,
    },
  ) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.post(`/payments`, {
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
    data: createPaymentResponse,
  },
});
