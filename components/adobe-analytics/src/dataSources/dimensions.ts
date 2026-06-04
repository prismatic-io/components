import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectReportSuiteDimensionInputs } from "../inputs";
import type { ReportSuiteDimension } from "../types";

const selectReportSuiteDimension = dataSource({
  display: {
    label: "Select Report Suite Dimension",
    description: "Select a dimension from a picklist.",
  },
  inputs: selectReportSuiteDimensionInputs,
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createClient(params.connection, false);
    const { data } = await client.get<ReportSuiteDimension[]>(
      `https://analytics.adobe.io/api/${params.globalCompanyId}/dimensions`,
      { params: { rsid: params.reportSuiteId } },
    );
    return {
      result: data
        .map((dimension) => ({
          key: dimension.id,
          label: dimension.name,
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
});

export default { selectReportSuiteDimension };
