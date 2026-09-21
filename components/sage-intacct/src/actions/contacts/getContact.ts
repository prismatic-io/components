import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getContactExamplePayload } from "../../examplePayloads";
import { OBJECT_CONTACT } from "../../constants";
import { getContactInputs } from "../../inputs";
import { getContactOutputSchema } from "../../outputSchemas";
export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Retrieves a single contact.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getContact = new Functions.Common.Read();
    getContact.objectName = OBJECT_CONTACT;
    getContact.fields = fieldsInput;
    getContact.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getContact);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getContactInputs,
  examplePayload: getContactExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getContactOutputSchema,
  }),
  examplePerform: async () => ({ data: getContactExamplePayload.data }),
});
