import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getArPaymentPayload } from "../examplePayloads/getArPaymentPayload";

export const getArPayment = action({
  display: {
    label: "Get AR Payment",
    description: "Retrieve a single AR Payment.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArPayment = new Functions.Common.Read();
    getArPayment.objectName = "ARPYMT";
    getArPayment.fields = fieldsInput;
    getArPayment.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArPayment);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput,
  },
  examplePayload: getArPaymentPayload,
});
