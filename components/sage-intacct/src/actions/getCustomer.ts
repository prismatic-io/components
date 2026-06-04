import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getCustomerPayload } from "../examplePayloads/getCustomerPayload";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve a single customer.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getCustomer = new Functions.Common.Read();
    getCustomer.objectName = "CUSTOMER";
    getCustomer.fields = fieldsInput;
    getCustomer.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getCustomer);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput: { ...recordNoInput, dataSource: "selectCustomer" },
  },
  examplePayload: getCustomerPayload,
});
