import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { createInstalledEquipmentAttachmentResponse } from "../../examplePayloads";
import { connection, file, fileName } from "../../inputs";

export const createInstalledEquipmentAttachment = action({
  display: {
    label: "Create Installed Equipment Attachment",
    description: "Create a new installed equipment attachment",
  },
  inputs: {
    connection,
    file,
    fileName,
  },
  perform: async (context, { connection, file, fileName }) => {
    const { data: fileData, contentType } = file;

    const formData = new FormData();
    formData.append("file", fileData, { contentType, filename: fileName });

    const client = createClient(
      connection,
      "equipmentsystems",
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/installed-equipment/attachments`,
      formData.getBuffer(),
      {
        headers: formData.getHeaders(),
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: createInstalledEquipmentAttachmentResponse,
  },
});
