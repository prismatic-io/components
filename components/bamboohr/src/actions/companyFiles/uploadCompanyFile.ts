import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createBambooClient } from "../../client";
import { uploadCompanyFileExamplePayload } from "../../examplePayloads";
import { uploadCompanyFileInputs } from "../../inputs";

export const uploadCompanyFile = action({
  display: {
    label: "Upload Company File",
    description: "Upload a new company file.",
  },
  inputs: uploadCompanyFileInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const formData = new FormData();
    formData.append("category", params.categoryId);
    formData.append("fileName", params.fileName);
    formData.append("share", params.share);
    formData.append("file", params.file.data, params.fileName);
    await client.post(`/v1/files`, formData.getBuffer(), {
      headers: formData.getHeaders(),
    });
    return { data: null };
  },
  examplePayload: uploadCompanyFileExamplePayload,
});
