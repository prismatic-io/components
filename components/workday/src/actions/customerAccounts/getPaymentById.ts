import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getPaymentByIdExamplePayload } from "../../examplePayloads";
import { getPaymentByIdInputs } from "../../inputs";
import { getPaymentByIdOutputSchema } from "../../outputSchemas";

export const getPaymentById = action({
  display: {
    label: "Get Payment by ID",
    description: "Retrieves a customer invoice payment with the specified ID.",
  },
  performSafety: "safe",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPaymentByIdOutputSchema,
  }),
  examplePayload: getPaymentByIdExamplePayload,
});
