import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createReportExamplePayload } from "../../examplePayloads";
import { connectionInput, reportInput } from "../../inputs";

export const createReport = action({
  display: {
    label: "Create Report",
    description: "Request a new report generation.",
  },
  examplePayload: createReportExamplePayload,
  perform: async (context, { connection, reportInput }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/reports`, {
      ...reportInput,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    reportInput,
  },
});
