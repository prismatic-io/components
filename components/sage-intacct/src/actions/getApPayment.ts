import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getApPaymentPayload } from "../examplePayloads/getApPaymentPayload";

export const getApPayment = action({
  display: {
    label: "Get AP Payment",
    description: "Retrieve a single AP Payment.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getApPayment = new Functions.Common.Read();
    getApPayment.objectName = "APPYMT";
    getApPayment.fields = fieldsInput;
    getApPayment.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getApPayment);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput,
  },
  examplePayload: getApPaymentPayload,
});
