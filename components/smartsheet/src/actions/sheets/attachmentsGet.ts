import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { attachmentsGetExamplePayload } from "../../examplePayloads";
import { attachmentsGetInputs } from "../../inputs";

export const attachmentsGet = action({
  display: {
    label: "Get Sheet Attachment",
    description: "Retrieves metadata for an attachment on a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, sheetId, attachmentId },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(
      `/sheets/${sheetId}/attachments/${attachmentId}`,
    );
    return { data };
  },
  inputs: attachmentsGetInputs,
  examplePayload: attachmentsGetExamplePayload,
});
