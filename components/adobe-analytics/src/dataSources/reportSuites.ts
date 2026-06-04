import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  selectReportSuiteInputs,
  selectVirtualReportSuiteInputs,
} from "../inputs";
import type { ReportSuite, ReportSuiteListResponse } from "../types";

const selectReportSuite = dataSource({
  display: {
    label: "Select Report Suite",
    description: "Select a report suite from a picklist.",
  },
  inputs: selectReportSuiteInputs,
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createClient(params.connection, false);
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
    return {
      result: reportSuites.map((reportSuite) => ({
        key: reportSuite.id,
        label: reportSuite.name,
      })),
    };
  },
});

const selectVirtualReportSuite = dataSource({
  display: {
    label: "Select Virtual Report Suite",
    description: "Select a virtual report suite from a picklist.",
  },
  inputs: selectVirtualReportSuiteInputs,
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createClient(params.connection, false);
    let reportSuites: ReportSuite[] = [];
    let nextPage = false;
    let page = 0;
    do {
      const { data } = await client.get<ReportSuiteListResponse>(
        `/api/${params.globalCompanyId}/reportsuites/virtualreportsuites`,
        { params: { limit: 1000, page } },
      );
      reportSuites = [...reportSuites, ...data.content];
      nextPage = data.nextPage;
      page += 1;
    } while (nextPage);
    return {
      result: reportSuites.map((reportSuite) => ({
        key: reportSuite.id,
        label: reportSuite.name,
      })),
    };
  },
});

export default { selectReportSuite, selectVirtualReportSuite };
