import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePaymentExamplePayload } from "../../examplePayloads";
import { updatePaymentInputs } from "../../inputs";
import { updatePaymentOutputSchema } from "../../outputSchemas";
export const updatePayment = action({
  display: {
    label: "Update Payment",
    description: "Update a specified payment.",
  },
  inputs: updatePaymentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePaymentOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => updatePaymentExamplePayload,
  examplePayload: updatePaymentExamplePayload,
});
