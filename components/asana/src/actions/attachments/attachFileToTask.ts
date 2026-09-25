import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createAsanaClient } from "../../client";
import { attachFileToTaskExamplePayload } from "../../examplePayloads";
import { attachFileToTaskInputs } from "../../inputs";
import { attachmentResponseSchema } from "../../outputSchemas";
export const attachFileToTask = action({
  display: {
    label: "Attach File to Task",
    description: "Attach a file to a task.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const formData = new FormData();
    formData.append("file", params.file.data, { filename: params.fileName });
    const { data } = await client.post(
      `/tasks/${params.taskId}/attachments/`,
      formData,
      { headers: formData.getHeaders() },
    );
    return { data };
  },
  inputs: attachFileToTaskInputs,
  examplePayload: attachFileToTaskExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: attachmentResponseSchema,
  }),
});
