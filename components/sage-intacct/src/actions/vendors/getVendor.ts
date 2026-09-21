import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getVendorExamplePayload } from "../../examplePayloads";
import { OBJECT_VENDOR } from "../../constants";
import { getVendorInputs } from "../../inputs";
import { getVendorOutputSchema } from "../../outputSchemas";
export const getVendor = action({
  display: {
    label: "Get Vendor",
    description: "Retrieves a single vendor.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getContact = new Functions.Common.Read();
    getContact.objectName = OBJECT_VENDOR;
    getContact.fields = fieldsInput;
    getContact.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getContact);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getVendorInputs,
  examplePayload: getVendorExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getVendorOutputSchema,
  }),
  examplePerform: async () => ({ data: getVendorExamplePayload.data }),
});
