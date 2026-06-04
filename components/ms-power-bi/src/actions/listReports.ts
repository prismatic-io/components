import { action } from "@prismatic-io/spectral";
import { connection, skipToken, top } from ".././inputs";
import { createClient } from "../client";
import { listReportsExamplePayload } from "../examplePayloads";

export const listReports = action({
  display: {
    label: "List Reports",
    description: "Returns a list of reports from 'My Workspace'",
  },
  perform: async (context, params) => {
    const client = createClient({ connection: params.connection }, context.debug.enabled);
    const { data } = await client.get("/reports", {
      params: { $top: params.top, $skipToken: params.skipToken },
    });

    return {
      data,
    };
  },
  inputs: { connection, top, skipToken },
  examplePayload: listReportsExamplePayload,
});

export default listReports;
