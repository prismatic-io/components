import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getArPaymentExamplePayload } from "../../examplePayloads";
import { OBJECT_AR_PAYMENT } from "../../constants";
import { getArPaymentInputs } from "../../inputs";
import { getArPaymentOutputSchema } from "../../outputSchemas";
export const getArPayment = action({
  display: {
    label: "Get AR Payment",
    description: "Retrieves a single AR Payment.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArPayment = new Functions.Common.Read();
    getArPayment.objectName = OBJECT_AR_PAYMENT;
    getArPayment.fields = fieldsInput;
    getArPayment.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArPayment);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getArPaymentInputs,
  examplePayload: getArPaymentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getArPaymentOutputSchema,
  }),
  examplePerform: async () => ({ data: getArPaymentExamplePayload.data }),
});
