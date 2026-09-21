import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getBillExamplePayload } from "../../examplePayloads";
import { OBJECT_AP_BILL } from "../../constants";
import { getBillInputs } from "../../inputs";
import { getBillOutputSchema } from "../../outputSchemas";
export const getBill = action({
  display: {
    label: "Get Bill",
    description: "Retrieves a single bill.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getBill = new Functions.Common.Read();
    getBill.objectName = OBJECT_AP_BILL;
    getBill.fields = fieldsInput;
    getBill.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getBill);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getBillInputs,
  examplePayload: getBillExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBillOutputSchema,
  }),
  examplePerform: async () => ({ data: getBillExamplePayload.data }),
});
