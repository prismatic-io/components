import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getVendorPayload } from "../examplePayloads/getVendorPayload";

export const getVendor = action({
  display: {
    label: "Get Vendor",
    description: "Retrieve a single vendor.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getContact = new Functions.Common.Read();
    getContact.objectName = "VENDOR";
    getContact.fields = fieldsInput;
    getContact.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getContact);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput: { ...recordNoInput, dataSource: "selectVendor" },
  },
  examplePayload: getVendorPayload,
});
