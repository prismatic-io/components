import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getInvoiceExamplePayload } from "../../examplePayloads";
import { OBJECT_AR_INVOICE } from "../../constants";
import { getInvoiceInputs } from "../../inputs";
import { getInvoiceOutputSchema } from "../../outputSchemas";
export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Retrieves a single invoice.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getInvoice = new Functions.Common.Read();
    getInvoice.objectName = OBJECT_AR_INVOICE;
    getInvoice.fields = fieldsInput;
    getInvoice.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getInvoice);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getInvoiceInputs,
  examplePayload: getInvoiceExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getInvoiceOutputSchema,
  }),
  examplePerform: async () => ({ data: getInvoiceExamplePayload.data }),
});
