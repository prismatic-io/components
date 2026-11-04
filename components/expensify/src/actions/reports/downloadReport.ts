import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { downloadReportInputs } from "../../inputs";
import { generatePayload } from "../../util";

export const downloadReport = action({
  display: {
    description:
      "Download reports that were generated with the Report Exporter job.",
    label: "Download Report",
  },
  inputs: downloadReportInputs,
  performSafety: "safe",
  perform: async (context, { connectionInput, fileName, fileSystem }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.DOWNLOAD,
      fileName,
      fileSystem,
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
});
