import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { OBJECT_CUSTOMER } from "../../constants";
import { getCustomerInputs } from "../../inputs";
import { getCustomerOutputSchema } from "../../outputSchemas";
export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieves a single customer.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getCustomer = new Functions.Common.Read();
    getCustomer.objectName = OBJECT_CUSTOMER;
    getCustomer.fields = fieldsInput;
    getCustomer.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getCustomer);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getCustomerInputs,
  examplePayload: getCustomerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCustomerOutputSchema,
  }),
  examplePerform: async () => ({ data: getCustomerExamplePayload.data }),
});
