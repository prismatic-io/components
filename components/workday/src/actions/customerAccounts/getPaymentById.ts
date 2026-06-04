import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getPaymentByIdExamplePayload } from "../../examplePayloads";
import { getPaymentByIdInputs } from "../../inputs";

export const getPaymentById = action({
  display: {
    label: "Get Payment by ID",
    description: "Retrieves a customer invoice payment with the specified ID.",
  },
  perform: async (context, { connection, paymentId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.customerAccounts}/payments/${paymentId}`,
    );
    return {
      data,
    };
  },
  inputs: getPaymentByIdInputs,
  examplePayload: getPaymentByIdExamplePayload,
});
