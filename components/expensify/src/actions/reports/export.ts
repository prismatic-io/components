import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  status,
  limit,
  employeeEmail,
  fileExtension,
  fileBasename,
  includeFullPageReceiptsPdf,
  onFinish,
  test,
  templateName,
  startDate,
  endDate,
  approvedAfter,
  markAsExportedFilter,
  policyIDList,
  reportIdList,
} from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";

export const exportReport = action({
  display: {
    description:
      "Export expense or report data in a configurable format for analysis or insertion into your accounting package.",
    label: "Export Report",
  },
  inputs: {
    connectionInput,
    startDate: {
      ...startDate,
      required: false,
    },
    endDate: {
      ...endDate,
      required: false,
    },
    approvedAfter,
    markAsExportedFilter,
    policyIDList: {
      ...policyIDList,
      required: false,
    },
    reportIdList,
    fileExtension,
    fileBasename,
    includeFullPageReceiptsPdf,
    status: {
      ...status,
      label: "Report State",
      required: false,
    },
    limit,
    employeeEmail: {
      ...employeeEmail,
      required: false,
    },
    onFinish: {
      ...onFinish,
      default: JSON.stringify(
        [
          { actionName: "markAsExported", label: "Expensify Export" },
          {
            actionName: "email",
            recipients: "manager@domain.com,finances@domain.com",
            message: "Report is ready.",
          },
        ],
        null,
        2,
      ),
    },
    test,
    templateName,
  },
  perform: async (
    context,
    {
      connectionInput,
      status,
      employeeEmail,
      fileBasename,
      fileExtension,
      includeFullPageReceiptsPdf,
      limit,
      onFinish,
      test,
      templateName,
      approvedAfter,
      endDate,
      markAsExportedFilter,
      policyIDList,
      reportIdList,
      startDate,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "file",
      onReceive: { immediateResponse: ["returnRandomFileName"] },
      inputSettings: {
        type: "combinedReportData",
        filters: {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          approvedAfter: approvedAfter || undefined,
          markAsExportedFilter: markAsExportedFilter || undefined,
          policyIDList: policyIDList?.join(",") || undefined,
          reportIDList: reportIdList?.join(",") || undefined,
        },
        reportState: status || undefined,
        limit: limit || undefined,
        employeeEmail: employeeEmail || undefined,
      },
      outputSettings: {
        fileExtension: fileExtension || undefined,
        fileBasename: fileBasename || undefined,
        includeFullPageReceiptsPdf: includeFullPageReceiptsPdf || false,
      },
      test: test || false,
      onFinish: onFinish || undefined,
    };
    const generatedJson = generatePayload(json, connectionInput);
    generatedJson.append("template", templateName);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: "exporteba3c95b-f302-4d74-a41a-6127c9088551-5650745444954548.pdf,exporteba3c95b-f302-4d74-a41a-6127c9088551-2050520975381833.pdf",
  },
});
