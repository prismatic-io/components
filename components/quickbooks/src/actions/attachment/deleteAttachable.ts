import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { attachablePayload, connectionInput, minorVersion } from "../../inputs";

export const deleteAttachable = action({
  display: {
    label: "Delete Attachable",
    description: "Delete an attachable object.",
  },
  perform: async (context, { connection, attachablePayload, minorVersion }) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const { data } = await client.post("/attachable", attachablePayload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: { operation: "delete", minorversion: minorVersion },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    attachablePayload,
    minorVersion: { ...minorVersion, default: "75" },
  },
});
