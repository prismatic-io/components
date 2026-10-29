import { action } from "@prismatic-io/spectral";
import { connectionInput, fileName, fileSystem } from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";

export const downloadReport = action({
  display: {
    description:
      "This job lets you download reports that were generated with the Report Exporter job.",
    label: "Download Report",
  },
  inputs: {
    connectionInput,
    fileName,
    fileSystem,
  },
  perform: async (context, { connectionInput, fileName, fileSystem }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "download",
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
