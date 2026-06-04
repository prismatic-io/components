import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectReportSuiteMetricInputs } from "../inputs";
import type { ReportSuiteMetric } from "../types";

const selectReportSuiteMetric = dataSource({
  display: {
    label: "Select Report Suite Metric",
    description: "Select a metric from a picklist.",
  },
  inputs: selectReportSuiteMetricInputs,
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createClient(params.connection, false);
    const { data } = await client.get<ReportSuiteMetric[]>(
      `https://analytics.adobe.io/api/${params.globalCompanyId}/metrics`,
      { params: { rsid: params.reportSuiteId } },
    );
    return {
      result: data
        .map((metric) => ({ key: metric.id, label: metric.name }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
});

export default { selectReportSuiteMetric };
