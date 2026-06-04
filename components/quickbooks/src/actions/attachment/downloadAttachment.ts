import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { attachableId, connectionInput, minorVersion } from "../../inputs";

export const downloadAttachment = action({
  display: {
    label: "Download Attachment",
    description:
      "Retrieves a temporary download URL to the specified attachableID.",
  },
  perform: async (context, { connection, attachableId, minorVersion }) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const { data } = await client.get(`/download/${attachableId}`, {
      params: { minorversion: minorVersion },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    attachableId,
    minorVersion: { ...minorVersion, default: "75" },
  },
});
