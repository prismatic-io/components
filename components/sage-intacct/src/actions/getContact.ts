import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getContactPayload } from "../examplePayloads/getContactPayload";

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Retrieve a single contact.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getContact = new Functions.Common.Read();
    getContact.objectName = "CONTACT";
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
    recordNoInput: { ...recordNoInput, dataSource: "selectContact" },
  },
  examplePayload: getContactPayload,
});
