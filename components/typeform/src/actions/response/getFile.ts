import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  fieldId,
  filename,
  formId,
  responseId,
} from "../../inputs";
import { getFileResponse } from "../../examplePayloads/responses";

export const getFileFromResponse = action({
  display: {
    label: "Get File from Response",
    description:
      "Download an uploaded file knowing its form, response, field and name.",
  },
  inputs: {
    formId,
    responseId,
    fieldId,
    filename,
    connection,
  },
  perform: async (
    context,
    { connection, formId, fieldId, filename, responseId },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(
      `/forms/${formId}/responses/${responseId}/fields/${fieldId}/files/${filename}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getFileResponse,
  },
});
