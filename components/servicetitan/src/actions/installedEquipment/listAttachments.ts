import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAttachmentResponse } from "../../examplePayloads";
import { connection, path } from "../../inputs";

export const listInstalledEquipmentAttachments = action({
  display: {
    label: "List Installed Equipment Attachments",
    description: "Retrieve installed Equipment attachments",
  },
  inputs: {
    connection,
    path: {
      ...path,
      required: true,
    },
  },
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
  examplePayload: {
    data: listAttachmentResponse,
  },
});
