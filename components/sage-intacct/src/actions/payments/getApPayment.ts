import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getApPaymentExamplePayload } from "../../examplePayloads";
import { OBJECT_AP_PAYMENT } from "../../constants";
import { getApPaymentInputs } from "../../inputs";
import { getApPaymentOutputSchema } from "../../outputSchemas";
export const getApPayment = action({
  display: {
    label: "Get AP Payment",
    description: "Retrieves a single AP Payment.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getApPayment = new Functions.Common.Read();
    getApPayment.objectName = OBJECT_AP_PAYMENT;
    getApPayment.fields = fieldsInput;
    getApPayment.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getApPayment);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getApPaymentInputs,
  examplePayload: getApPaymentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getApPaymentOutputSchema,
  }),
  examplePerform: async () => ({ data: getApPaymentExamplePayload.data }),
});
