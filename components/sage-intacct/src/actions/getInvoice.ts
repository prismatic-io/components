import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getInvoicePayload } from "../examplePayloads/getInvoicePayload";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Retrieve a single invoice.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getInvoice = new Functions.Common.Read();
    getInvoice.objectName = "ARINVOICE";
    getInvoice.fields = fieldsInput;
    getInvoice.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getInvoice);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput: { ...recordNoInput, dataSource: "selectInvoice" },
  },
  examplePayload: getInvoicePayload,
});
