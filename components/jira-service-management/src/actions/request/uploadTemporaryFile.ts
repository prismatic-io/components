import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { uploadTemporaryFileExamplePayload } from "../../examplePayloads";
import { uploadTemporaryFileInputs } from "../../inputs";

export const uploadTemporaryFile = action({
  display: {
    label: "Upload Temporary File",
    description:
      "Uploads a file as a temporary attachment for later use with Add Attachment.",
  },
  inputs: uploadTemporaryFileInputs,
  perform: async (
    context,
    { connection, serviceDeskId, fileContents, fileName },
  ) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );

    const formData = new FormData();
    formData.append("file", fileContents.data, { filename: fileName });

    const { data } = await client.post(
      `/servicedesk/${serviceDeskId}/attachTemporaryFile`,
      formData,
      {
        headers: {
          "X-Atlassian-Token": "no-check",
          ...formData.getHeaders(),
        },
      },
    );
    return { data: data?.temporaryAttachments?.[0] ?? null };
  },
  examplePayload: uploadTemporaryFileExamplePayload,
});
