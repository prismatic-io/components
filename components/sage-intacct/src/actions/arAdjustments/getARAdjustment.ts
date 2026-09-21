import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getARAdjustmentExamplePayload } from "../../examplePayloads";
import { OBJECT_AR_ADJUSTMENT } from "../../constants";
import { getARAdjustmentInputs } from "../../inputs";
import { getARAdjustmentOutputSchema } from "../../outputSchemas";
export const getARAdjustment = action({
  display: {
    label: "Get AR Adjustment",
    description: "Retrieves a single AR Adjustment.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArAdjustment = new Functions.Common.Read();
    getArAdjustment.objectName = OBJECT_AR_ADJUSTMENT;
    getArAdjustment.fields = fieldsInput;
    getArAdjustment.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArAdjustment);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getARAdjustmentInputs,
  examplePayload: getARAdjustmentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getARAdjustmentOutputSchema,
  }),
  examplePerform: async () => ({ data: getARAdjustmentExamplePayload.data }),
});
