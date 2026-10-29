import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  type,
  employeeEmail,
  report,
  expenses,
  policyId,
} from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";
import { createReportExamplePayload } from "../../examplePayloads";

export const createReport = action({
  display: {
    description: "Creates a report, with transactions, in a user’s account.",
    label: "Create Report",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "report",
      comments: "Specifies to the job that it has to create a report.",
    },
    employeeEmail,
    report,
    expenses,
    policyId,
  },
  perform: async (
    context,
    { connectionInput, type, employeeEmail, expenses, policyId, report },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "create",
      inputSettings: {
        type: type || undefined,
        employeeEmail: employeeEmail || undefined,
        expenses: expenses || undefined,
        policyID: policyId || undefined,
        report: report || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: createReportExamplePayload,
  },
});
