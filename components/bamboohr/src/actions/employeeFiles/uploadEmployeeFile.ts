import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createBambooClient } from "../../client";
import { uploadEmployeeFileExamplePayload } from "../../examplePayloads";
import { uploadEmployeeFileInputs } from "../../inputs";

export const uploadEmployeeFile = action({
  display: {
    label: "Upload Employee File",
    description: "Upload a new employee file.",
  },
  inputs: uploadEmployeeFileInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const formData = new FormData();
    formData.append("category", params.categoryId);
    formData.append("fileName", params.fileName);
    formData.append("share", params.share);
    formData.append("file", params.file.data, params.fileName);
    await client.post(
      `/v1/employees/${params.employeeId}/files`,
      formData.getBuffer(),
      { headers: formData.getHeaders() },
    );
    return { data: null };
  },
  examplePayload: uploadEmployeeFileExamplePayload,
});
