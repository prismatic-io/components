import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addFileInputs } from "../../inputs";
import { addFileExamplePayload } from "../../examplePayloads";
import { addFileOutputSchema } from "../../outputSchemas";
import FormData from "form-data";
export const addFile = action({
  display: {
    label: "Add File",
    description:
      "Uploads and adds a new file to a deal, person, organization, product, activity, or lead.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const formData = new FormData();
    formData.append(`${params.entityType}_id`, params.entityId);
    formData.append("file", params.file.data, { filename: params.fileName });
    const { data } = await client.post("/files", formData, {
      headers: formData.getHeaders(),
    });
    return { data };
  },
  inputs: addFileInputs,
  examplePayload: addFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addFileOutputSchema,
  }),
});
