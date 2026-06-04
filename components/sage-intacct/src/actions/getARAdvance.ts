import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getARAdvancePayload } from "../examplePayloads/getARAdvancePayload";

export const getARAdvance = action({
  display: {
    label: "Get AR Advance",
    description: "Retrieve a single AR Advance.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArAdvance = new Functions.Common.Read();
    getArAdvance.objectName = "ARADVANCE";
    getArAdvance.fields = fieldsInput;
    getArAdvance.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArAdvance);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput,
  },
  examplePayload: getARAdvancePayload,
});
