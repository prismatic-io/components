import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId } from "../../inputs";
import { getFileResponse as getAllResponseFilesResponse } from "../../examplePayloads/responses";

export const getAllResponseFiles = action({
  display: {
    label: "Get All Response Files",
    description:
      "Download a zip archive containing all files uploaded by respondents for the specified form ID.",
  },
  inputs: {
    formId,
    connection,
  },
  perform: async (context, { connection, formId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/forms/${formId}/responses/files`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getAllResponseFilesResponse,
  },
});
