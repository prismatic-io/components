import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { callId, connection, fileInput, fileName } from "../../inputs";

export const addMedia = action({
  display: {
    label: "Add Call Media",
    description:
      "Adds a call media, recorded by a telephony system (PBX) or other media recording facility.",
  },
  inputs: {
    connection,
    callId: {
      ...callId,
      comments: "callId returned from 'Add New Call' request",
    },
    fileInput: {
      ...fileInput,
      comments:
        "The media file of the recording. You may attach files up to 1.5GB in size.",
    },
    fileName,
  },
  perform: async (context, { connection, callId, fileInput, fileName }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data: fileData, contentType } = fileInput;

    const formData = new FormData();
    formData.append("mediaFile", fileData, { contentType, filename: fileName });

    const { data } = await client.put(
      `/v2/calls/${callId}/media`,
      formData.getBuffer(),
      {
        headers: formData.getHeaders(),
      },
    );
    return { data };
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      message: "Media file uploaded successfully",
    },
  },
});
