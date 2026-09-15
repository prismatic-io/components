import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { createInstalledEquipmentAttachmentExamplePayload } from "../../examplePayloads";
import { createInstalledEquipmentAttachmentInputs } from "../../inputs";
import { createInstalledEquipmentAttachmentOutputSchema } from "../../outputSchemas";
export const createInstalledEquipmentAttachment = action({
  display: {
    label: "Create Installed Equipment Attachment",
    description: "Create a new installed equipment attachment.",
  },
  inputs: createInstalledEquipmentAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createInstalledEquipmentAttachmentOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => createInstalledEquipmentAttachmentExamplePayload,
  examplePayload: createInstalledEquipmentAttachmentExamplePayload,
});
