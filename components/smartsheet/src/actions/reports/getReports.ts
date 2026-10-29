import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getReportsExamplePayload } from "../../examplePayloads";
import { getReportsInputs } from "../../inputs";

export const getReports = action({
  display: {
    label: "List Reports",
    description: "Lists all reports accessible to the authenticated user.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, modifiedSince },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/reports`, {
      params: { modifiedSince },
    });
    return { data };
  },
  inputs: getReportsInputs,
  examplePayload: getReportsExamplePayload,
});
