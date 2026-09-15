import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listInstalledEquipmentAttachmentsExamplePayload } from "../../examplePayloads";
import { listInstalledEquipmentAttachmentsInputs } from "../../inputs";
export const listInstalledEquipmentAttachments = action({
  display: {
    label: "List Installed Equipment Attachments",
    description: "Retrieve installed equipment attachments.",
  },
  inputs: listInstalledEquipmentAttachmentsInputs,
  performSafety: "safe",
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
  examplePayload: listInstalledEquipmentAttachmentsExamplePayload,
});
