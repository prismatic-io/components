import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getImportStatusExamplePayload } from "../../examplePayloads";
import { getImportStatusInputs } from "../../inputs";
import { getImportStatusOutputSchema } from "../../outputSchemas";
export const getImportStatus = action({
  display: {
    label: "Get Import Status",
    description: "Checks the status of a contact import job.",
  },
  inputs: getImportStatusInputs,
  perform: async (_context, { sendGridConnection, job_id }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const [_response, body] = await client.request({
      method: "GET",
      url: `/${API_VERSION}/marketing/contacts/imports/${job_id}`,
    });
    return { data: body };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getImportStatusOutputSchema,
  }),
  examplePayload: getImportStatusExamplePayload,
});
