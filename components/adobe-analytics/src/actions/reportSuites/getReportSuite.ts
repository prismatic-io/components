import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getReportSuiteExamplePayload } from "../../examplePayloads";
import { getReportSuiteInputs } from "../../inputs";
import type { ReportSuite } from "../../types";

export const getReportSuite = action({
  display: {
    label: "Get Report Suite",
    description: "Retrieves a report suite by ID.",
  },
  inputs: getReportSuiteInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get<ReportSuite>(
      `/api/${params.globalCompanyId}/reportsuites/collections/suites/${params.reportSuiteId}`,
    );
    return { data };
  },
  examplePayload: getReportSuiteExamplePayload,
});
