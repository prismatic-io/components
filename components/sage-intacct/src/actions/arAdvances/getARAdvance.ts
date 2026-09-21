import { action, outputSchema, util } from "@prismatic-io/spectral";
import { convertResultToGenericObject, executeAction } from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getARAdvanceExamplePayload } from "../../examplePayloads";
import { OBJECT_AR_ADVANCE } from "../../constants";
import { getARAdvanceInputs } from "../../inputs";
import { getARAdvanceOutputSchema } from "../../outputSchemas";
export const getARAdvance = action({
  display: {
    label: "Get AR Advance",
    description: "Retrieves a single AR Advance.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getArAdvance = new Functions.Common.Read();
    getArAdvance.objectName = OBJECT_AR_ADVANCE;
    getArAdvance.fields = fieldsInput;
    getArAdvance.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getArAdvance);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: getARAdvanceInputs,
  examplePayload: getARAdvanceExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getARAdvanceOutputSchema,
  }),
  examplePerform: async () => ({ data: getARAdvanceExamplePayload.data }),
});
