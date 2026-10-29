import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { runReportExamplePayload } from "../../examplePayloads";
import { runReportInputs } from "../../inputs";

export const runReport = action({
  display: {
    label: "Run Report",
    description: "Runs a report against a specified report suite.",
  },
  inputs: runReportInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const payload = {
      rsid: params.reportSuiteId,
      dimension: params.dimension,
      ...params.reportRequestBody,
    };
    const { data } = await client.post(
      `/api/${params.globalCompanyId}/reports`,
      payload,
    );
    return { data };
  },
  examplePayload: runReportExamplePayload,
});
