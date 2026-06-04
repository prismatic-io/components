import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getARAdjustmentLinePayload } from "../examplePayloads/getARAdjustmentLinePayload";

export const getARAdjustmentLine = action({
  display: {
    label: "Get AR Adjustment Line",
    description: "Retrieve a single AR Adjustment Line.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArAdjustmentLine = new Functions.Common.Read();
    getArAdjustmentLine.objectName = "ARADJUSTMENTITEM";
    getArAdjustmentLine.fields = fieldsInput;
    getArAdjustmentLine.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArAdjustmentLine);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput,
  },
  examplePayload: getARAdjustmentLinePayload,
});
