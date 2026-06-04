import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getReportRequestStatusExamplePayload } from "../../examplePayloads";
import { connectionInput, reportId } from "../../inputs";

export const getReportRequestStatus = action({
  display: {
    label: "Get Report Request Status",
    description: "Get report request processing status.",
  },
  examplePayload: getReportRequestStatusExamplePayload,
  perform: async (context, { connection, reportId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/reports/${reportId}/status`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    reportId,
  },
});
