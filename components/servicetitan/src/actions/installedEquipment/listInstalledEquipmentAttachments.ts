import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAttachmentExamplePayload } from "../../examplePayloads";
import { listInstalledEquipmentAttachmentsInputs } from "../../inputs";
export const listInstalledEquipmentAttachments = action({
  display: {
    label: "List Installed Equipment Attachments",
    description: "Retrieve installed Equipment attachments",
  },
  inputs: listInstalledEquipmentAttachmentsInputs,
  perform: async (context, { connection, path }) => {
    const client = createClient(
      connection,
      "equipmentsystems",
      context.debug.enabled,
    );
    const { data } = await client.get(`/installed-equipment/attachments`, {
      params: {
        path,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listAttachmentExamplePayload,
});
