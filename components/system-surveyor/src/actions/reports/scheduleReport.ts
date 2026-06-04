import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { scheduleReportExamplePayload } from "../../examplePayloads/reports";
import { scheduleReportInputs } from "../../inputs";






export const scheduleReport = action({
  display: {
    label: "Schedule Report",
    description:
      "Schedule a report to be generated and uploaded to the reports storage.",
  },
  inputs: scheduleReportInputs,
  perform: async (
    context,
    {
      ssvConnection,
      reportDefinitionId,
      siteId,
      surveyIds,
      reportName,
      reportType,
      isSiteReport,
    },
  ) => {
    const client = await createSsvClient(ssvConnection, context);
    const requestData = {
      report_definition_id: reportDefinitionId,
      site_id: siteId,
      type: reportType,
      is_site_report: isSiteReport,
      report_name: reportName,
      survey_ids: surveyIds,
    };

    const { data } = await client.post("/v3/report", requestData);

    return { data };
  },
  examplePayload: scheduleReportExamplePayload,
});
