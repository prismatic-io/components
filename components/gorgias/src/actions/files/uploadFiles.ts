import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { postApiUploadInputs as inputs } from "../../inputs/files";
import type { UploadFilesResponse } from "../../interfaces/files";
import { uploadFilesExamplePayload as examplePayload } from "../../examplePayloads/files";

export const uploadFiles = action({
  display: {
    label: "Upload Files",
    description: "Upload a file or several files.",
  },
  perform: async (context, { connection, type, file }) => {
    const client = createClient({
      connection,
      debug: context.debug.enabled,
    });

    const formData = new FormData();

    formData.append("file", file.data, {
      filename: "test.pdf",
      contentType: file.contentType,
    });

    const { data } = await client.post<UploadFilesResponse>(
      "/upload",
      formData,
      {
        params: { type },
        headers: {
          accept: "application/json",
          ...formData.getHeaders(),
        },
      },
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
