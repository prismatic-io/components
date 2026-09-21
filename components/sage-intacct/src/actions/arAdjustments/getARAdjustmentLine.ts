import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getARAdjustmentLineExamplePayload } from "../../examplePayloads";
import { OBJECT_AR_ADJUSTMENT_ITEM } from "../../constants";
import { getARAdjustmentLineInputs } from "../../inputs";
import { getARAdjustmentLineOutputSchema } from "../../outputSchemas";
export const getARAdjustmentLine = action({
  display: {
    label: "Get AR Adjustment Line",
    description: "Retrieves a single AR Adjustment Line.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArAdjustmentLine = new Functions.Common.Read();
    getArAdjustmentLine.objectName = OBJECT_AR_ADJUSTMENT_ITEM;
    getArAdjustmentLine.fields = fieldsInput;
    getArAdjustmentLine.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArAdjustmentLine);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getARAdjustmentLineInputs,
  examplePayload: getARAdjustmentLineExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getARAdjustmentLineOutputSchema,
  }),
  examplePerform: async () => ({
    data: getARAdjustmentLineExamplePayload.data,
  }),
});
