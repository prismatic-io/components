import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postPaymentExamplePayload } from "../../examplePayloads";
import { postPaymentInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const postPayment = action({
  display: {
    label: "Create Payment",
    description:
      "Creates a single customer invoice payment header instance with the specified data.",
  },
  perform: async (
    context,
    {
      connection,
      remitFromCustomerId,
      readyToAutoApply,
      reference,
      transactionNumber,
      amount,
      typeId,
      date,
      companyId,
      memo,
      paymentDescriptor,
      paymentId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      memo,
      remitFromCustomer: getIdObject(remitFromCustomerId),
      readyToAutoApply,
      reference,
      transactionNumber,
      amount,
      type: getIdObject(typeId),
      date,
      company: getIdObject(companyId),
      descriptor: paymentDescriptor,
      id: paymentId,
    };
    const { data } = await client.post(
      `${SERVICES.customerAccounts}/payments`,
      body,
    );
    return {
      data,
    };
  },
  inputs: postPaymentInputs,
  examplePayload: postPaymentExamplePayload,
});
