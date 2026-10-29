import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listReportSuiteMetricsExamplePayload } from "../../examplePayloads";
import { listReportSuiteMetricsInputs } from "../../inputs";
import type { ReportSuiteMetric } from "../../types";

export const listReportSuiteMetrics = action({
  display: {
    label: "List Metrics for Report Suite",
    description: "Retrieves a list of metrics for a given report suite.",
  },
  inputs: listReportSuiteMetricsInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get<ReportSuiteMetric[]>(
      `https://analytics.adobe.io/api/${params.globalCompanyId}/metrics`,
      { params: { rsid: params.reportSuiteId } },
    );
    return { data };
  },
  examplePayload: listReportSuiteMetricsExamplePayload,
});
