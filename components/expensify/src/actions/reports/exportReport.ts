import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  FORM_FIELDS,
  INPUT_SETTINGS_TYPES,
  JOB_TYPES,
  RETURN_RANDOM_FILE_NAME,
} from "../../constants";
import { exportReportExamplePayload } from "../../examplePayloads";
import { exportReportInputs } from "../../inputs";
import { exportReportOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const exportReport = action({
  display: {
    description:
      "Export expense or report data in a configurable format for analysis or insertion into an accounting package.",
    label: "Export Report",
  },
  inputs: exportReportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exportReportOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connectionInput,
      status,
      employeeEmail,
      fileExtension,
      additionalFields,
      onFinish,
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
      type: JOB_TYPES.FILE,
      onReceive: { immediateResponse: [RETURN_RANDOM_FILE_NAME] },
      inputSettings: {
        type: INPUT_SETTINGS_TYPES.COMBINED_REPORT_DATA,
        filters: {
          startDate,
          endDate,
          approvedAfter,
          markAsExportedFilter,
          policyIDList: policyIDList?.join(","),
          reportIDList: reportIdList?.join(","),
        },
        reportState: status,
        limit: additionalFields.limit,
        employeeEmail,
      },
      outputSettings: {
        fileExtension,
        fileBasename: additionalFields.fileBasename,
        includeFullPageReceiptsPdf: additionalFields.includeFullPageReceiptsPdf,
      },
      test: additionalFields.test,
      onFinish,
    };
    const generatedJson = generatePayload(json, connectionInput);
    generatedJson.append(FORM_FIELDS.TEMPLATE, templateName);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => exportReportExamplePayload,
  examplePayload: exportReportExamplePayload,
});
