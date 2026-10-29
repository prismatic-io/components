import { action } from "@prismatic-io/spectral";
import { connectionInput, type, status, filters } from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";
import { updateReportStatusExamplePayload } from "../../examplePayloads";

export const updateReportStatus = action({
  display: {
    description: "Update the status of a report.",
    label: "Update Report Status",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "reportStatus",
      comments:
        "Specifies to the job that it has to update the status of a list of reports.",
    },
    status,
    filters,
  },
  perform: async (context, { connectionInput, type, filters, status }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "update",
      inputSettings: {
        type: type || undefined,
        filters: filters || undefined,
        status: status || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: updateReportStatusExamplePayload,
  },
});
