import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { updateReportStatusExamplePayload } from "../../examplePayloads";
import { updateReportStatusInputs } from "../../inputs";
import { updateReportStatusOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const updateReportStatus = action({
  display: {
    description: "Update the status of a report.",
    label: "Update Report Status",
  },
  inputs: updateReportStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateReportStatusOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, type, filters, status }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.UPDATE,
      inputSettings: {
        type,
        filters,
        status,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => updateReportStatusExamplePayload,
  examplePayload: updateReportStatusExamplePayload,
});
