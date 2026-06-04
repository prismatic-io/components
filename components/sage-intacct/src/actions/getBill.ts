import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import { convertResultToGenericObject, executeAction } from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getBillPayload } from "../examplePayloads/getBillPayload";

export const getBill = action({
  display: {
    label: "Get Bill",
    description: "Retrieve a single bill.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getBill = new Functions.Common.Read();
    getBill.objectName = "APBILL";
    getBill.fields = fieldsInput;
    getBill.keys = [util.types.toInt(recordNoInput)];
    const data = await executeAction(connection, getBill);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput,
  },
  examplePayload: getBillPayload,
});
