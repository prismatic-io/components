import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getARAdjustmentPayload } from "../examplePayloads/getARAdjustmentPayload";

export const getARAdjustment = action({
  display: {
    label: "Get AR Adjustment",
    description: "Retrieve a single AR Adjustment.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArAdjustment = new Functions.Common.Read();
    getArAdjustment.objectName = "ARADJUSTMENT";
    getArAdjustment.fields = fieldsInput;
    getArAdjustment.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArAdjustment);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput,
  },
  examplePayload: getARAdjustmentPayload,
});
