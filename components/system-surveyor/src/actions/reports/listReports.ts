import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { listReportsExamplePayload } from "../../examplePayloads/reports";
import { listReportsInputs } from "../../inputs";






export const listReports = action({
  display: {
    label: "List Reports",
    description: "Retrieve all reports created by the current user.",
  },
  inputs: listReportsInputs,
  perform: async (context, { ssvConnection }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get("/v3/reports");

    return { data };
  },
  examplePayload: listReportsExamplePayload,
});
