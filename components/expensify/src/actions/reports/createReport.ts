import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { createReportExamplePayload } from "../../examplePayloads";
import { createReportInputs } from "../../inputs";
import { createReportOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const createReport = action({
  display: {
    description: "Creates a report, with transactions, in a user’s account.",
    label: "Create Report",
  },
  inputs: createReportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createReportOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, type, employeeEmail, expenses, policyId, report },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.CREATE,
      inputSettings: {
        type,
        employeeEmail,
        expenses,
        policyID: policyId,
        report,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => createReportExamplePayload,
  examplePayload: createReportExamplePayload,
});
