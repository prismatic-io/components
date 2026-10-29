import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listVirtualReportSuitesExamplePayload } from "../../examplePayloads";
import { listVirtualReportSuitesInputs } from "../../inputs";
import type { ReportSuite } from "../../types";

export const listVirtualReportSuites = action({
  display: {
    label: "List Virtual Report Suites",
    description: "Retrieves a list of virtual report suites.",
  },
  inputs: listVirtualReportSuitesInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    let virtualReportSuites: ReportSuite[] = [];
    let nextPage = false;
    let page = 0;
    do {
      const { data } = await client.get(
        `/api/${params.globalCompanyId}/reportsuites/virtualreportsuites`,
        { params: { limit: 1000, page } },
      );
      virtualReportSuites = [...virtualReportSuites, ...data.content];
      nextPage = data.nextPage;
      page += 1;
    } while (nextPage);
    return { data: virtualReportSuites };
  },
  examplePayload: listVirtualReportSuitesExamplePayload,
});
