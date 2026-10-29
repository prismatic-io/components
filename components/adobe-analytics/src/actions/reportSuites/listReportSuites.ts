import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listReportSuitesExamplePayload } from "../../examplePayloads";
import { listReportSuitesInputs } from "../../inputs";
import type { ReportSuite, ReportSuiteListResponse } from "../../types";

export const listReportSuites = action({
  display: {
    label: "List Report Suites",
    description: "Retrieves a list of report suites.",
  },
  inputs: listReportSuitesInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    let reportSuites: ReportSuite[] = [];
    let nextPage = false;
    let page = 0;
    do {
      const { data } = await client.get<ReportSuiteListResponse>(
        `/api/${params.globalCompanyId}/reportsuites/collections/suites`,
        { params: { limit: 1000, page } },
      );
      reportSuites = [...reportSuites, ...data.content];
      nextPage = data.nextPage;
      page += 1;
    } while (nextPage);
    return { data: reportSuites };
  },
  examplePayload: listReportSuitesExamplePayload,
});
