import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getReportExamplePayload } from "../../examplePayloads";
import { getReportInputs } from "../../inputs";
export const getReport = action({
  display: {
    label: "Get Report",
    description:
      "Retrieves a report including one page of rows, attachments, discussions, and source sheets.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, reportId, pagination },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/reports/${reportId}`, {
      params: {
        include:
          "attachments,discussions,format,objectValue,scope,source,sourceSheets",
        pageSize: pagination.pageSize,
        page: pagination.page,
        level: 3,
      },
    });
    return { data };
  },
  inputs: getReportInputs,
  examplePayload: getReportExamplePayload,
});
